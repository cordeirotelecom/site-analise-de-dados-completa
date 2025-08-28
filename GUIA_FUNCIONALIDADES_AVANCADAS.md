# 🚀 DataScience Pro v2.0 - Guia de Funcionalidades Avançadas

## 📋 Índice
- [Visão Geral](#visão-geral)
- [APIs de Dados Públicos](#apis-de-dados-públicos)
- [Upload Multi-Arquivos](#upload-multi-arquivos)
- [Sistema de Tags Inteligente](#sistema-de-tags-inteligente)
- [Recomendações Automáticas](#recomendações-automáticas)
- [Análises Estatísticas Avançadas](#análises-estatísticas-avançadas)
- [Exemplos Práticos](#exemplos-práticos)

## 🌟 Visão Geral

O DataScience Pro v2.0 introduz funcionalidades revolucionárias que tornam a plataforma a **ferramenta mais completa e avançada** para análise de dados no mercado. Agora suportamos:

- **🏛️ APIs Governamentais**: Acesso direto a dados públicos de SC, saúde, economia, educação
- **📁 Multi-Upload Inteligente**: Processamento simultâneo de dezenas de arquivos
- **🏷️ Sistema de Tags**: Seleção inteligente de análises baseada em perfil e dados
- **🤖 IA Recomendadora**: Sugestões automáticas de análises mais adequadas
- **📊 Estatística Avançada**: Mais de 30 métodos estatísticos implementados

## 🏛️ APIs de Dados Públicos

### Municípios de Santa Catarina
```http
GET /api/v2/dados-publicos/municipios-sc
```

**Retorna**: Lista completa dos 295 municípios de SC com informações geográficas

**Exemplo de resposta**:
```json
{
  "success": true,
  "data": [
    {
      "codigo_ibge": "4205407",
      "nome": "Florianópolis",
      "microrregiao": "Florianópolis",
      "mesorregiao": "Grande Florianópolis",
      "regiao_imediata": "Florianópolis",
      "regiao_intermediaria": "Florianópolis"
    }
  ],
  "total": 295,
  "fonte": "IBGE"
}
```

### Dataset Completo de Santa Catarina
```http
GET /api/v2/dados-publicos/dataset-completo-sc?municipios=Florianópolis,São José&salvar_projeto=true&nome_projeto=Meu Projeto SC
```

**Parâmetros**:
- `municipios`: Lista de municípios (opcional, padrão: todos)
- `salvar_projeto`: Salvar como projeto (boolean)
- `nome_projeto`: Nome do projeto a ser criado

**Indicadores incluídos**:
- 📊 **Demografia**: População, densidade demográfica
- 💰 **Economia**: PIB, PIB per capita, empresas ativas, empregos
- 🏥 **Saúde**: Leitos SUS, médicos, enfermeiros, mortalidade
- 🎓 **Educação**: IDEB, analfabetismo, escolas, matrículas
- 🚔 **Segurança**: Criminalidade, acidentes de trânsito
- 🌱 **Meio Ambiente**: Cobertura vegetal, tratamento de esgoto
- 🦠 **COVID-19**: Casos, óbitos, recuperados

### Comparativo entre Regiões
```http
GET /api/v2/dados-publicos/comparativo-regioes-sc
```

Gera comparativo agregado entre as mesorregiões de Santa Catarina.

## 📁 Upload Multi-Arquivos

### Funcionalidade de Upload Avançado
```http
POST /api/v2/upload/multiplos-arquivos
```

**Suporte a formatos**:
- 📊 **Tabulares**: CSV, Excel (.xlsx/.xls), TSV, JSON, XML
- 📈 **Estatísticos**: SPSS (.sav), Stata (.dta), SAS (.sas7bdat)
- 🗜️ **Compactados**: ZIP, RAR, 7Z (extração automática)
- 📄 **Texto**: TXT, Markdown, Word
- 🖼️ **Outros**: PDF, HTML, imagens

**Parâmetros do FormData**:
```javascript
const formData = new FormData();

// Arquivos (múltiplos)
formData.append('arquivos', file1);
formData.append('arquivos', file2);
formData.append('arquivos', file3);

// Opções de processamento
formData.append('opcoes_csv', JSON.stringify({
  encoding: 'utf-8',
  sep: ',',
  decimal: '.'
}));

formData.append('opcoes_excel', JSON.stringify({
  engine: 'openpyxl',
  header: 0
}));

// Configurações do projeto
formData.append('criar_projeto', true);
formData.append('nome_projeto', 'Meu Projeto Multi-Arquivo');
formData.append('combinar_dados', true);
formData.append('metodo_combinacao', 'concat'); // concat, merge, union
```

**Resposta**:
```json
{
  "success": true,
  "resumo": {
    "total_arquivos": 5,
    "processados_sucesso": 5,
    "total_linhas": 15420,
    "total_colunas": 47
  },
  "datasets": {
    "vendas_2023": {
      "amostra": [...],
      "metadados": {
        "linhas": 1000,
        "colunas": 8,
        "tamanho_mb": 0.5,
        "qualidade": {
          "pontuacao_geral": 95,
          "issues": [],
          "recomendacoes": []
        }
      }
    }
  },
  "projeto_criado": {
    "id": 123,
    "nome": "Meu Projeto Multi-Arquivo"
  }
}
```

## 🏷️ Sistema de Tags Inteligente

### Configurações Disponíveis
```http
GET /api/v2/analise/configuracoes
```

**Categorias de Análise**:
- 📊 **Descritiva**: Estatísticas básicas, distribuições
- 🔍 **Exploratória**: EDA, correlações, padrões
- 🔮 **Preditiva**: Machine Learning, regressão, classificação
- 💊 **Prescritiva**: Otimização, recomendações
- 🩺 **Diagnóstica**: Causas, análise de falhas
- ⚖️ **Comparativa**: Testes de hipóteses, grupos
- 🔗 **Correlacional**: Relações entre variáveis
- 🧬 **Causal**: Inferência causal, experimentos
- ⏰ **Temporal**: Séries temporais, previsões
- 🗺️ **Espacial**: Análise geográfica, mapas

### Exemplo de Configuração
```json
{
  "id": "analise_exploratoria",
  "nome": "Análise Exploratória de Dados (EDA)",
  "descricao": "Exploração abrangente com correlações e padrões",
  "tipo": "exploratoria",
  "complexidade": 3,
  "tempo_estimado": 15,
  "nivel_minimo": "iniciante",
  "metodos": [
    "estatisticas_basicas",
    "correlacao_pearson", 
    "teste_normalidade",
    "deteccao_anomalias"
  ],
  "visualizacoes": [
    "histograma",
    "scatterplot", 
    "heatmap",
    "pairplot",
    "boxplot"
  ],
  "pressupostos": ["Dados limpos e estruturados"],
  "limitacoes": ["Não estabelece causalidade"]
}
```

## 🤖 Recomendações Automáticas

### Gerar Recomendações
```http
POST /api/v2/analise/recomendacoes
```

**Body**:
```json
{
  "projeto_id": 123,
  "objetivo": "Quero entender padrões de vendas e prever demanda futura",
  "nivel_usuario": "intermediario",
  "tempo_disponivel": 60
}
```

**Algoritmo de Recomendação**:
1. 📊 **Análise dos Dados**: Tipo de variáveis, tamanho, estrutura
2. 👤 **Perfil do Usuário**: Nível de experiência, tempo disponível
3. 🎯 **Objetivo Declarado**: NLP para extrair intenções
4. 🧮 **Score de Adequação**: Algoritmo proprietário de pontuação
5. 📈 **Ranking**: Top 8 análises mais adequadas

### Roadmap de Aprendizado
```http
GET /api/v2/analise/roadmap?nivel_atual=iniciante
```

Gera sequência progressiva de análises para desenvolvimento de habilidades.

## 📊 Análises Estatísticas Avançadas

### Métodos Implementados

#### 📈 Estatística Descritiva
- Medidas de tendência central (média, mediana, moda)
- Medidas de dispersão (desvio padrão, variância, IQR)
- Análise de distribuições e assimetria
- Tabelas de frequência e contingência

#### 🧪 Testes de Hipóteses
- **Paramétricos**: Teste t, ANOVA, F-test
- **Não-paramétricos**: Mann-Whitney, Kruskal-Wallis, Wilcoxon
- **Normalidade**: Shapiro-Wilk, Anderson-Darling, Kolmogorov-Smirnov
- **Independência**: Chi-quadrado, Teste exato de Fisher

#### 🔗 Análise de Correlação
- Correlação de Pearson (linear)
- Correlação de Spearman (ordinal)
- Correlação de Kendall (concordância)
- Correlação parcial e semiparcial

#### 📉 Regressão
- **Linear**: Simples e múltipla
- **Logística**: Binária e multinomial
- **Polinomial**: Graus 2-5
- **Robusta**: Huber, LAD
- **Diagnósticos**: Resíduos, leverage, Cook's distance

#### 🤖 Machine Learning
- **Clustering**: K-means, Hierárquico, DBSCAN
- **Classificação**: Random Forest, SVM, Naive Bayes
- **Regressão ML**: Ridge, Lasso, Elastic Net
- **Redução**: PCA, t-SNE, UMAP
- **Ensemble**: Voting, Bagging, Boosting

#### ⏰ Séries Temporais
- Decomposição (tendência, sazonalidade, ruído)
- Modelos ARIMA/SARIMA
- Suavização exponencial (Holt-Winters)
- Detecção de mudanças estruturais
- Previsão com intervalos de confiança

## 💡 Exemplos Práticos

### 1. Análise Completa de Vendas
```python
# 1. Upload de múltiplos arquivos de vendas
files = ['vendas_2023.csv', 'custos.xlsx', 'clientes.json']
response = upload_multiplos_arquivos(files, criar_projeto=True)

# 2. Solicitar recomendações
objetivo = "Identificar padrões de vendas e otimizar estoque"
recomendacoes = get_recomendacoes(projeto_id, objetivo, "intermediario")

# 3. Executar análises recomendadas
for rec in recomendacoes[:3]:
    resultado = executar_analise(projeto_id, rec['id'])
    print(f"Análise: {rec['nome']} - Score: {resultado['score']}")
```

### 2. Comparativo Municipal
```python
# Dados dos municípios da Grande Florianópolis
municipios = "Florianópolis,São José,Palhoça,Biguaçu,Santo Amaro da Imperatriz"
dataset = get_dataset_sc(municipios=municipios, salvar_projeto=True)

# Análise comparativa automática
recomendacoes = get_recomendacoes(
    projeto_id=dataset['projeto_id'],
    objetivo="Comparar indicadores socioeconômicos entre municípios",
    nivel_usuario="avancado"
)

# Top recomendação: Análise de Clusters
clusters = executar_clustering(dataset['projeto_id'])
print(f"Municípios agrupados em {clusters['n_clusters']} clusters")
```

### 3. Análise Temporal de COVID
```python
# Dados históricos de COVID-19
covid_data = get_covid_sc()

# Sistema recomenda automaticamente análise temporal
recomendacao = get_recomendacoes(
    dados=covid_data,
    objetivo="Analisar evolução da pandemia",
    nivel_usuario="especialista"
)[0]  # Série temporal

# Executa decomposição e previsão
resultado = executar_series_temporais(
    dados=covid_data,
    target_col='casos_confirmados',
    forecast_periods=30
)

print(f"Tendência: {resultado['tendencia']}")
print(f"Sazonalidade detectada: {resultado['sazonalidade']}")
print(f"Previsão próximos 30 dias: {resultado['forecast']}")
```

## 🎯 Casos de Uso por Perfil

### 👨‍🎓 Estudantes e Pesquisadores
- **APIs governamentais** para pesquisas acadêmicas
- **Roadmap progressivo** de aprendizado estatístico
- **Validação automática** de pressupostos estatísticos
- **Geração de relatórios** científicos em LaTeX

### 👩‍💼 Profissionais de Negócios  
- **Upload multi-arquivo** de planilhas corporativas
- **Recomendações automáticas** baseadas em objetivos
- **Dashboards interativos** com insights automáticos
- **Análises prescritivas** para tomada de decisão

### 🏥 Profissionais da Saúde
- **Dados epidemiológicos** de Santa Catarina
- **Análises temporais** de indicadores de saúde
- **Testes estatísticos** para ensaios clínicos
- **Visualizações médicas** especializadas

### 🏛️ Gestores Públicos
- **Datasets governamentais** completos e atualizados
- **Comparativos regionais** automáticos
- **Indicadores socioeconômicos** consolidados
- **Relatórios executivos** para gestão pública

## 🚀 Próximas Funcionalidades (v2.1)

- 🌐 **APIs Internacionais**: OECD, World Bank, ONU
- 🗺️ **Análise Espacial**: GIS, mapas coropléticos, geoestatística
- 🧠 **IA Avançada**: Deep Learning, NLP, Computer Vision
- ☁️ **Cloud Computing**: Processamento distribuído, BigData
- 🔄 **Tempo Real**: Streaming, alertas automáticos
- 🌍 **Multi-idioma**: Interface em inglês, espanhol

---

## 📞 Suporte

Para dúvidas ou sugestões sobre as funcionalidades avançadas:
- 📧 Email: suporte@datasciencepro.com
- 💬 Chat: Disponível 24/7 na plataforma
- 📚 Documentação: [docs.datasciencepro.com](https://docs.datasciencepro.com)
- 🎓 Tutoriais: [youtube.com/datasciencepro](https://youtube.com/datasciencepro)

**DataScience Pro v2.0 - Revolucionando a análise de dados!** 🚀
