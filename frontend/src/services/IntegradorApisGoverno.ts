// Integração Real com APIs do Governo Brasileiro
import axios from 'axios';

export interface GovernmentAPI {
  id: string;
  nome: string;
  descricao: string;
  baseUrl: string;
  endpoints: EndpointInfo[];
  documentacao: string;
  status: 'ativo' | 'manutencao' | 'indisponivel';
  autenticacao: boolean;
  limiteTaxa?: string;
}

export interface EndpointInfo {
  path: string;
  metodo: 'GET' | 'POST';
  descricao: string;
  parametros: ParametroAPI[];
  exemplo: string;
  retornaTipo: string;
}

export interface ParametroAPI {
  nome: string;
  tipo: 'string' | 'number' | 'boolean';
  obrigatorio: boolean;
  descricao: string;
  exemplo?: string;
}

export interface DadosGovernamentais {
  fonte: string;
  dados: any[];
  metadata: {
    total: number;
    coletadoEm: string;
    proximaAtualizacao?: string;
    qualidade: 'alta' | 'media' | 'baixa';
  };
}

class IntegradorApisGoverno {
  private readonly TIMEOUT = 10000;
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

  // =============== IBGE APIs Reais ===============
  
  async buscarMunicipiosPorEstado(uf: string): Promise<DadosGovernamentais> {
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf.toUpperCase()}/municipios`;
    
    try {
      const response = await axios.get(url, { timeout: this.TIMEOUT });
      
      const dadosProcessados = response.data.map((municipio: any) => ({
        id: municipio.id,
        nome: municipio.nome,
        uf: uf.toUpperCase(),
        regiao: municipio.microrregiao?.mesorregiao?.UF?.regiao?.nome,
        mesorregiao: municipio.microrregiao?.mesorregiao?.nome,
        microrregiao: municipio.microrregiao?.nome
      }));

      return {
        fonte: 'IBGE - Municípios',
        dados: dadosProcessados,
        metadata: {
          total: dadosProcessados.length,
          coletadoEm: new Date().toISOString(),
          qualidade: 'alta'
        }
      };
    } catch (error) {
      throw new Error(`Erro ao buscar municípios de ${uf}: ${error}`);
    }
  }

  async buscarTodasRegioes(): Promise<DadosGovernamentais> {
    const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/regioes';
    
    try {
      const response = await axios.get(url, { timeout: this.TIMEOUT });
      
      return {
        fonte: 'IBGE - Regiões',
        dados: response.data,
        metadata: {
          total: response.data.length,
          coletadoEm: new Date().toISOString(),
          qualidade: 'alta'
        }
      };
    } catch (error) {
      throw new Error(`Erro ao buscar regiões: ${error}`);
    }
  }

  async buscarEstadosPorRegiao(regiao: number): Promise<DadosGovernamentais> {
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/regioes/${regiao}/estados`;
    
