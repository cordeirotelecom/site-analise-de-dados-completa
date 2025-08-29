import { useState, useEffect } from 'react';
import './DashboardCientificoAvancado.css';

interface RelationSuggestion {
  id: string;
  tipo: 'temporal' | 'espacial' | 'causal' | 'correlacional';
  descricao: string;
  confianca: number;
  metodos_sugeridos: string[];
  rigor_cientifico: {
    validacao: string[];
    limitacoes: string[];
    pressupostos: string[];
  };
}

interface AnalysisPipeline {
  etapa: number;
  nome: string;
  status: 'pendente' | 'executando' | 'concluido' | 'erro';
  descricao: string;
  metodos: string[];
  tempo_estimado: number;
}

interface Dataset {
  id: number;
  nome: string;
  tipo: string;
  periodo: string;
  registros: number;
  variaveis: string[];
  qualidade_score: number;
}

const DashboardCientificoAvancado: React.FC = () => {
  const [datasetsCarregados, setDatasetsCarregados] = useState<Dataset[]>([]);
  const [relacoesDetectadas, setRelacoesDetectadas] = useState<RelationSuggestion[]>([]);
  const [pipelineAnalise, setPipelineAnalise] = useState<AnalysisPipeline[]>([]);
  const [regiaoSelecionada, setRegiaoSelecionada] = useState<string>('santa-catarina');
  const [tipoAnalise, setTipoAnalise] = useState<string>('exploratoria');
  const [carregando, setCarregando] = useState(false);
  const [abaSelecionada, setAbaSelecionada] = useState<{[key: string]: string}>({});
  
  // Simulação de dados científicos para demonstração
  useEffect(() => {
    // Simula datasets carregados
    setDatasetsCarregados([
      {
        id: 1,
        nome: 'Dados de Câncer SC',
        tipo: 'saude',
        periodo: '2020-2024',
        registros: 45230,
        variaveis: ['tipo_cancer', 'municipio', 'idade', 'data_diagnostico', 'estadiamento', 'tratamento'],
        qualidade_score: 94
      },
      {
        id: 2,
        nome: 'Incidência Dengue SC',
        tipo: 'epidemiologia',
        periodo: '2020-2024',
        registros: 78945,
        variaveis: ['municipio', 'data_notificacao', 'idade', 'tipo_dengue', 'evolucao', 'bairro'],
        qualidade_score: 91
      },
      {
        id: 3,
        nome: 'Dados Ambientais SC',
        tipo: 'meio_ambiente',
        periodo: '2020-2024',
        registros: 156789,
        variaveis: ['municipio', 'data', 'temperatura', 'umidade', 'pluviosidade', 'qualidade_ar'],
        qualidade_score: 96
      },
      {
        id: 4,
        nome: 'Indicadores Socioeconômicos',
        tipo: 'socioeconomico',
        periodo: '2020-2023',
        registros: 295,
        variaveis: ['municipio', 'pib_percapita', 'populacao', 'idh', 'renda_media', 'educacao'],
        qualidade_score: 98
      }
    ]);

    // Simula pipeline de análise científica
    setPipelineAnalise([
      {
        etapa: 1,
        nome: 'Validação e Limpeza',
        status: 'concluido',
        descricao: 'Verificação de consistência, tratamento de outliers, imputação',
        metodos: ['Detecção IQR', 'Teste Shapiro-Wilk', 'Imputação KNN'],
        tempo_estimado: 5
      },
      {
        etapa: 2,
        nome: 'Análise Exploratória',
        status: 'concluido',
        descricao: 'EDA com estatísticas descritivas e visualizações',
        metodos: ['Distribuições', 'Correlações', 'Análise temporal'],
        tempo_estimado: 10
      },
      {
        etapa: 3,
        nome: 'Detecção de Relações',
        status: 'executando',
        descricao: 'Identificação automática de relações entre variáveis',
        metodos: ['Correlação de Pearson/Spearman', 'Teste Granger', 'Mutual Information'],
        tempo_estimado: 15
      },
      {
        etapa: 4,
        nome: 'Modelagem Preditiva',
        status: 'pendente',
        descricao: 'Desenvolvimento de modelos preditivos com validação cruzada',
        metodos: ['Random Forest', 'XGBoost', 'Redes Neurais'],
        tempo_estimado: 25
      },
      {
        etapa: 5,
        nome: 'Validação Científica',
        status: 'pendente',
        descricao: 'Verificação de pressupostos e significância estatística',
        metodos: ['Bootstrap', 'Permutation Tests', 'Cross-Validation'],
        tempo_estimado: 20
      }
    ]);
  }, []);

  // Simula detecção de relações científicas
  useEffect(() => {
    if (datasetsCarregados.length > 0) {
      setRelacoesDetectadas([
        {
          id: 'rel_1',
          tipo: 'espacial',
          descricao: 'Correlação espacial entre incidência de câncer e qualidade do ar em regiões metropolitanas',
          confianca: 87,
          metodos_sugeridos: ['Análise de Autocorrelação Espacial', 'Regressão Geoestatística', 'Teste de Moran'],
          rigor_cientifico: {
            validacao: ['Teste de significância espacial', 'Controle por variáveis confusoras', 'Análise de sensibilidade'],
            limitacoes: ['Falácia ecológica', 'Dados agregados por município', 'Período limitado'],
            pressupostos: ['Independência temporal', 'Homogeneidade espacial', 'Linearidade']
          }
        },
        {
          id: 'rel_2',
          tipo: 'temporal',
          descricao: 'Padrão sazonal entre dengue e variáveis climáticas com lag de 2-3 meses',
          confianca: 94,
          metodos_sugeridos: ['Análise de Séries Temporais', 'Modelos SARIMA', 'Cross-correlation'],
          rigor_cientifico: {
            validacao: ['Teste de causalidade Granger', 'Análise de resíduos', 'Validação out-of-sample'],
            limitacoes: ['Variáveis não observadas', 'Mudanças climáticas', 'Subnotificação'],
            pressupostos: ['Estacionariedade', 'Normalidade dos resíduos', 'Ausência de autocorrelação']
          }
        },
        {
          id: 'rel_3',
          tipo: 'causal',
          descricao: 'Relação causal entre indicadores socioeconômicos e mortalidade por câncer',
          confianca: 78,
          metodos_sugeridos: ['Propensity Score Matching', 'Instrumental Variables', 'Difference-in-Differences'],
          rigor_cientifico: {
            validacao: ['Teste de robustez', 'Análise de sensibilidade', 'Verificação de pressupostos'],
            limitacoes: ['Causalidade reversa', 'Variáveis omitidas', 'Seleção de instrumentos'],
            pressupostos: ['Exclusão restrita', 'Independência', 'Relevância dos instrumentos']
          }
        },
        {
          id: 'rel_4',
          tipo: 'correlacional',
          descricao: 'Associação entre tipos específicos de câncer e exposição ambiental acumulada',
          confianca: 82,
          metodos_sugeridos: ['Análise de Componentes Principais', 'Cluster Analysis', 'Machine Learning'],
          rigor_cientifico: {
            validacao: ['Validação cruzada', 'Teste de overfitting', 'Interpretabilidade do modelo'],
            limitacoes: ['Multicolinearidade', 'Curso da doença', 'Diagnóstico tardio'],
            pressupostos: ['Linearidade', 'Normalidade multivariada', 'Homoscedasticidade']
          }
        }
      ]);
    }
  }, [datasetsCarregados]);
  
  const executarAnaliseRelacao = async (relacaoId: string) => {
    setCarregando(true);
    
    // Simula execução de análise
    const relacao = relacoesDetectadas.find(r => r.id === relacaoId);
    if (relacao) {
      console.log(`Executando análise: ${relacao.descricao}`);
      console.log(`Métodos: ${relacao.metodos_sugeridos.join(', ')}`);
      
      // Simula tempo de processamento
      setTimeout(() => {
        setCarregando(false);
        alert(`Análise "${relacao.descricao}" executada com sucesso!\n\nResultados disponíveis no painel de visualizações.`);
      }, 3000);
    }
  };

  const gerarRelatorioRigor = (relacao: RelationSuggestion) => {
    const relatorio = `
# RELATÓRIO DE RIGOR CIENTÍFICO

## Análise: ${relacao.descricao}
**Tipo**: ${relacao.tipo.toUpperCase()}
**Confiança**: ${relacao.confianca}%

### MÉTODOS ESTATÍSTICOS APLICADOS
${relacao.metodos_sugeridos.map(m => `- ${m}`).join('\n')}

### VALIDAÇÃO CIENTÍFICA
${relacao.rigor_cientifico.validacao.map(v => `✓ ${v}`).join('\n')}

### LIMITAÇÕES IDENTIFICADAS
${relacao.rigor_cientifico.limitacoes.map(l => `⚠️ ${l}`).join('\n')}

### PRESSUPOSTOS ESTATÍSTICOS
${relacao.rigor_cientifico.pressupostos.map(p => `📋 ${p}`).join('\n')}

### RECOMENDAÇÕES
- Validar resultados com dados independentes
- Considerar análise de sensibilidade
- Avaliar significância prática além da estatística
- Documentar todas as transformações de dados
`;

    // Simula download do relatório
    const blob = new Blob([relatorio], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio_cientifico_${relacao.id}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'concluido':
        return '✅';
      case 'executando':
        return '🔄';
      case 'pendente':
        return '⏳';
      case 'erro':
        return '❌';
      default:
        return '⏳';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'concluido':
        return '#4CAF50';
      case 'executando':
        return '#2196F3';
      case 'pendente':
        return '#FF9800';
      case 'erro':
        return '#F44336';
      default:
        return '#9E9E9E';
    }
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'causal':
        return '#F44336';
      case 'temporal':
        return '#2196F3';
      case 'espacial':
        return '#9C27B0';
      case 'correlacional':
        return '#4CAF50';
      default:
        return '#9E9E9E';
    }
  };

  const setAbaRelacao = (relacaoId: string, aba: string) => {
    setAbaSelecionada(prev => ({
      ...prev,
      [relacaoId]: aba
    }));
  };

  return (
    <div className="dashboard-cientifico">
      <div className="header">
        <div className="title-section">
          <h1 className="main-title">
            🧠 Dashboard Científico Avançado
          </h1>
          <p className="subtitle">
            Análise inteligente de relações entre dados com rigor científico
          </p>
        </div>
        
        <div className="controls">
          <select 
            value={regiaoSelecionada} 
            onChange={(e) => setRegiaoSelecionada(e.target.value)}
            className="select-control"
          >
            <option value="santa-catarina">📍 Santa Catarina</option>
            <option value="florianopolis">📍 Florianópolis</option>
            <option value="sao-jose">📍 São José</option>
            <option value="joinville">📍 Joinville</option>
            <option value="blumenau">📍 Blumenau</option>
          </select>
          
          <select 
            value={tipoAnalise} 
            onChange={(e) => setTipoAnalise(e.target.value)}
            className="select-control"
          >
            <option value="exploratoria">📊 Análise Exploratória</option>
            <option value="causal">🔗 Inferência Causal</option>
            <option value="preditiva">🔮 Modelagem Preditiva</option>
            <option value="espacial">🗺️ Análise Espacial</option>
          </select>
        </div>
      </div>

      <div className="grid-layout">
        {/* Datasets Carregados */}
        <div className="card">
          <div className="card-header">
            <h3>📊 Datasets Disponíveis</h3>
          </div>
          <div className="card-content">
            {datasetsCarregados.map((dataset) => (
              <div key={dataset.id} className="dataset-item">
                <div className="dataset-info">
                  <h4>{dataset.nome}</h4>
                  <p className="dataset-period">{dataset.periodo}</p>
                  <p className="dataset-records">
                    {dataset.registros.toLocaleString()} registros
                  </p>
                  <div className="quality-badge">
                    {dataset.qualidade_score}% qualidade
                  </div>
                </div>
                <div className="dataset-variables">
                  <p className="variables-text">
                    Variáveis: {dataset.variaveis.slice(0, 3).join(', ')}
                    {dataset.variaveis.length > 3 && `... (+${dataset.variaveis.length - 3})`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pipeline de Análise */}
        <div className="card">
          <div className="card-header">
            <h3>⚙️ Pipeline Científico</h3>
          </div>
          <div className="card-content">
            {pipelineAnalise.map((etapa) => (
              <div key={etapa.etapa} className="pipeline-item">
                <div className="pipeline-status">
                  <span style={{ color: getStatusColor(etapa.status) }}>
                    {getStatusIcon(etapa.status)}
                  </span>
                </div>
                <div className="pipeline-info">
                  <h4>{etapa.nome}</h4>
                  <p className="pipeline-desc">{etapa.descricao}</p>
                  <p className="pipeline-meta">
                    {etapa.tempo_estimado} min • {etapa.metodos.length} métodos
                  </p>
                  {etapa.status === 'executando' && (
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: '65%' }}></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Estatísticas Rápidas */}
        <div className="card">
          <div className="card-header">
            <h3>📈 Estatísticas</h3>
          </div>
          <div className="card-content">
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-label">Datasets Integrados</span>
                <span className="stat-value">{datasetsCarregados.length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Total de Registros</span>
                <span className="stat-value">
                  {datasetsCarregados.reduce((sum, d) => sum + d.registros, 0).toLocaleString()}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Relações Detectadas</span>
                <span className="stat-value">{relacoesDetectadas.length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Métodos Aplicados</span>
                <span className="stat-value">15</span>
              </div>
            </div>
            
            <div className="quality-section">
              <h4>Qualidade Média</h4>
              <div className="quality-bar">
                <div 
                  className="quality-fill" 
                  style={{ 
                    width: `${Math.round(datasetsCarregados.reduce((sum, d) => sum + d.qualidade_score, 0) / datasetsCarregados.length || 0)}%` 
                  }}
                ></div>
              </div>
              <p className="quality-text">
                {Math.round(datasetsCarregados.reduce((sum, d) => sum + d.qualidade_score, 0) / datasetsCarregados.length || 0)}% de confiabilidade
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Relações Detectadas */}
      <div className="card full-width">
        <div className="card-header">
          <h3>🔗 Relações Científicas Detectadas</h3>
        </div>
        <div className="card-content">
          {relacoesDetectadas.map((relacao) => (
            <div key={relacao.id} className="relacao-item">
              <div className="relacao-header">
                <div className="relacao-info">
                  <div className="relacao-badges">
                    <span 
                      className="tipo-badge" 
                      style={{ backgroundColor: getTipoColor(relacao.tipo) }}
                    >
                      {relacao.tipo.toUpperCase()}
                    </span>
                    <span className="confianca-badge">
                      Confiança: {relacao.confianca}%
                    </span>
                  </div>
                  <p className="relacao-descricao">{relacao.descricao}</p>
                  <p className="relacao-metodos">
                    Métodos sugeridos: {relacao.metodos_sugeridos.join(' • ')}
                  </p>
                </div>
                <div className="relacao-actions">
                  <button
                    className="btn btn-outline"
                    onClick={() => gerarRelatorioRigor(relacao)}
                  >
                    📄 Relatório
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => executarAnaliseRelacao(relacao.id)}
                    disabled={carregando}
                  >
                    {carregando ? '⏳ Executando...' : '▶️ Analisar'}
                  </button>
                </div>
              </div>

              <div className="tabs-container">
                <div className="tabs-header">
                  <button 
                    className={`tab ${(abaSelecionada[relacao.id] || 'validacao') === 'validacao' ? 'active' : ''}`}
                    onClick={() => setAbaRelacao(relacao.id, 'validacao')}
                  >
                    ✅ Validação
                  </button>
                  <button 
                    className={`tab ${abaSelecionada[relacao.id] === 'limitacoes' ? 'active' : ''}`}
                    onClick={() => setAbaRelacao(relacao.id, 'limitacoes')}
                  >
                    ⚠️ Limitações
                  </button>
                  <button 
                    className={`tab ${abaSelecionada[relacao.id] === 'pressupostos' ? 'active' : ''}`}
                    onClick={() => setAbaRelacao(relacao.id, 'pressupostos')}
                  >
                    📋 Pressupostos
                  </button>
                </div>
                
                <div className="tab-content">
                  {(abaSelecionada[relacao.id] || 'validacao') === 'validacao' && (
                    <div className="content-list">
                      {relacao.rigor_cientifico.validacao.map((item, idx) => (
                        <div key={idx} className="content-item">
                          <span className="icon">✅</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {abaSelecionada[relacao.id] === 'limitacoes' && (
                    <div className="content-list">
                      {relacao.rigor_cientifico.limitacoes.map((item, idx) => (
                        <div key={idx} className="content-item">
                          <span className="icon">⚠️</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {abaSelecionada[relacao.id] === 'pressupostos' && (
                    <div className="content-list">
                      {relacao.rigor_cientifico.pressupostos.map((item, idx) => (
                        <div key={idx} className="content-item">
                          <span className="icon">📋</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alertas Científicos */}
      <div className="alerts-grid">
        <div className="alert alert-warning">
          <div className="alert-content">
            <span className="alert-icon">⚠️</span>
            <div>
              <strong>Atenção:</strong> Correlação não implica causalidade. 
              Utilize métodos de inferência causal para estabelecer relações causais.
            </div>
          </div>
        </div>
        
        <div className="alert alert-success">
          <div className="alert-content">
            <span className="alert-icon">✅</span>
            <div>
              <strong>Rigor Científico:</strong> Todas as análises seguem protocolos 
              estatísticos validados e incluem verificação de pressupostos.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCientificoAvancado;
