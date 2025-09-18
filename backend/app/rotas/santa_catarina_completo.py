from fastapi import APIRouter, HTTPException
from typing import Dict, List, Any
import httpx
import asyncio
from datetime import datetime

router = APIRouter()

# APIs de dados de Santa Catarina
SC_DATA_SOURCES = {
    "municipios": "https://servicodados.ibge.gov.br/api/v1/localidades/estados/42/municipios",
    "populacao": "https://servicodados.ibge.gov.br/api/v3/agregados/6579/periodos/2010|2020/variaveis/9324?localidades=N6[all]",
    "economia": "https://servicodados.ibge.gov.br/api/v3/agregados/5938/periodos/2019|2020/variaveis/37?localidades=N6[all]",
    "educacao": "https://servicodados.ibge.gov.br/api/v3/agregados/7113/periodos/2010|2020/variaveis/10267?localidades=N6[all]",
    "saude": "https://servicodados.ibge.gov.br/api/v3/agregados/4709/periodos/2010|2020/variaveis/8331?localidades=N6[all]"
}

@router.get("/")
async def get_santa_catarina_overview():
    """Visão geral dos dados de Santa Catarina"""
    try:
        async with httpx.AsyncClient() as client:
            # Buscar dados básicos
            municipios_response = await client.get(SC_DATA_SOURCES["municipios"])
            
        if municipios_response.status_code == 200:
            municipios = municipios_response.json()
            
            return {
                "estado": "Santa Catarina",
                "codigo_uf": 42,
                "total_municipios": len(municipios),
                "capital": "Florianópolis",
                "regiao": "Sul",
                "principais_municipios": [
                    m["nome"] for m in sorted(municipios, key=lambda x: x["nome"])[:10]
                ],
                "dados_atualizados": datetime.now().isoformat(),
                "fontes_disponiveis": [
                    "População por município",
                    "Dados econômicos",
                    "Indicadores de educação",
                    "Dados de saúde"
                ]
            }
        else:
            raise HTTPException(status_code=503, detail="Erro ao acessar dados do IBGE")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

@router.get("/municipios")
async def get_municipios_sc():
    """Lista todos os municípios de Santa Catarina"""
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(SC_DATA_SOURCES["municipios"])
            
        if response.status_code == 200:
            municipios = response.json()
            
            return {
                "total": len(municipios),
                "municipios": [
                    {
                        "id": m["id"],
                        "nome": m["nome"],
                        "microrregiao": m["microrregiao"]["nome"],
                        "mesorregiao": m["mesorregiao"]["nome"]
                    }
                    for m in municipios
                ]
            }
        else:
            raise HTTPException(status_code=503, detail="Erro ao acessar dados do IBGE")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

@router.get("/populacao")
async def get_populacao_sc():
    """Dados de população dos municípios de SC"""
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(SC_DATA_SOURCES["populacao"])
            
        if response.status_code == 200:
            data = response.json()
            
            # Processar dados de população
            populacao_data = []
            for item in data:
                for resultado in item.get("resultados", []):
                    for serie in resultado.get("series", []):
                        localidade = serie.get("localidade", {})
                        for periodo, valor in serie.get("serie", {}).items():
                            if valor and valor != "...":
                                populacao_data.append({
                                    "municipio_id": localidade.get("id"),
                                    "municipio_nome": localidade.get("nome"),
                                    "ano": periodo,
                                    "populacao": int(valor) if valor.isdigit() else valor
                                })
            
            return {
                "total_registros": len(populacao_data),
                "anos_disponiveis": list(set([d["ano"] for d in populacao_data])),
                "dados": populacao_data[:50]  # Limitar para evitar response muito grande
            }
        else:
            raise HTTPException(status_code=503, detail="Erro ao acessar dados do IBGE")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

@router.get("/economia")
async def get_economia_sc():
    """Dados econômicos de Santa Catarina"""
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(SC_DATA_SOURCES["economia"])
            
        if response.status_code == 200:
            data = response.json()
            
            economia_data = []
            for item in data:
                for resultado in item.get("resultados", []):
                    for serie in resultado.get("series", []):
                        localidade = serie.get("localidade", {})
                        for periodo, valor in serie.get("serie", {}).items():
                            if valor and valor != "...":
                                economia_data.append({
                                    "municipio_id": localidade.get("id"),
                                    "municipio_nome": localidade.get("nome"),
                                    "ano": periodo,
                                    "pib_municipal": valor
                                })
            
            return {
                "total_registros": len(economia_data),
                "dados": economia_data[:50]
            }
        else:
            raise HTTPException(status_code=503, detail="Erro ao acessar dados do IBGE")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

@router.get("/indicadores/{municipio_id}")
async def get_indicadores_municipio(municipio_id: int):
    """Indicadores específicos de um município"""
    try:
        tasks = []
        async with httpx.AsyncClient() as client:
            # Buscar múltiplos indicadores em paralelo
            for endpoint in ["populacao", "economia"]:
                tasks.append(client.get(SC_DATA_SOURCES[endpoint]))
            
            responses = await asyncio.gather(*tasks, return_exceptions=True)
        
        # Processar respostas
        indicadores = {
            "municipio_id": municipio_id,
            "populacao": [],
            "economia": [],
            "ultima_atualizacao": datetime.now().isoformat()
        }
        
        # Processar dados de população
        if len(responses) > 0 and hasattr(responses[0], 'json'):
            pop_data = responses[0].json()
            # Filtrar dados do município específico
            for item in pop_data:
                for resultado in item.get("resultados", []):
                    for serie in resultado.get("series", []):
                        if serie.get("localidade", {}).get("id") == str(municipio_id):
                            indicadores["populacao"] = serie.get("serie", {})
                            break
        
        return indicadores
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")

@router.get("/dashboard")
async def get_dashboard_sc():
    """Dashboard completo de Santa Catarina"""
    try:
        async with httpx.AsyncClient() as client:
            # Buscar dados básicos em paralelo
            municipios_task = client.get(SC_DATA_SOURCES["municipios"])
            populacao_task = client.get(SC_DATA_SOURCES["populacao"])
            
            municipios_response, populacao_response = await asyncio.gather(
                municipios_task, populacao_task, return_exceptions=True
            )
        
        dashboard_data = {
            "resumo": {
                "estado": "Santa Catarina",
                "total_municipios": 0,
                "populacao_total": 0,
                "ultima_atualizacao": datetime.now().isoformat()
            },
            "top_municipios": [],
            "estatisticas": {},
            "fonte": "IBGE - Instituto Brasileiro de Geografia e Estatística"
        }
        
        # Processar dados dos municípios
        if hasattr(municipios_response, 'json'):
            municipios = municipios_response.json()
            dashboard_data["resumo"]["total_municipios"] = len(municipios)
            dashboard_data["top_municipios"] = [
                {"nome": m["nome"], "id": m["id"]} 
                for m in municipios[:10]
            ]
        
        # Processar dados de população
        if hasattr(populacao_response, 'json'):
            pop_data = populacao_response.json()
            total_pop = 0
            for item in pop_data:
                for resultado in item.get("resultados", []):
                    for serie in resultado.get("series", []):
                        serie_data = serie.get("serie", {})
                        # Pegar o ano mais recente
                        if "2020" in serie_data and serie_data["2020"].isdigit():
                            total_pop += int(serie_data["2020"])
            
            dashboard_data["resumo"]["populacao_total"] = total_pop
        
        return dashboard_data
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno: {str(e)}")
