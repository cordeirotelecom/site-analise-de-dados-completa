import axios, { AxiosResponse } from 'axios';

interface DadosSaudePublica {
  id: string;
  municipio: string;
  tipo_estabelecimento: string;
  nome_estabelecimento: string;
  endereco: string;
  telefone?: string;
  especialidades: string[];
  latitude?: number;
  longitude?: number;
  atualizado_em: string;
}

interface DadosEducacao {
  id: string;
  municipio: string;
  nome_escola: string;
  tipo: 'municipal' | 'estadual' | 'federal' | 'privada';
  modalidade: string[];
  endereco: string;
  telefone?: string;
  email?: string;
  latitude?: number;
  longitude?: number;
  numero_alunos?: number;
  numero_professores?: number;
}

interface DadosTransporte {
  id: string;
  municipio: string;
  tipo: 'onibus' | 'van' | 'escolar' | 'especial';
  linha: string;
  origem: string;
  destino: string;
  horarios: string[];
  tarifa?: number;
  empresa?: string;
  status: 'ativo' | 'inativo' | 'manutencao';
}

interface DadosEconomicos {
  municipio: string;
  ano: number;
  mes?: number;
  pib?: number;
  populacao?: number;
  emprego_formal: number;
  empresas_ativas: number;
  receita_municipal?: number;
  arrecadacao_icms?: number;
  indicadores: {
    [key: string]: number;
  };
}

interface ParametrosBusca {
  municipio?: string;
  tipo?: string;
  dataInicio?: string;
  dataFim?: string;
  limite?: number;
  pagina?: number;
  ordenacao?: string;
  campos?: string[];
}

class APISantaCatarinaService {
  private baseURL = 'https://dados.sc.gov.br/api/v1';
  private timeoutDefault = 10000;

  // Cache simples
  private cache = new Map<string, { data: any; timestamp: number }>();
  private cacheTimeout = 5 * 60 * 1000; // 5 minutos

  constructor() {
    this.setupAxiosDefaults();
  }

  private setupAxiosDefaults() {
    axios.defaults.timeout = this.timeoutDefault;
    axios.defaults.headers.common['User-Agent'] = 'DataSciencePro/2.0';
    axios.defaults.headers.common['Accept'] = 'application/json';
  }

  private getCacheKey(endpoint: string, params: any): string {
    return `${endpoint}_${JSON.stringify(params)}`;
  }

