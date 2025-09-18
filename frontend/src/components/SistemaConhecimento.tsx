import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
  InputAdornment,
} from '@mui/material';
import {
  Search,
  Science,
  Analytics,
  Timeline,
  School,
  AutoAwesome,
  ExpandMore,
  Article,
  Code,
  DataUsage,
  TrendingUp,
  Psychology,
} from '@mui/icons-material';

interface ConteudoConhecimento {
  id: string;
  titulo: string;
  categoria: string;
  descricao: string;
  conteudo: string;
  tags: string[];
  exemplos?: string[];
  referencias?: string[];
}

const SistemaConhecimento: React.FC = () => {
  const [busca, setBusca] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('todas');
  const [resultados, setResultados] = useState<ConteudoConhecimento[]>([]);
  const [carregando, setCarregando] = useState(false);

  const baseConhecimento: ConteudoConhecimento[] = [
    {
      id: '1',
      titulo: 'Análise Descritiva de Dados',
      categoria: 'estatistica',
      descricao: 'Fundamentos da análise descritiva: medidas de tendência central, dispersão e distribuição.',
      conteudo: `A análise descritiva é o primeiro passo em qualquer estudo estatístico. Envolve:

1. **Medidas de Tendência Central:**
   - Média aritmética: Σx/n
   - Mediana: valor central dos dados ordenados
   - Moda: valor mais frequente

2. **Medidas de Dispersão:**
   - Desvio padrão: √(Σ(x-μ)²/n)
   - Variância: σ²
   - Amplitude: máximo - mínimo

3. **Visualizações:**
   - Histogramas para distribuições
   - Box plots para outliers
   - Scatter plots para correlações`,
      tags: ['estatística', 'descritiva', 'média', 'mediana', 'desvio padrão'],
      exemplos: [
        'Análise da renda per capita em SC',
        'Distribuição de idade em datasets populacionais',
        'Medidas de desempenho escolar por município'
      ],
      referencias: [
        'Montgomery, D. C. (2017). Estatística Aplicada',
        'Field, A. (2018). Descobrindo a Estatística usando SPSS'
      ]
    },
    {
      id: '2',
      titulo: 'Metodologia Científica em Data Science',
      categoria: 'metodologia',
      descricao: 'Aplicação do método científico em análise de dados e pesquisa quantitativa.',
      conteudo: `A metodologia científica em Data Science segue estas etapas:

1. **Formulação do Problema:**
   - Definição clara da questão de pesquisa
   - Hipóteses testáveis
   - Objetivos específicos e mensuráveis

2. **Coleta de Dados:**
   - Amostragem representativa
   - Métodos de coleta confiáveis
   - Considerações éticas

3. **Análise e Interpretação:**
   - Testes estatísticos apropriados
   - Validação de resultados
   - Limitações do estudo

4. **Comunicação dos Resultados:**
   - Visualizações claras
   - Relatórios reproduzíveis
   - Implicações práticas`,
      tags: ['metodologia', 'científico', 'hipóteses', 'amostragem', 'reproduzibilidade'],
      exemplos: [
        'Estudo sobre educação em Santa Catarina',
        'Análise de indicadores econômicos regionais',
        'Pesquisa sobre saúde pública municipal'
      ]
    },
    {
      id: '3',
      titulo: 'APIs de Dados Públicos do Brasil',
      categoria: 'apis',
      descricao: 'Guia completo para acessar e utilizar APIs de dados públicos brasileiros.',
      conteudo: `Principais APIs de dados públicos disponíveis:

1. **IBGE (Instituto Brasileiro de Geografia e Estatística):**
   - URL: https://servicodados.ibge.gov.br/api/docs
   - Dados: municípios, população, censo, economia
   - Formato: JSON/XML

2. **Portal da Transparência:**
   - Gastos públicos, contratos, convênios
   - Dados de servidores públicos

3. **Banco Central (BCB):**
   - Indicadores econômicos
   - Taxas de juros, inflação, câmbio

4. **DataSUS:**
   - Dados de saúde pública
   - Mortalidade, morbidade, vacinas

**Exemplo de uso (Python):**
\`\`\`python
import requests

# Buscar municípios de SC
url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados/42/municipios"
response = requests.get(url)
municipios = response.json()
\`\`\``,
      tags: ['api', 'dados públicos', 'ibge', 'transparência', 'python'],
      exemplos: [
        'Integração com API do IBGE',
        'Análise de gastos públicos via Portal da Transparência',
        'Monitoramento de indicadores econômicos do BCB'
      ]
    },
    {
      id: '4',
      titulo: 'Análise de Dados de Santa Catarina',
      categoria: 'casos',
      descricao: 'Estudos de caso específicos com dados reais de Santa Catarina.',
      conteudo: `Santa Catarina possui características únicas que merecem análise específica:

1. **Demografia:**
   - 295 municípios
   - População: ~7,3 milhões (2020)
   - Densidade demográfica variada

2. **Economia:**
   - PIB per capita acima da média nacional
   - Forte setor industrial
   - Turismo significativo

3. **Indicadores Sociais:**
   - IDH elevado
   - Taxa de alfabetização alta
   - Expectativa de vida acima da média

**Análises Possíveis:**
- Correlação entre PIB municipal e indicadores sociais
- Distribuição populacional por microrregião
- Evolução econômica 2010-2020
- Comparação com outros estados da região Sul`,
      tags: ['santa catarina', 'análise regional', 'demografia', 'economia', 'indicadores sociais'],
      exemplos: [
        'Ranking de municípios por IDH',
        'Análise da industrialização catarinense',
        'Estudo do turismo no litoral de SC'
      ]
    },
    {
      id: '5',
      titulo: 'Machine Learning para Iniciantes',
      categoria: 'ml',
      descricao: 'Introdução aos conceitos fundamentais de Machine Learning e suas aplicações.',
      conteudo: `Machine Learning é uma área da IA que permite aos computadores aprender sem programação explícita:

1. **Tipos de Aprendizado:**
   - **Supervisionado:** com dados rotulados (classificação, regressão)
   - **Não supervisionado:** sem rótulos (clustering, redução de dimensionalidade)
   - **Por reforço:** aprendizado através de recompensas

2. **Algoritmos Populares:**
   - Regressão Linear
   - Árvores de Decisão
   - Random Forest
   - SVM (Support Vector Machines)
   - Redes Neurais

3. **Processo Típico:**
   - Coleta e preparação dos dados
   - Divisão treino/teste
   - Treinamento do modelo
   - Avaliação e validação
   - Deployment

**Exemplo Prático:**
Prever preços de imóveis usando características como área, localização, quartos, etc.`,
      tags: ['machine learning', 'ia', 'algoritmos', 'supervisionado', 'clustering'],
      exemplos: [
        'Classificação de risco de crédito',
        'Predição de demanda turística em SC',
        'Análise de sentimento em redes sociais'
      ]
    }
  ];

  const categorias = [
    { id: 'todas', nome: 'Todas', icon: <Search /> },
    { id: 'estatistica', nome: 'Estatística', icon: <Analytics /> },
    { id: 'metodologia', nome: 'Metodologia', icon: <Science /> },
    { id: 'apis', nome: 'APIs', icon: <Code /> },
    { id: 'casos', nome: 'Casos de Estudo', icon: <Timeline /> },
    { id: 'ml', nome: 'Machine Learning', icon: <Psychology /> },
  ];

  useEffect(() => {
    realizarBusca();
  }, [busca, categoriaFiltro]);

  const realizarBusca = () => {
    setCarregando(true);
    
    setTimeout(() => {
      let resultadosFiltrados = baseConhecimento;
      
      // Filtrar por categoria
      if (categoriaFiltro !== 'todas') {
        resultadosFiltrados = resultadosFiltrados.filter(
          item => item.categoria === categoriaFiltro
        );
      }
      
      // Filtrar por busca
      if (busca.trim()) {
        const termoBusca = busca.toLowerCase();
        resultadosFiltrados = resultadosFiltrados.filter(item =>
          item.titulo.toLowerCase().includes(termoBusca) ||
          item.descricao.toLowerCase().includes(termoBusca) ||
          item.tags.some(tag => tag.toLowerCase().includes(termoBusca)) ||
          item.conteudo.toLowerCase().includes(termoBusca)
        );
      }
      
      setResultados(resultadosFiltrados);
      setCarregando(false);
    }, 300);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom align="center">
        📚 Sistema de Conhecimento
      </Typography>
      
      <Typography variant="h6" align="center" sx={{ mb: 4, color: 'text.secondary' }}>
        Base completa de conhecimento em Data Science e Análise de Dados
      </Typography>

      {/* Busca */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar por tópicos, tags ou conteúdo..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />
        
        {/* Filtros por Categoria */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {categorias.map((categoria) => (
            <Button
              key={categoria.id}
              variant={categoriaFiltro === categoria.id ? 'contained' : 'outlined'}
              startIcon={categoria.icon}
              onClick={() => setCategoriaFiltro(categoria.id)}
              size="small"
            >
              {categoria.nome}
            </Button>
          ))}
        </Box>
      </Paper>

      {/* Resultados */}
      {carregando ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6">Buscando conhecimento...</Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {resultados.length === 0 ? (
            <Grid item xs={12}>
              <Alert severity="info">
                <Typography variant="h6">Nenhum resultado encontrado</Typography>
                <Typography variant="body2">
                  Tente outros termos de busca ou selecione uma categoria diferente.
                </Typography>
              </Alert>
            </Grid>
          ) : (
            resultados.map((item) => (
              <Grid item xs={12} key={item.id}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Box sx={{ width: '100%' }}>
                      <Typography variant="h6" gutterBottom>
                        {item.titulo}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {item.descricao}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        {item.tags.map((tag) => (
                          <Chip key={tag} label={tag} size="small" />
                        ))}
                      </Box>
                    </Box>
                  </AccordionSummary>
                  
                  <AccordionDetails>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={8}>
                        <Typography variant="h6" gutterBottom>
                          📖 Conteúdo
                        </Typography>
                        <Typography 
                          variant="body1" 
                          component="div"
                          sx={{ 
                            whiteSpace: 'pre-line',
                            '& code': {
                              backgroundColor: 'grey.100',
                              padding: '2px 4px',
                              borderRadius: 1,
                              fontFamily: 'monospace'
                            }
                          }}
                        >
                          {item.conteudo}
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={12} md={4}>
                        {item.exemplos && (
                          <Box sx={{ mb: 3 }}>
                            <Typography variant="h6" gutterBottom>
                              💡 Exemplos Práticos
                            </Typography>
                            <List dense>
                              {item.exemplos.map((exemplo, index) => (
                                <ListItem key={index}>
                                  <ListItemIcon>
                                    <TrendingUp color="primary" />
                                  </ListItemIcon>
                                  <ListItemText primary={exemplo} />
                                </ListItem>
                              ))}
                            </List>
                          </Box>
                        )}
                        
                        {item.referencias && (
                          <Box>
                            <Typography variant="h6" gutterBottom>
                              📚 Referências
                            </Typography>
                            <List dense>
                              {item.referencias.map((ref, index) => (
                                <ListItem key={index}>
                                  <ListItemIcon>
                                    <Article color="secondary" />
                                  </ListItemIcon>
                                  <ListItemText 
                                    primary={ref}
                                    primaryTypographyProps={{ variant: 'body2' }}
                                  />
                                </ListItem>
                              ))}
                            </List>
                          </Box>
                        )}
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            ))
          )}
        </Grid>
      )}

      {/* Estatísticas */}
      <Paper sx={{ p: 3, mt: 4, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
        <Typography variant="h6" gutterBottom>
          📊 Estatísticas da Base de Conhecimento
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={3}>
            <Typography variant="h4" align="center">{baseConhecimento.length}</Typography>
            <Typography variant="body2" align="center">Artigos</Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="h4" align="center">{categorias.length - 1}</Typography>
            <Typography variant="body2" align="center">Categorias</Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="h4" align="center">
              {baseConhecimento.reduce((acc, item) => acc + item.tags.length, 0)}
            </Typography>
            <Typography variant="body2" align="center">Tags</Typography>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Typography variant="h4" align="center">
              {baseConhecimento.reduce((acc, item) => acc + (item.exemplos?.length || 0), 0)}
            </Typography>
            <Typography variant="body2" align="center">Exemplos</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default SistemaConhecimento;