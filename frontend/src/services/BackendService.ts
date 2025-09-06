import axios from 'axios';

// Configuração base da API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratamento de respostas e monitoramento
api.interceptors.response.use(
  (response) => {
    // Log de performance para monitoramento
    const responseTime = Date.now() - (response.config as any).startTime;
    if (responseTime > 1000) {
      console.warn(`Resposta lenta detectada: ${responseTime}ms para ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      // Não redirecionar automaticamente em caso de erro 401
      console.warn('Token de autenticação inválido');
    }
    
    // Log de erros para monitoramento
    console.error('Erro na API:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message
    });
    
    return Promise.reject(error);
  }
);

// Adicionar timestamp para medir tempo de resposta
api.interceptors.request.use((config) => {
  (config as any).startTime = Date.now();
  return config;
});

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  metadata?: {
    total?: number;
    page?: number;
    pageSize?: number;
    hasNext?: boolean;
  };
}

export interface UploadResponse {
  arquivo_id: string;
  nome_arquivo: string;
  tamanho: number;
  colunas: string[];
  linhas: number;
  status: 'processado' | 'erro' | 'processando';
  preview: any[];
}

export interface AnaliseResponse {
  analise_id: string;
  tipo: string;
  status: 'concluida' | 'erro' | 'processando';
  resultados: {
    estatisticas_descritivas?: any;
    correlacoes?: any;
    outliers?: any;
    missing_values?: any;
    visualizacoes?: string[];
  };
  tempo_processamento: number;
  created_at: string;
}

export interface DashboardData {
  graficos: {
    id: string;
    tipo: 'linha' | 'barra' | 'pizza' | 'dispersao' | 'heatmap';
    dados: any;
    titulo: string;
    descricao: string;
  }[];
  metricas: {
    nome: string;
    valor: number | string;
    unidade?: string;
    tendencia?: 'up' | 'down' | 'stable';
  }[];
  insights: string[];
}

export interface RelatorioData {
  id: string;
  titulo: string;
  tipo: 'pdf' | 'docx' | 'html';
  status: 'gerado' | 'erro' | 'gerando';
  url_download?: string;
  secoes: {
    id: string;
    titulo: string;
    conteudo: string;
    graficos?: string[];
  }[];
  created_at: string;
}

class BackendService {
  // ============= UPLOAD DE DADOS =============
  
  async uploadArquivo(arquivo: File, opcoes?: {
    separator?: string;
    encoding?: string;
    skipRows?: number;
  }): Promise<ApiResponse<UploadResponse>> {
    try {
      const formData = new FormData();
      formData.append('arquivo', arquivo);
      
      if (opcoes) {
        Object.entries(opcoes).forEach(([key, value]) => {
          formData.append(key, value.toString());
        });
      }

      const response = await api.post('/upload/arquivo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return {
        success: true,
        data: response.data,
        message: 'Arquivo enviado com sucesso'
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.detail || error.message,
        message: 'Erro ao enviar arquivo'
      };
    }
  }

  async obterArquivosUpload(): Promise<ApiResponse<UploadResponse[]>> {
    try {
      const response = await api.get('/upload/arquivos');
      return {
        success: true,
        data: response.data,
        message: 'Arquivos obtidos com sucesso'
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.detail || error.message,
        message: 'Erro ao obter arquivos'
      };
    }
  }

  async excluirArquivo(arquivoId: string): Promise<ApiResponse<void>> {
    try {
      await api.delete(`/upload/arquivo/${arquivoId}`);
      return {
        success: true,
        message: 'Arquivo excluído com sucesso'
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.detail || error.message,
        message: 'Erro ao excluir arquivo'
      };
    }
  }

  // ============= ANÁLISE DE DADOS =============

  async iniciarAnalise(arquivoId: string, tiposAnalise: string[]): Promise<ApiResponse<AnaliseResponse>> {
    try {
      const response = await api.post('/analise/executar', {
        arquivo_id: arquivoId,
        tipos_analise: tiposAnalise
      });

      return {
        success: true,
        data: response.data,
        message: 'Análise iniciada com sucesso'
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.detail || error.message,
        message: 'Erro ao iniciar análise'
      };
    }
  }

  async obterAnalise(analiseId: string): Promise<ApiResponse<AnaliseResponse>> {
    try {
      const response = await api.get(`/analise/${analiseId}`);
      return {
        success: true,
        data: response.data,
        message: 'Análise obtida com sucesso'
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.detail || error.message,
        message: 'Erro ao obter análise'
      };
    }
  }

  async obterAnalises(): Promise<ApiResponse<AnaliseResponse[]>> {
    try {
      const response = await api.get('/analise/todas');
      return {
        success: true,
        data: response.data,
        message: 'Análises obtidas com sucesso'
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.detail || error.message,
        message: 'Erro ao obter análises'
      };
    }
  }

  // ============= DASHBOARD =============

  async obterDadosDashboard(arquivoId?: string): Promise<ApiResponse<DashboardData>> {
    try {
      const params = arquivoId ? { arquivo_id: arquivoId } : {};
      const response = await api.get('/dashboard/dados', { params });
      
      return {
        success: true,
        data: response.data,
        message: 'Dados do dashboard obtidos com sucesso'
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.detail || error.message,
        message: 'Erro ao obter dados do dashboard'
      };
    }
  }

  async salvarDashboard(nome: string, configuracao: any): Promise<ApiResponse<{ id: string }>> {
    try {
      const response = await api.post('/dashboard/salvar', {
        nome,
        configuracao
      });

      return {
        success: true,
        data: response.data,
        message: 'Dashboard salvo com sucesso'
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.detail || error.message,
        message: 'Erro ao salvar dashboard'
      };
    }
  }

  // ============= RELATÓRIOS =============

  async gerarRelatorio(tipo: 'pdf' | 'docx' | 'html', dados: {
    titulo: string;
    analise_id?: string;
    arquivo_id?: string;
    secoes: string[];
    incluir_graficos: boolean;
  }): Promise<ApiResponse<RelatorioData>> {
    try {
      const response = await api.post('/relatorios/gerar', {
        ...dados,
        tipo
      });

      return {
        success: true,
        data: response.data,
        message: 'Relatório gerado com sucesso'
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.detail || error.message,
        message: 'Erro ao gerar relatório'
      };
    }
  }

  async obterRelatorios(): Promise<ApiResponse<RelatorioData[]>> {
    try {
      const response = await api.get('/relatorios/todos');
      return {
        success: true,
        data: response.data,
        message: 'Relatórios obtidos com sucesso'
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.detail || error.message,
        message: 'Erro ao obter relatórios'
      };
    }
  }

  async baixarRelatorio(relatorioId: string): Promise<string> {
    try {
      const response = await api.get(`/relatorios/${relatorioId}/download`, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      return url;
    } catch (error: any) {
      throw new Error('Erro ao baixar relatório');
    }
  }

  // ============= AUTOML =============

  async iniciarAutoML(arquivoId: string, configuracao: {
    target_column: string;
    problem_type: 'classification' | 'regression';
    test_size: number;
    cv_folds: number;
    max_time_minutes: number;
  }): Promise<ApiResponse<{ experiment_id: string }>> {
    try {
      const response = await api.post('/automl/iniciar', {
        arquivo_id: arquivoId,
        ...configuracao
      });

      return {
        success: true,
        data: response.data,
        message: 'Experimento AutoML iniciado com sucesso'
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.detail || error.message,
        message: 'Erro ao iniciar AutoML'
      };
    }
  }

  async obterExperimentoAutoML(experimentId: string): Promise<ApiResponse<any>> {
    try {
      const response = await api.get(`/automl/experimento/${experimentId}`);
      return {
        success: true,
        data: response.data,
        message: 'Experimento obtido com sucesso'
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.detail || error.message,
        message: 'Erro ao obter experimento'
      };
    }
  }

  // ============= DADOS PÚBLICOS =============

  async buscarDadosPublicos(fonte: string, parametros?: any): Promise<ApiResponse<any[]>> {
    try {
      const response = await api.post('/dados-publicos/buscar', {
        fonte,
        parametros
      });

      return {
        success: true,
        data: response.data,
        message: 'Dados públicos obtidos com sucesso'
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.detail || error.message,
        message: 'Erro ao buscar dados públicos'
      };
    }
  }

  async obterFontesDisponiveis(): Promise<ApiResponse<any[]>> {
    try {
      const response = await api.get('/dados-publicos/fontes');
      return {
        success: true,
        data: response.data,
        message: 'Fontes obtidas com sucesso'
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.detail || error.message,
        message: 'Erro ao obter fontes'
      };
    }
  }

  // ============= SISTEMA DE SAÚDE =============

  async verificarStatusSistema(): Promise<ApiResponse<{
    status: 'healthy' | 'degraded' | 'down';
    components: {
      database: 'healthy' | 'down';
      redis: 'healthy' | 'down';
      apis_externas: 'healthy' | 'degraded' | 'down';
    };
    uptime: number;
    version: string;
  }>> {
    try {
      const response = await api.get('/health');
      return {
        success: true,
        data: response.data,
        message: 'Status do sistema obtido com sucesso'
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.detail || error.message,
        message: 'Erro ao verificar status do sistema'
      };
    }
  }

  // ============= MÉTODOS UTILITÁRIOS =============

  async testarConexao(): Promise<boolean> {
    try {
      await api.get('/health');
      return true;
    } catch {
      return false;
    }
  }

  obterUrlCompleta(endpoint: string): string {
    return `${API_BASE_URL}${endpoint}`;
  }
}

// Instância singleton
const backendService = new BackendService();
export default backendService;