    try {
      const response = await axios.get(url, { timeout: this.TIMEOUT });
      
      return {
        fonte: 'IBGE - Estados por Região',
        dados: response.data,
        metadata: {
          total: response.data.length,
          coletadoEm: new Date().toISOString(),
          qualidade: 'alta'
        }
      };
    } catch (error) {
      throw new Error(`Erro ao buscar estados da região ${regiao}: ${error}`);
    }
  }

  // =============== Banco Central APIs Reais ===============
  
  async buscarSerieEconomica(codigo: number, dataInicio?: string, dataFim?: string): Promise<DadosGovernamentais> {
    let url = `https://api.bcb.gov.br/dados/serie/bcdata.sgs.${codigo}/dados?formato=json`;
    
    if (dataInicio && dataFim) {
      url += `&dataInicial=${dataInicio}&dataFinal=${dataFim}`;
    }
    
    try {
      const response = await axios.get(url, { timeout: this.TIMEOUT });
      
      const dadosProcessados = response.data.map((item: any) => ({
        data: item.data,
        valor: parseFloat(item.valor),
        valorFormatado: new Intl.NumberFormat('pt-BR', { 
          minimumFractionDigits: 2, 
          maximumFractionDigits: 4 
        }).format(parseFloat(item.valor))
      }));

      return {
        fonte: `Banco Central - Série ${codigo}`,
        dados: dadosProcessados,
        metadata: {
          total: dadosProcessados.length,
          coletadoEm: new Date().toISOString(),
          qualidade: 'alta'
        }
      };
    } catch (error) {
      throw new Error(`Erro ao buscar série ${codigo}: ${error}`);
    }
  }

  async buscarTaxaSelic(dataInicio?: string, dataFim?: string): Promise<DadosGovernamentais> {
    return this.buscarSerieEconomica(432, dataInicio, dataFim);
  }

  async buscarIPCA(dataInicio?: string, dataFim?: string): Promise<DadosGovernamentais> {
    return this.buscarSerieEconomica(433, dataInicio, dataFim);
  }

  async buscarDolar(dataInicio?: string, dataFim?: string): Promise<DadosGovernamentais> {
    return this.buscarSerieEconomica(1, dataInicio, dataFim);
  }

  async buscarEuro(dataInicio?: string, dataFim?: string): Promise<DadosGovernamentais> {
    return this.buscarSerieEconomica(21619, dataInicio, dataFim);
  }

  // =============== ViaCEP API Real ===============
  
  async buscarEnderecoPorCEP(cep: string): Promise<DadosGovernamentais> {
    const cepLimpo = cep.replace(/\D/g, '');
    
    if (cepLimpo.length !== 8) {
      throw new Error('CEP deve conter 8 dígitos');
    }

    const url = `https://viacep.com.br/ws/${cepLimpo}/json/`;
    
    try {
      const response = await axios.get(url, { timeout: this.TIMEOUT });
      
      if (response.data.erro) {
        throw new Error('CEP não encontrado');
      }

      return {
        fonte: 'ViaCEP',
        dados: [response.data],
        metadata: {
          total: 1,
          coletadoEm: new Date().toISOString(),
          qualidade: 'alta'
        }
      };
    } catch (error) {
      throw new Error(`Erro ao buscar CEP ${cep}: ${error}`);
    }
  }

  async buscarEnderecosPorLogradouro(uf: string, cidade: string, logradouro: string): Promise<DadosGovernamentais> {
    const url = `https://viacep.com.br/ws/${uf}/${cidade}/${logradouro}/json/`;
    
    try {
      const response = await axios.get(url, { timeout: this.TIMEOUT });
      
      if (!Array.isArray(response.data) || response.data.length === 0) {
        throw new Error('Nenhum endereço encontrado');
      }

      return {
        fonte: 'ViaCEP - Busca por Logradouro',
        dados: response.data,
        metadata: {
          total: response.data.length,
          coletadoEm: new Date().toISOString(),
          qualidade: 'alta'
        }
      };
    } catch (error) {
      throw new Error(`Erro ao buscar endereços: ${error}`);
    }
  }

  // =============== CNJ API Simulada (Dados Estruturados) ===============
  
  async buscarDadosJudiciarios(tribunal?: string): Promise<DadosGovernamentais> {
    // Simulação de dados judiciais estruturados baseados em dados reais do CNJ
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay da API

    const tribunais = [
      'STF', 'STJ', 'TST', 'TSE', 'STM',
      'TRF1', 'TRF2', 'TRF3', 'TRF4', 'TRF5',
      'TJSP', 'TJRJ', 'TJMG', 'TJRS', 'TJPR',
      'TJSC', 'TJGO', 'TJBA', 'TJPE', 'TJCE'
    ];

    const dadosSimulados = tribunais
      .filter(t => !tribunal || t === tribunal.toUpperCase())
      .map(sigla => ({
        tribunal: sigla,
        processos_pendentes: Math.floor(Math.random() * 100000) + 10000,
        processos_julgados_2024: Math.floor(Math.random() * 50000) + 5000,
        tempo_medio_julgamento_dias: Math.floor(Math.random() * 365) + 30,
        taxa_congestionamento: (Math.random() * 0.4 + 0.3).toFixed(3),
        magistrados_ativos: Math.floor(Math.random() * 200) + 20,
        servidores: Math.floor(Math.random() * 1000) + 100,
        orcamento_2024: (Math.random() * 500000000 + 50000000).toFixed(2)
      }));

    return {
      fonte: 'CNJ - Dados Judiciais (Simulado)',
      dados: dadosSimulados,
      metadata: {
        total: dadosSimulados.length,
        coletadoEm: new Date().toISOString(),
        proximaAtualizacao: 'Dados atualizados mensalmente',
        qualidade: 'media'
      }
    };
  }

  // =============== Portal da Transparência API Simulada ===============
  
  async buscarGastosPublicos(orgao?: string, ano?: number): Promise<DadosGovernamentais> {
    await new Promise(resolve => setTimeout(resolve, 1200));

    const orgaos = [
      'Ministério da Educação', 'Ministério da Saúde', 'Ministério da Defesa',
      'Ministério da Infraestrutura', 'Ministério da Justiça', 'Ministério da Fazenda',
      'Ministério do Desenvolvimento Social', 'Ministério da Agricultura',
      'Ministério da Ciência e Tecnologia', 'Ministério do Meio Ambiente'
    ];

    const anoConsulta = ano || new Date().getFullYear();
    
    const dadosSimulados = orgaos
      .filter(o => !orgao || o.toLowerCase().includes(orgao.toLowerCase()))
      .map(nomeOrgao => ({
        orgao: nomeOrgao,
        ano: anoConsulta,
        orcamento_autorizado: (Math.random() * 50000000000 + 1000000000).toFixed(2),
        orcamento_empenhado: (Math.random() * 40000000000 + 800000000).toFixed(2),
        orcamento_liquidado: (Math.random() * 35000000000 + 700000000).toFixed(2),
        orcamento_pago: (Math.random() * 30000000000 + 600000000).toFixed(2),
        percentual_execucao: (Math.random() * 30 + 70).toFixed(1),
        contratos_ativos: Math.floor(Math.random() * 1000) + 100,
        fornecedores_unicos: Math.floor(Math.random() * 500) + 50,
        processos_licitacao: Math.floor(Math.random() * 200) + 20
      }));

    return {
      fonte: 'Portal da Transparência (Simulado)',
      dados: dadosSimulados,
      metadata: {
        total: dadosSimulados.length,
        coletadoEm: new Date().toISOString(),
        proximaAtualizacao: 'Dados atualizados diariamente',
        qualidade: 'media'
      }
    };
  }

  // =============== INEP - Dados Educacionais Simulados ===============
  
  async buscarDadosEducacionais(estado?: string, nivel?: string): Promise<DadosGovernamentais> {
    await new Promise(resolve => setTimeout(resolve, 800));

    const estados = ['SP', 'RJ', 'MG', 'RS', 'PR', 'SC', 'BA', 'GO', 'PE', 'CE'];
    const niveis = ['fundamental', 'medio', 'superior'];

    const dadosSimulados = estados
      .filter(uf => !estado || uf === estado.toUpperCase())
      .flatMap(uf => 
        niveis
          .filter(n => !nivel || n === nivel.toLowerCase())
          .map(nivelEnsino => ({
            uf,
            nivel_ensino: nivelEnsino,
            escolas_ativas: Math.floor(Math.random() * 5000) + 500,
            alunos_matriculados: Math.floor(Math.random() * 500000) + 50000,
            professores: Math.floor(Math.random() * 30000) + 3000,
            taxa_aprovacao: (Math.random() * 20 + 75).toFixed(1),
            taxa_abandono: (Math.random() * 10 + 2).toFixed(1),
            nota_media_avaliacoes: (Math.random() * 3 + 5).toFixed(1),
            investimento_por_aluno: (Math.random() * 5000 + 3000).toFixed(2),
            infraestrutura_score: (Math.random() * 3 + 6).toFixed(1)
          }))
      );

    return {
      fonte: 'INEP - Dados Educacionais (Simulado)',
      dados: dadosSimulados,
      metadata: {
        total: dadosSimulados.length,
        coletadoEm: new Date().toISOString(),
        proximaAtualizacao: 'Dados atualizados anualmente',
        qualidade: 'media'
      }
    };
  }

  // =============== Métodos Utilitários ===============

  obterAPIsDisponiveis(): GovernmentAPI[] {
    return [
      {
        id: 'ibge_localidades',
        nome: 'IBGE - Localidades',
        descricao: 'API oficial do IBGE para consulta de municípios, estados e regiões',
        baseUrl: 'https://servicodados.ibge.gov.br/api/v1/localidades',
        endpoints: [
          {
            path: '/municipios',
            metodo: 'GET',
            descricao: 'Lista todos os municípios brasileiros',
            parametros: [],
            exemplo: '/municipios',
            retornaTipo: 'Array<Municipio>'
          },
          {
            path: '/estados/{uf}/municipios',
            metodo: 'GET',
            descricao: 'Lista municípios de um estado específico',
            parametros: [
              { nome: 'uf', tipo: 'string', obrigatorio: true, descricao: 'Sigla do estado', exemplo: 'SP' }
            ],
            exemplo: '/estados/SP/municipios',
            retornaTipo: 'Array<Municipio>'
          }
        ],
        documentacao: 'https://servicodados.ibge.gov.br/api/docs/localidades',
        status: 'ativo',
        autenticacao: false
      },
      {
        id: 'bacen_series',
        nome: 'Banco Central - Séries Temporais',
        descricao: 'API oficial do Banco Central para dados econômicos',
        baseUrl: 'https://api.bcb.gov.br/dados/serie',
        endpoints: [
          {
            path: '/bcdata.sgs.{codigo}/dados',
            metodo: 'GET',
            descricao: 'Busca série temporal por código',
            parametros: [
              { nome: 'codigo', tipo: 'number', obrigatorio: true, descricao: 'Código da série', exemplo: '432' },
              { nome: 'dataInicial', tipo: 'string', obrigatorio: false, descricao: 'Data inicial (DD/MM/AAAA)', exemplo: '01/01/2024' },
              { nome: 'dataFinal', tipo: 'string', obrigatorio: false, descricao: 'Data final (DD/MM/AAAA)', exemplo: '31/12/2024' }
            ],
            exemplo: '/bcdata.sgs.432/dados?formato=json',
            retornaTipo: 'Array<SerieEconomica>'
          }
        ],
        documentacao: 'https://dadosabertos.bcb.gov.br/dataset/20542-selic-acumulada-no-mes',
        status: 'ativo',
        autenticacao: false
      },
      {
        id: 'viacep',
        nome: 'ViaCEP',
        descricao: 'API gratuita para consulta de CEPs brasileiros',
        baseUrl: 'https://viacep.com.br/ws',
        endpoints: [
          {
            path: '/{cep}/json/',
            metodo: 'GET',
            descricao: 'Busca endereço por CEP',
            parametros: [
              { nome: 'cep', tipo: 'string', obrigatorio: true, descricao: 'CEP com 8 dígitos', exemplo: '01001000' }
            ],
            exemplo: '/01001000/json/',
            retornaTipo: 'Endereco'
          }
        ],
        documentacao: 'https://viacep.com.br/',
        status: 'ativo',
        autenticacao: false
      },
      {
        id: 'cnj_simulado',
        nome: 'CNJ - Dados Judiciais (Simulado)',
        descricao: 'Dados judiciais estruturados baseados em estatísticas do CNJ',
        baseUrl: 'simulado',
        endpoints: [
          {
            path: '/dados-judiciarios',
            metodo: 'GET',
            descricao: 'Estatísticas dos tribunais brasileiros',
            parametros: [
              { nome: 'tribunal', tipo: 'string', obrigatorio: false, descricao: 'Sigla do tribunal', exemplo: 'STF' }
            ],
            exemplo: '/dados-judiciarios?tribunal=TJSP',
            retornaTipo: 'Array<EstatisticaTribunal>'
          }
        ],
        documentacao: 'https://www.cnj.jus.br/pesquisas-judiciarias/',
        status: 'ativo',
        autenticacao: false
      },
      {
        id: 'transparencia_simulado',
        nome: 'Portal da Transparência (Simulado)',
        descricao: 'Dados de gastos públicos estruturados',
        baseUrl: 'simulado',
        endpoints: [
          {
            path: '/gastos-publicos',
            metodo: 'GET',
            descricao: 'Gastos por órgão público',
            parametros: [
              { nome: 'orgao', tipo: 'string', obrigatorio: false, descricao: 'Nome do órgão', exemplo: 'Educação' },
              { nome: 'ano', tipo: 'number', obrigatorio: false, descricao: 'Ano de referência', exemplo: '2024' }
            ],
            exemplo: '/gastos-publicos?orgao=Educação&ano=2024',
            retornaTipo: 'Array<GastoPublico>'
          }
        ],
        documentacao: 'https://portaldatransparencia.gov.br/',
        status: 'ativo',
        autenticacao: false
      }
    ];
  }

  async testarConectividade(): Promise<{ api: string; status: string; tempo: number; erro?: string }[]> {
    const testes = [
      { nome: 'IBGE Estados', teste: () => this.buscarTodasRegioes() },
      { nome: 'Banco Central Selic', teste: () => this.buscarTaxaSelic() },
      { nome: 'ViaCEP', teste: () => this.buscarEnderecoPorCEP('01001000') },
      { nome: 'CNJ Simulado', teste: () => this.buscarDadosJudiciarios() },
      { nome: 'Transparência Simulado', teste: () => this.buscarGastosPublicos() }
    ];

    const resultados = [];

    for (const teste of testes) {
      const inicio = Date.now();
      try {
        await teste.teste();
        resultados.push({
          api: teste.nome,
          status: 'OK',
          tempo: Date.now() - inicio
        });
      } catch (error: any) {
        resultados.push({
          api: teste.nome,
          status: 'ERRO',
          tempo: Date.now() - inicio,
          erro: error.message
        });
      }
    }

    return resultados;
  }

  // Códigos das principais séries do Banco Central
  obterCodigosSeriesBacen(): { codigo: number; nome: string; descricao: string }[] {
    return [
      { codigo: 432, nome: 'Taxa Selic', descricao: 'Taxa básica de juros (% a.a.)' },
      { codigo: 433, nome: 'IPCA', descricao: 'Índice de Preços ao Consumidor Amplo (% a.m.)' },
      { codigo: 1, nome: 'Dólar', descricao: 'Taxa de câmbio - Dólar americano (R$/US$)' },
      { codigo: 21619, nome: 'Euro', descricao: 'Taxa de câmbio - Euro (R$/EUR)' },
      { codigo: 4389, nome: 'PIB', descricao: 'Produto Interno Bruto (R$ milhões)' },
      { codigo: 24369, nome: 'Taxa de Desemprego', descricao: 'Taxa de desocupação (%)' },
      { codigo: 11, nome: 'IGP-M', descricao: 'Índice Geral de Preços do Mercado (% a.m.)' },
      { codigo: 189, nome: 'IGP-DI', descricao: 'Índice Geral de Preços - Disponibilidade Interna (% a.m.)' },
      { codigo: 190, nome: 'INPC', descricao: 'Índice Nacional de Preços ao Consumidor (% a.m.)' },
      { codigo: 256, nome: 'Reservas Internacionais', descricao: 'Reservas internacionais (US$ milhões)' }
    ];
  }
}

export const integradorApisGoverno = new IntegradorApisGoverno();
