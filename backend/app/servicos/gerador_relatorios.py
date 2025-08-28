"""
Serviço de Geração de Relatórios
"""

import pandas as pd
import numpy as np
from typing import List, Dict, Any
from datetime import datetime
import markdown
from jinja2 import Template

class GeradorRelatorios:
    """
    Classe para gerar relatórios automáticos baseados em análises
    """
    
    def __init__(self):
        self.templates = self._carregar_templates()
    
    def gerar_artigo_cientifico(self, analises: List, solicitacao) -> str:
        """
        Gera artigo científico completo baseado nas análises
        """
        titulo = solicitacao.titulo_personalizado or "Análise de Dados Automatizada: Insights e Descobertas"
        autor = solicitacao.autor
        
        # Template base para artigo científico
        template_artigo = """
# {{ titulo }}

**Autor(es):** {{ autor }}  
**Data:** {{ data }}  
**Gerado por:** DataScience Pro Platform

## Resumo

Esta pesquisa apresenta uma análise abrangente de dados utilizando técnicas automatizadas de ciência de dados. 
Foram aplicados {{ num_analises }} métodos diferentes de análise, incluindo {{ tipos_analise }}, 
resultando em insights significativos para a tomada de decisão baseada em evidências.

**Palavras-chave:** Ciência de Dados, Análise Estatística, Machine Learning, Automação, Business Intelligence

## 1. Introdução

A análise de dados tornou-se fundamental para organizações que buscam extrair valor de suas informações. 
Este estudo apresenta uma abordagem sistemática para análise automatizada de dados, aplicando múltiplas 
técnicas estatísticas e de aprendizado de máquina.

### 1.1 Objetivos

- Realizar análise exploratória abrangente dos dados
- Identificar padrões e correlações significativas
- Aplicar técnicas de modelagem preditiva
- Gerar insights acionáveis para tomada de decisão

## 2. Metodologia

### 2.1 Dados Utilizados

{{ secao_dados }}

### 2.2 Técnicas Aplicadas

{{ secao_tecnicas }}

## 3. Resultados

{{ secao_resultados }}

## 4. Discussão

{{ secao_discussao }}

## 5. Conclusões

{{ secao_conclusoes }}

## 6. Limitações e Trabalhos Futuros

### 6.1 Limitações

- A qualidade dos resultados depende da qualidade dos dados de entrada
- Algumas técnicas podem não ser adequadas para todos os tipos de dados
- Interpretação dos resultados requer conhecimento do domínio

### 6.2 Trabalhos Futuros

- Implementação de técnicas de deep learning
- Análise de dados em tempo real
- Integração com sistemas de big data

## Referências

1. McKinney, W. (2017). Python for Data Analysis. O'Reilly Media.
2. James, G., et al. (2013). An Introduction to Statistical Learning. Springer.
3. Hastie, T., et al. (2009). The Elements of Statistical Learning. Springer.

---

*Relatório gerado automaticamente pela plataforma DataScience Pro em {{ data }}*
"""
        
        # Gerar conteúdo das seções
        contexto = {
            'titulo': titulo,
            'autor': autor,
            'data': datetime.now().strftime('%d/%m/%Y'),
            'num_analises': len(analises),
            'tipos_analise': ', '.join(set([a.tipo.value for a in analises])),
            'secao_dados': self._gerar_secao_dados(analises),
            'secao_tecnicas': self._gerar_secao_tecnicas(analises),
            'secao_resultados': self._gerar_secao_resultados(analises),
            'secao_discussao': self._gerar_secao_discussao(analises),
            'secao_conclusoes': self._gerar_secao_conclusoes(analises)
        }
        
        template = Template(template_artigo)
        conteudo_markdown = template.render(**contexto)
        
        # Converter para HTML se necessário
        if solicitacao.formato.lower() == 'html':
            return markdown.markdown(conteudo_markdown, extensions=['tables', 'toc'])
        
        return conteudo_markdown
    
    def gerar_relatorio_executivo(self, analises: List, solicitacao) -> str:
        """
        Gera relatório executivo resumido
        """
        template_executivo = """
# Relatório Executivo - Análise de Dados

**Data:** {{ data }}  
**Gerado por:** DataScience Pro

## Resumo Executivo

{{ resumo_executivo }}

## Principais Descobertas

{{ principais_descobertas }}

## Recomendações

{{ recomendacoes }}

## Métricas-Chave

{{ metricas_chave }}

## Próximos Passos

{{ proximos_passos }}

---

*Este relatório foi gerado automaticamente e deve ser revisado por especialistas do domínio.*
"""
        
        contexto = {
            'data': datetime.now().strftime('%d/%m/%Y %H:%M'),
            'resumo_executivo': self._gerar_resumo_executivo(analises),
            'principais_descobertas': self._gerar_principais_descobertas(analises),
            'recomendacoes': self._gerar_recomendacoes(analises),
            'metricas_chave': self._gerar_metricas_chave(analises),
            'proximos_passos': self._gerar_proximos_passos(analises)
        }
        
        template = Template(template_executivo)
        conteudo_markdown = template.render(**contexto)
        
        if solicitacao.formato.lower() == 'html':
            return markdown.markdown(conteudo_markdown, extensions=['tables'])
        
        return conteudo_markdown
    
    def gerar_relatorio_tecnico(self, analises: List, solicitacao) -> str:
        """
        Gera relatório técnico detalhado
        """
        template_tecnico = """
# Relatório Técnico - Análise de Dados

**Data:** {{ data }}  
**Versão:** 1.0

## 1. Overview Técnico

{{ overview_tecnico }}

## 2. Especificações dos Dados

{{ especificacoes_dados }}

## 3. Metodologia Detalhada

{{ metodologia_detalhada }}

## 4. Implementação

{{ implementacao }}

## 5. Resultados Técnicos

{{ resultados_tecnicos }}

## 6. Validação e Testes

{{ validacao }}

## 7. Performance e Otimização

{{ performance }}

## 8. Anexos

### 8.1 Configurações Utilizadas

{{ configuracoes }}

### 8.2 Logs de Execução

{{ logs_execucao }}

---

*Relatório técnico gerado pela plataforma DataScience Pro*
"""
        
        contexto = {
            'data': datetime.now().strftime('%d/%m/%Y %H:%M'),
            'overview_tecnico': self._gerar_overview_tecnico(analises),
            'especificacoes_dados': self._gerar_especificacoes_dados(analises),
            'metodologia_detalhada': self._gerar_metodologia_detalhada(analises),
            'implementacao': self._gerar_implementacao(analises),
            'resultados_tecnicos': self._gerar_resultados_tecnicos(analises),
            'validacao': self._gerar_validacao(analises),
            'performance': self._gerar_performance(analises),
            'configuracoes': self._gerar_configuracoes(analises),
            'logs_execucao': self._gerar_logs_execucao(analises)
        }
        
        template = Template(template_tecnico)
        conteudo_markdown = template.render(**contexto)
        
        if solicitacao.formato.lower() == 'html':
            return markdown.markdown(conteudo_markdown, extensions=['tables', 'codehilite'])
        
        return conteudo_markdown
    
    def gerar_relatorio_simples(self, analise, formato: str) -> str:
        """
        Gera relatório simples para uma única análise
        """
        template_simples = """
# Relatório de Análise - {{ nome_analise }}

**Tipo de Análise:** {{ tipo_analise }}  
**Data de Execução:** {{ data_execucao }}  
**Tempo de Execução:** {{ tempo_execucao }} segundos

## Resultados

{{ resultados_formatados }}

## Interpretação

{{ interpretacao }}

## Visualizações

{{ visualizacoes_info }}

---

*Relatório gerado automaticamente em {{ data_relatorio }}*
"""
        
        contexto = {
            'nome_analise': analise.nome,
            'tipo_analise': analise.tipo.value.title(),
            'data_execucao': analise.data_conclusao.strftime('%d/%m/%Y %H:%M') if analise.data_conclusao else 'N/A',
            'tempo_execucao': analise.tempo_execucao or 'N/A',
            'resultados_formatados': self._formatar_resultados_simples(analise.resultados),
            'interpretacao': self._gerar_interpretacao_simples(analise),
            'visualizacoes_info': self._gerar_info_visualizacoes(analise),
            'data_relatorio': datetime.now().strftime('%d/%m/%Y %H:%M')
        }
        
        template = Template(template_simples)
        conteudo_markdown = template.render(**contexto)
        
        if formato.lower() == 'html':
            return markdown.markdown(conteudo_markdown, extensions=['tables'])
        
        return conteudo_markdown
    
    def gerar_relatorio_comparativo(self, analises: List) -> str:
        """
        Gera relatório comparativo entre múltiplas análises
        """
        template_comparativo = """
# Relatório Comparativo de Análises

**Data:** {{ data }}  
**Análises Comparadas:** {{ num_analises }}

## Resumo das Análises

{{ resumo_analises }}

## Comparação de Resultados

{{ comparacao_resultados }}

## Análise de Performance

{{ analise_performance }}

## Conclusões Comparativas

{{ conclusoes_comparativas }}

---

*Relatório comparativo gerado automaticamente*
"""
        
        contexto = {
            'data': datetime.now().strftime('%d/%m/%Y %H:%M'),
            'num_analises': len(analises),
            'resumo_analises': self._gerar_resumo_analises(analises),
            'comparacao_resultados': self._gerar_comparacao_resultados(analises),
            'analise_performance': self._gerar_analise_performance(analises),
            'conclusoes_comparativas': self._gerar_conclusoes_comparativas(analises)
        }
        
        template = Template(template_comparativo)
        conteudo_markdown = template.render(**contexto)
        
        return markdown.markdown(conteudo_markdown, extensions=['tables'])
    
    def _carregar_templates(self) -> Dict:
        """Carrega templates predefinidos"""
        return {
            'cientifico': 'template_cientifico.md',
            'executivo': 'template_executivo.md',
            'tecnico': 'template_tecnico.md'
        }
    
    # Métodos auxiliares para gerar seções específicas
    
    def _gerar_secao_dados(self, analises: List) -> str:
        """Gera seção sobre os dados utilizados"""
        datasets_info = []
        for analise in analises:
            if hasattr(analise, 'dataset') and analise.dataset:
                info = f"- **{analise.dataset.nome}**: {analise.dataset.num_linhas:,} registros, {analise.dataset.num_colunas} variáveis"
                datasets_info.append(info)
        
        if not datasets_info:
            return "Informações sobre datasets não disponíveis."
        
        return "Os seguintes datasets foram utilizados na análise:\n\n" + "\n".join(datasets_info)
    
    def _gerar_secao_tecnicas(self, analises: List) -> str:
        """Gera seção sobre técnicas aplicadas"""
        tecnicas = []
        
        for analise in analises:
            tipo = analise.tipo.value
            if tipo == "descritiva":
                tecnicas.append("**Análise Descritiva**: Estatísticas descritivas, distribuições, valores ausentes")
            elif tipo == "correlacao":
                tecnicas.append("**Análise de Correlação**: Matriz de correlação, testes de significância")
            elif tipo == "clustering":
                tecnicas.append("**Análise de Agrupamento**: K-means, DBSCAN, análise hierárquica")
            elif tipo == "classificacao":
                tecnicas.append("**Classificação**: Random Forest, SVM, Regressão Logística")
            elif tipo == "regressao":
                tecnicas.append("**Regressão**: Regressão Linear, Random Forest, validação cruzada")
        
        return "\n".join(set(tecnicas))  # Remove duplicatas
    
    def _gerar_secao_resultados(self, analises: List) -> str:
        """Gera seção de resultados"""
        resultados = []
        
        for analise in analises:
            resultados.append(f"### {analise.nome}\n")
            
            if analise.resultados:
                # Formatar resultados baseado no tipo de análise
                if analise.tipo.value == "descritiva":
                    resultados.append(self._formatar_resultados_descritivos(analise.resultados))
                elif analise.tipo.value == "correlacao":
                    resultados.append(self._formatar_resultados_correlacao(analise.resultados))
                elif analise.tipo.value in ["classificacao", "regressao"]:
                    resultados.append(self._formatar_resultados_ml(analise.resultados))
            
            resultados.append("\n")
        
        return "\n".join(resultados)
    
    def _formatar_resultados_descritivos(self, resultados: Dict) -> str:
        """Formata resultados de análise descritiva"""
        texto = []
        
        if "resumo_geral" in resultados:
            resumo = resultados["resumo_geral"]
            texto.append(f"- **Total de registros**: {resumo.get('total_registros', 'N/A'):,}")
            texto.append(f"- **Variáveis numéricas**: {resumo.get('colunas_numericas', 'N/A')}")
            texto.append(f"- **Variáveis categóricas**: {resumo.get('colunas_categoricas', 'N/A')}")
        
        if "valores_ausentes" in resultados:
            ausentes = resultados["valores_ausentes"]
            texto.append(f"- **Valores ausentes**: {ausentes.get('porcentagem_total', 0):.1f}% do total")
        
        return "\n".join(texto)
    
    def _formatar_resultados_correlacao(self, resultados: Dict) -> str:
        """Formata resultados de análise de correlação"""
        texto = []
        
        if "correlacoes_significativas" in resultados:
            correlacoes = resultados["correlacoes_significativas"][:5]  # Top 5
            texto.append("**Correlações mais significativas:**")
            
            for corr in correlacoes:
                texto.append(f"- {corr['variavel1']} ↔ {corr['variavel2']}: {corr['correlacao']:.3f} ({corr['interpretacao']})")
        
        return "\n".join(texto)
    
    def _formatar_resultados_ml(self, resultados: Dict) -> str:
        """Formata resultados de machine learning"""
        texto = []
        
        if "melhor_modelo" in resultados:
            melhor = resultados["melhor_modelo"]
            texto.append(f"**Melhor modelo**: {melhor.get('nome', 'N/A')}")
            
            if "metricas" in melhor:
                metricas = melhor["metricas"]
                for metrica, valor in metricas.items():
                    if isinstance(valor, (int, float)):
                        texto.append(f"- **{metrica}**: {valor:.4f}")
        
        return "\n".join(texto)
    
    def _gerar_secao_discussao(self, analises: List) -> str:
        """Gera seção de discussão"""
        return """
Os resultados obtidos demonstram a eficácia das técnicas automatizadas de análise de dados 
aplicadas. As correlações identificadas fornecem insights valiosos sobre as relações entre 
variáveis, enquanto os modelos preditivos apresentam performance satisfatória para os 
objetivos propostos.

É importante destacar que a interpretação destes resultados deve considerar o contexto 
específico do domínio de aplicação e as limitações inerentes aos dados utilizados.
"""
    
    def _gerar_secao_conclusoes(self, analises: List) -> str:
        """Gera seção de conclusões"""
        num_analises = len(analises)
        tipos_analise = set([a.tipo.value for a in analises])
        
        return f"""
Este estudo aplicou {num_analises} técnicas de análise de dados diferentes, incluindo {', '.join(tipos_analise)}, 
resultando em insights significativos. A automação do processo de análise demonstrou ser eficaz 
para identificar padrões e gerar conhecimento acionável.

Os principais benefícios observados incluem:
- Redução do tempo de análise
- Padronização dos processos
- Identificação automática de padrões
- Geração de relatórios consistentes

Recomenda-se a continuidade deste tipo de abordagem para maximizar o valor extraído dos dados organizacionais.
"""
    
    # Métodos para relatório executivo
    
    def _gerar_resumo_executivo(self, analises: List) -> str:
        """Gera resumo executivo"""
        return f"""
Foram realizadas {len(analises)} análises diferentes nos dados fornecidos, utilizando técnicas 
automatizadas de ciência de dados. Os resultados indicam oportunidades significativas de 
otimização e insights valiosos para tomada de decisão estratégica.
"""
    
    def _gerar_principais_descobertas(self, analises: List) -> str:
        """Gera principais descobertas"""
        descobertas = []
        
        for analise in analises:
            if analise.resultados:
                if analise.tipo.value == "correlacao":
                    descobertas.append("• Identificadas correlações significativas entre variáveis-chave")
                elif analise.tipo.value in ["classificacao", "regressao"]:
                    descobertas.append("• Desenvolvidos modelos preditivos com performance satisfatória")
                elif analise.tipo.value == "clustering":
                    descobertas.append("• Identificados padrões de agrupamento nos dados")
        
        return "\n".join(descobertas) if descobertas else "• Análises em andamento"
    
    def _gerar_recomendacoes(self, analises: List) -> str:
        """Gera recomendações"""
        return """
• Implementar monitoramento contínuo das métricas identificadas
• Expandir coleta de dados para variáveis correlacionadas
• Automatizar processo de análise para updates regulares
• Integrar insights em dashboards executivos
"""
    
    def _gerar_metricas_chave(self, analises: List) -> str:
        """Gera métricas-chave"""
        return f"""
• **Total de análises**: {len(analises)}
• **Tempo médio de execução**: {np.mean([a.tempo_execucao or 0 for a in analises]):.1f} segundos
• **Taxa de sucesso**: {len([a for a in analises if a.status.value == 'concluida']) / len(analises) * 100:.1f}%
"""
    
    def _gerar_proximos_passos(self, analises: List) -> str:
        """Gera próximos passos"""
        return """
1. Validar resultados com especialistas de domínio
2. Implementar modelos em ambiente de produção
3. Estabelecer cronograma de re-análise
4. Expandir análises para dados adicionais
"""
    
    # Métodos para outros tipos de relatório...
    
    def _gerar_overview_tecnico(self, analises: List) -> str:
        """Gera overview técnico"""
        return f"Sistema executou {len(analises)} análises utilizando a plataforma DataScience Pro."
    
    def _gerar_especificacoes_dados(self, analises: List) -> str:
        """Gera especificações dos dados"""
        return "Especificações detalhadas dos datasets utilizados."
    
    def _gerar_metodologia_detalhada(self, analises: List) -> str:
        """Gera metodologia detalhada"""
        return "Descrição técnica detalhada da metodologia aplicada."
    
    def _gerar_implementacao(self, analises: List) -> str:
        """Gera seção de implementação"""
        return "Detalhes de implementação técnica."
    
    def _gerar_resultados_tecnicos(self, analises: List) -> str:
        """Gera resultados técnicos"""
        return "Resultados técnicos detalhados."
    
    def _gerar_validacao(self, analises: List) -> str:
        """Gera seção de validação"""
        return "Procedimentos de validação aplicados."
    
    def _gerar_performance(self, analises: List) -> str:
        """Gera análise de performance"""
        return "Análise de performance do sistema."
    
    def _gerar_configuracoes(self, analises: List) -> str:
        """Gera configurações utilizadas"""
        return "Configurações técnicas utilizadas."
    
    def _gerar_logs_execucao(self, analises: List) -> str:
        """Gera logs de execução"""
        return "Logs detalhados de execução."
    
    def _formatar_resultados_simples(self, resultados: Dict) -> str:
        """Formata resultados para relatório simples"""
        if not resultados:
            return "Nenhum resultado disponível."
        
        texto = []
        for chave, valor in resultados.items():
            if isinstance(valor, dict):
                texto.append(f"**{chave.title()}**:")
                for sub_chave, sub_valor in valor.items():
                    texto.append(f"  - {sub_chave}: {sub_valor}")
            else:
                texto.append(f"**{chave}**: {valor}")
        
        return "\n".join(texto)
    
    def _gerar_interpretacao_simples(self, analise) -> str:
        """Gera interpretação simples dos resultados"""
        tipo = analise.tipo.value
        
        if tipo == "descritiva":
            return "A análise descritiva fornece uma visão geral das características dos dados."
        elif tipo == "correlacao":
            return "A análise de correlação identifica relações lineares entre variáveis."
        elif tipo == "clustering":
            return "A análise de agrupamento identifica padrões de similaridade nos dados."
        elif tipo in ["classificacao", "regressao"]:
            return "O modelo de machine learning pode ser usado para fazer predições."
        
        return "Análise concluída com sucesso."
    
    def _gerar_info_visualizacoes(self, analise) -> str:
        """Gera informações sobre visualizações"""
        if analise.graficos:
            num_graficos = len(analise.graficos) if isinstance(analise.graficos, dict) else 0
            return f"Foram gerados {num_graficos} gráficos para esta análise."
        
        return "Nenhuma visualização disponível."
    
    # Métodos para relatório comparativo...
    
    def _gerar_resumo_analises(self, analises: List) -> str:
        """Gera resumo das análises comparadas"""
        resumo = []
        for i, analise in enumerate(analises, 1):
            resumo.append(f"{i}. **{analise.nome}** ({analise.tipo.value})")
        
        return "\n".join(resumo)
    
    def _gerar_comparacao_resultados(self, analises: List) -> str:
        """Gera comparação de resultados"""
        return "Comparação detalhada dos resultados obtidos."
    
    def _gerar_analise_performance(self, analises: List) -> str:
        """Gera análise de performance comparativa"""
        tempos = [a.tempo_execucao for a in analises if a.tempo_execucao]
        if tempos:
            return f"Tempo médio de execução: {np.mean(tempos):.2f} segundos"
        return "Informações de performance não disponíveis."
    
    def _gerar_conclusoes_comparativas(self, analises: List) -> str:
        """Gera conclusões comparativas"""
        return "Conclusões baseadas na comparação entre as análises realizadas."