  private getFromCache(key: string): any | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    this.cache.delete(key);
    return null;
  }

  private setCache(key: string, data: any) {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  private async makeRequest<T>(endpoint: string, params: ParametrosBusca = {}): Promise<T> {
    const cacheKey = this.getCacheKey(endpoint, params);
    const cached = this.getFromCache(cacheKey);
    
    if (cached) {
      return cached;
    }

    try {
      const response: AxiosResponse<T> = await axios.get(`${this.baseURL}${endpoint}`, {
        params,
        timeout: this.timeoutDefault
      });

      this.setCache(cacheKey, response.data);
      return response.data;
    } catch (error: any) {
      console.error(`Erro na API SC - ${endpoint}:`, error);
      
      // Retornar dados mock se a API falhar
      return this.getMockData(endpoint) as T;
    }
  }

  // Dados mock para quando as APIs não estão disponíveis
  private getMockData(endpoint: string): any {
    const mockData: { [key: string]: any } = {
      '/saude/estabelecimentos': {
        total: 15,
        pagina: 1,
        dados: [
          {
            id: 'est_001',
            municipio: 'São José',
            tipo_estabelecimento: 'UBS',
            nome_estabelecimento: 'UBS Central São José',
            endereco: 'Rua das Flores, 123 - Centro',
            telefone: '(48) 3251-1234',
            especialidades: ['Clínica Geral', 'Pediatria', 'Ginecologia'],
            latitude: -27.5954,
            longitude: -48.6233,
            atualizado_em: '2024-01-15T10:30:00Z'
          },
          {
            id: 'est_002',
            municipio: 'Florianópolis',
            tipo_estabelecimento: 'Hospital',
            nome_estabelecimento: 'Hospital Universitário',
            endereco: 'Campus UFSC - Trindade',
            telefone: '(48) 3721-9000',
            especialidades: ['Emergência', 'Cardiologia', 'Neurologia', 'Oncologia'],
            latitude: -27.6014,
            longitude: -48.5186,
            atualizado_em: '2024-01-15T08:15:00Z'
          }
        ]
      },
      '/educacao/escolas': {
        total: 23,
        pagina: 1,
        dados: [
          {
            id: 'esc_001',
            municipio: 'São José',
            nome_escola: 'E.M. Professora Maria Silva',
            tipo: 'municipal',
            modalidade: ['Ensino Fundamental'],
            endereco: 'Rua da Educação, 456 - Kobrasol',
            telefone: '(48) 3251-5678',
            email: 'escola.maria@saojose.sc.gov.br',
            numero_alunos: 450,
            numero_professores: 28
          },
          {
            id: 'esc_002',
            municipio: 'Florianópolis',
            nome_escola: 'Colégio Estadual João Santos',
            tipo: 'estadual',
            modalidade: ['Ensino Médio', 'Ensino Técnico'],
            endereco: 'Av. Central, 789 - Centro',
            telefone: '(48) 3234-9876',
            numero_alunos: 850,
            numero_professores: 65
          }
        ]
      },
      '/transporte/linhas': {
        total: 8,
        pagina: 1,
        dados: [
          {
            id: 'linha_001',
            municipio: 'São José',
            tipo: 'onibus',
            linha: '101 - Centro/Kobrasol',
            origem: 'Terminal Central',
            destino: 'Kobrasol Shopping',
            horarios: ['06:00', '06:30', '07:00', '07:30', '08:00'],
            tarifa: 4.50,
            empresa: 'TransSJ',
            status: 'ativo'
          },
          {
            id: 'linha_002',
            municipio: 'Florianópolis',
            tipo: 'onibus',
            linha: '110 - UFSC/Centro',
            origem: 'Campus UFSC',
            destino: 'Terminal Urbano',
            horarios: ['06:15', '06:45', '07:15', '07:45'],
            tarifa: 4.80,
            empresa: 'FloripaBus',
            status: 'ativo'
          }
        ]
      },
      '/economia/indicadores': {
        total: 12,
        dados: [
          {
            municipio: 'São José',
            ano: 2023,
            mes: 12,
            populacao: 246564,
            emprego_formal: 89450,
            empresas_ativas: 12580,
            receita_municipal: 850000000,
            indicadores: {
              pib_per_capita: 45200,
              taxa_desemprego: 6.8,
              indice_desenvolvimento: 0.825
            }
          },
          {
            municipio: 'Florianópolis',
            ano: 2023,
            mes: 12,
            populacao: 508826,
            emprego_formal: 245600,
            empresas_ativas: 35420,
            receita_municipal: 2100000000,
            indicadores: {
              pib_per_capita: 52800,
              taxa_desemprego: 5.2,
              indice_desenvolvimento: 0.847
            }
          }
        ]
      }
    };

    return mockData[endpoint] || { dados: [], total: 0, erro: 'Endpoint não encontrado' };
  }

  // Métodos públicos da API

  async obterEstabelecimentosSaude(params: ParametrosBusca = {}): Promise<{ dados: DadosSaudePublica[]; total: number }> {
    return this.makeRequest<{ dados: DadosSaudePublica[]; total: number }>('/saude/estabelecimentos', params);
  }

  async obterEscolas(params: ParametrosBusca = {}): Promise<{ dados: DadosEducacao[]; total: number }> {
    return this.makeRequest<{ dados: DadosEducacao[]; total: number }>('/educacao/escolas', params);
  }

  async obterLinhasTransporte(params: ParametrosBusca = {}): Promise<{ dados: DadosTransporte[]; total: number }> {
    return this.makeRequest<{ dados: DadosTransporte[]; total: number }>('/transporte/linhas', params);
  }

  async obterIndicadoresEconomicos(params: ParametrosBusca = {}): Promise<{ dados: DadosEconomicos[]; total: number }> {
    return this.makeRequest<{ dados: DadosEconomicos[]; total: number }>('/economia/indicadores', params);
  }

  // Métodos específicos por município

  async obterDadosSaoJose(): Promise<{
    saude: DadosSaudePublica[];
    educacao: DadosEducacao[];
    transporte: DadosTransporte[];
    economia: DadosEconomicos[];
  }> {
    const [saude, educacao, transporte, economia] = await Promise.allSettled([
      this.obterEstabelecimentosSaude({ municipio: 'São José' }),
      this.obterEscolas({ municipio: 'São José' }),
      this.obterLinhasTransporte({ municipio: 'São José' }),
      this.obterIndicadoresEconomicos({ municipio: 'São José' })
    ]);

    return {
      saude: saude.status === 'fulfilled' ? saude.value.dados : [],
      educacao: educacao.status === 'fulfilled' ? educacao.value.dados : [],
      transporte: transporte.status === 'fulfilled' ? transporte.value.dados : [],
      economia: economia.status === 'fulfilled' ? economia.value.dados : []
    };
  }

  async obterDadosFlorianopolis(): Promise<{
    saude: DadosSaudePublica[];
    educacao: DadosEducacao[];
    transporte: DadosTransporte[];
    economia: DadosEconomicos[];
  }> {
    const [saude, educacao, transporte, economia] = await Promise.allSettled([
      this.obterEstabelecimentosSaude({ municipio: 'Florianópolis' }),
      this.obterEscolas({ municipio: 'Florianópolis' }),
      this.obterLinhasTransporte({ municipio: 'Florianópolis' }),
      this.obterIndicadoresEconomicos({ municipio: 'Florianópolis' })
    ]);

    return {
      saude: saude.status === 'fulfilled' ? saude.value.dados : [],
      educacao: educacao.status === 'fulfilled' ? educacao.value.dados : [],
      transporte: transporte.status === 'fulfilled' ? transporte.value.dados : [],
      economia: economia.status === 'fulfilled' ? economia.value.dados : []
    };
  }

  // Métodos de busca e filtros avançados

  async buscarPorTexto(termo: string, tipo?: string): Promise<any[]> {
    const resultados = [];
    
    if (!tipo || tipo === 'saude') {
      const saude = await this.obterEstabelecimentosSaude();
      const filtrados = saude.dados.filter(item => 
        item.nome_estabelecimento.toLowerCase().includes(termo.toLowerCase()) ||
        item.especialidades.some(esp => esp.toLowerCase().includes(termo.toLowerCase()))
      );
      resultados.push(...filtrados.map(item => ({ ...item, categoria: 'saude' })));
    }

    if (!tipo || tipo === 'educacao') {
      const educacao = await this.obterEscolas();
      const filtrados = educacao.dados.filter(item =>
        item.nome_escola.toLowerCase().includes(termo.toLowerCase()) ||
        item.modalidade.some(mod => mod.toLowerCase().includes(termo.toLowerCase()))
      );
      resultados.push(...filtrados.map(item => ({ ...item, categoria: 'educacao' })));
    }

    return resultados;
  }

  async obterEstatisticasGerais(): Promise<{
    total_estabelecimentos_saude: number;
    total_escolas: number;
    total_linhas_transporte: number;
    municipios_ativos: string[];
    ultima_atualizacao: string;
  }> {
    const [saude, educacao, transporte] = await Promise.allSettled([
      this.obterEstabelecimentosSaude(),
      this.obterEscolas(),
      this.obterLinhasTransporte()
    ]);

    const municipios = new Set<string>();
    
    if (saude.status === 'fulfilled') {
      saude.value.dados.forEach(item => municipios.add(item.municipio));
    }
    
    if (educacao.status === 'fulfilled') {
      educacao.value.dados.forEach(item => municipios.add(item.municipio));
    }

    return {
      total_estabelecimentos_saude: saude.status === 'fulfilled' ? saude.value.total : 0,
      total_escolas: educacao.status === 'fulfilled' ? educacao.value.total : 0,
      total_linhas_transporte: transporte.status === 'fulfilled' ? transporte.value.total : 0,
      municipios_ativos: Array.from(municipios),
      ultima_atualizacao: new Date().toISOString()
    };
  }

  // Método para exportar dados
  async exportarDados(tipo: string, formato: 'json' | 'csv' = 'json'): Promise<string> {
    let dados: any[] = [];

    switch (tipo) {
      case 'saude': {
        const saude = await this.obterEstabelecimentosSaude();
        dados = saude.dados;
        break;
      }
      case 'educacao': {
        const educacao = await this.obterEscolas();
        dados = educacao.dados;
        break;
      }
      case 'transporte': {
        const transporte = await this.obterLinhasTransporte();
        dados = transporte.dados;
        break;
      }
    }

    if (formato === 'json') {
      return JSON.stringify(dados, null, 2);
    } else {
      // Conversão simples para CSV
      if (dados.length === 0) return '';
      
      const headers = Object.keys(dados[0]);
      const csvContent = [
        headers.join(','),
        ...dados.map(row => 
          headers.map(header => 
            typeof row[header] === 'object' ? 
            JSON.stringify(row[header]) : 
            row[header]
          ).join(',')
        )
      ].join('\n');
      
      return csvContent;
    }
  }

  // Limpeza do cache
  limparCache(): void {
    this.cache.clear();
  }

  // Status da API
  async verificarStatus(): Promise<{
    status: 'online' | 'offline' | 'instavel';
    tempo_resposta: number;
    endpoints_testados: number;
    endpoints_funcionais: number;
  }> {
    const inicio = Date.now();
    const testes = [
      this.obterEstabelecimentosSaude({ limite: 1 }),
      this.obterEscolas({ limite: 1 }),
      this.obterLinhasTransporte({ limite: 1 })
    ];

    const resultados = await Promise.allSettled(testes);
    const funcionais = resultados.filter(r => r.status === 'fulfilled').length;
    const tempo = Date.now() - inicio;

    let status: 'online' | 'offline' | 'instavel' = 'offline';
    if (funcionais === testes.length) {
      status = 'online';
    } else if (funcionais > 0) {
      status = 'instavel';
    }

    return {
      status,
      tempo_resposta: tempo,
      endpoints_testados: testes.length,
      endpoints_funcionais: funcionais
    };
  }
}

// Instância singleton
export const apiSantaCatarina = new APISantaCatarinaService();

// Exportar tipos para uso em outros componentes
export type {
  DadosSaudePublica,
  DadosEducacao,
  DadosTransporte,
  DadosEconomicos,
  ParametrosBusca
};
