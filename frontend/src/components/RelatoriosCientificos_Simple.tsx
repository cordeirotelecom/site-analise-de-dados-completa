import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Alert,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from '@mui/material';
import {
  Assessment,
  FileDownload,
  Visibility,
  Add,
  FilterList,
  Search,
  GetApp,
  MenuBook,
  Science,
  ArrowBack,
} from '@mui/icons-material';

interface RelatorioItem {
  id: string;
  titulo: string;
  tipo: string;
  categoria: string;
  dataGeracao: string;
  status: 'completo' | 'processando' | 'erro';
  tamanho: string;
  descricao: string;
  tags: string[];
  autor: string;
  downloads: number;
}

interface RelatoriosCientificosProps {
  onBackToHome?: () => void;
}

const RelatoriosCientificos: React.FC<RelatoriosCientificosProps> = ({ onBackToHome }) => {
  const [tabValue, setTabValue] = useState(0);
  const [relatorios, setRelatorios] = useState<RelatorioItem[]>([]);
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [busca, setBusca] = useState('');
  const [dialogAberto, setDialogAberto] = useState(false);

  // Dados de exemplo para relatórios
  useEffect(() => {
    const relatoriosExemplo: RelatorioItem[] = [
      {
        id: '1',
        titulo: 'Análise Estatística Descritiva - Vendas Q4 2024',
        tipo: 'Estatístico',
        categoria: 'Vendas',
        dataGeracao: '2024-12-15',
        status: 'completo',
        tamanho: '2.4 MB',
        descricao: 'Análise completa das vendas do último trimestre com insights estatísticos',
        tags: ['vendas', 'estatística', 'Q4'],
        autor: 'Prof. Vagner Cordeiro',
        downloads: 127
      },
      {
        id: '2',
        titulo: 'Machine Learning - Predição de Churn',
        tipo: 'Machine Learning',
        categoria: 'Customer Analytics',
        dataGeracao: '2024-12-10',
        status: 'completo',
        tamanho: '3.1 MB',
        descricao: 'Modelo preditivo para identificação de clientes com risco de cancelamento',
        tags: ['churn', 'ml', 'predição'],
        autor: 'Prof. Vagner Cordeiro',
        downloads: 89
      },
      {
        id: '3',
        titulo: 'Análise de Correlação - Fatores de Satisfação',
        tipo: 'Correlacional',
        categoria: 'Satisfação',
        dataGeracao: '2024-12-08',
        status: 'completo',
        tamanho: '1.8 MB',
        descricao: 'Estudo correlacional entre fatores de satisfação e retenção de clientes',
        tags: ['correlação', 'satisfação', 'retenção'],
        autor: 'Prof. Vagner Cordeiro',
        downloads: 156
      }
    ];
    setRelatorios(relatoriosExemplo);
  }, []);

  // Função simplificada de download
  const handleDownloadRelatorio = (relatorio: RelatorioItem) => {
    const timestamp = new Date().toLocaleDateString('pt-BR');
    const timeStr = new Date().toLocaleTimeString('pt-BR');
    
    let conteudo = '';
    let extensao = '';

    if (relatorio.tipo === 'Estatístico') {
      extensao = '.md';
      conteudo = `# ${relatorio.titulo}

**Relatório de Análise Estatística**  
**Data:** ${timestamp} às ${timeStr}  
**Autor:** ${relatorio.autor}  
**Categoria:** ${relatorio.categoria}

## 📊 Resumo Executivo

${relatorio.descricao}

## 🔬 Metodologia Científica

Este relatório foi desenvolvido seguindo rigorosamente os princípios da metodologia científica:

1. **Formulação de Hipóteses**
2. **Coleta e Preparação dos Dados**
3. **Análise Exploratória**
4. **Aplicação de Técnicas Estatísticas**
5. **Validação dos Resultados**
6. **Interpretação e Conclusões**

## 📈 Análise de Dados

### Estatísticas Descritivas
- Média: [A ser preenchido com dados reais]
- Mediana: [A ser preenchido com dados reais]
- Desvio Padrão: [A ser preenchido com dados reais]

### Testes Estatísticos
- Teste de Normalidade: [Resultado]
- Teste de Correlação: [Resultado]
- ANOVA: [Resultado]

## 💡 Insights e Recomendações

### Principais Descobertas
1. **Insight 1:** Descrição do primeiro insight
2. **Insight 2:** Descrição do segundo insight
3. **Insight 3:** Descrição do terceiro insight

### Recomendações Estratégicas
- **Curto Prazo:** Ações imediatas
- **Médio Prazo:** Estratégias de implementação
- **Longo Prazo:** Visão estratégica

## 🔧 Código para Reprodução

\`\`\`python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats

# Carregar dados
df = pd.read_csv('dados.csv')

# Análise exploratória
print(df.describe())

# Visualizações
plt.figure(figsize=(10, 6))
sns.histplot(df['variavel'])
plt.title('Distribuição da Variável')
plt.show()

# Testes estatísticos
statistic, p_value = stats.normaltest(df['variavel'])
print(f'Teste de Normalidade: p-valor = {p_value}')
\`\`\`

## 📚 Referências

1. Metodologia Científica em Data Science
2. Estatística Aplicada
3. Melhores Práticas em Analytics

---

**Relatório gerado pela Plataforma DataScience Pro**  
**Contato:** datasciencepro@outlook.com  
**Website:** https://datasciencepro-completo.netlify.app
`;
    } else {
      extensao = '.tex';
      conteudo = `\\documentclass[12pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[brazil]{babel}
\\usepackage{amsmath,amsfonts,amssymb}
\\usepackage{graphicx}
\\usepackage{booktabs}
\\usepackage{hyperref}

\\title{${relatorio.titulo}}
\\author{${relatorio.autor}}
\\date{${timestamp}}

\\begin{document}

\\maketitle

\\begin{abstract}
${relatorio.descricao}
\\end{abstract}

\\section{Introdução}
Este relatório apresenta uma análise científica detalhada dos dados.

\\section{Metodologia}
A análise foi conduzida seguindo os princípios da metodologia científica.

\\section{Resultados}
Os principais resultados são apresentados nesta seção.

\\section{Conclusões}
Com base na análise realizada, concluímos que...

\\end{document}`;
    }

    // Criar e baixar arquivo
    const blob = new Blob([conteudo], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${relatorio.titulo.replace(/[^a-zA-Z0-9]/g, '_')}${extensao}`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Atualizar contador
    setRelatorios(prev => 
      prev.map(r => 
        r.id === relatorio.id 
          ? { ...r, downloads: r.downloads + 1 }
          : r
      )
    );

    alert(`✅ Relatório baixado com sucesso!`);
  };

  const relatoriosFiltrados = relatorios.filter(relatorio => {
    const matchTipo = filtroTipo === 'todos' || relatorio.tipo === filtroTipo;
    const matchCategoria = filtroCategoria === 'todos' || relatorio.categoria === filtroCategoria;
    const matchBusca = relatorio.titulo.toLowerCase().includes(busca.toLowerCase()) ||
                      relatorio.descricao.toLowerCase().includes(busca.toLowerCase());
    
    return matchTipo && matchCategoria && matchBusca;
  });

  return (
    <Box sx={{ p: 3 }}>
      {/* Botão de navegação */}
      {onBackToHome && (
        <Box sx={{ mb: 2 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={onBackToHome}
            sx={{ mb: 2 }}
          >
            ← Voltar para Página Inicial
          </Button>
        </Box>
      )}

      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <Assessment sx={{ mr: 2, color: 'primary.main' }} />
          Relatórios Científicos
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Geração e gerenciamento de relatórios científicos completos com metodologia rigorosa
        </Typography>
      </Box>

      {/* Controles de Filtro */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          🔍 Filtros e Busca
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Buscar relatórios"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Tipo</InputLabel>
              <Select
                value={filtroTipo}
                label="Tipo"
                onChange={(e) => setFiltroTipo(e.target.value)}
              >
                <MenuItem value="todos">Todos os tipos</MenuItem>
                <MenuItem value="Estatístico">Estatístico</MenuItem>
                <MenuItem value="Machine Learning">Machine Learning</MenuItem>
                <MenuItem value="Correlacional">Correlacional</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Categoria</InputLabel>
              <Select
                value={filtroCategoria}
                label="Categoria"
                onChange={(e) => setFiltroCategoria(e.target.value)}
              >
                <MenuItem value="todos">Todas as categorias</MenuItem>
                <MenuItem value="Vendas">Vendas</MenuItem>
                <MenuItem value="Customer Analytics">Customer Analytics</MenuItem>
                <MenuItem value="Satisfação">Satisfação</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Lista de Relatórios */}
      <Grid container spacing={3}>
        {relatoriosFiltrados.map((relatorio) => (
          <Grid item xs={12} md={6} lg={4} key={relatorio.id}>
            <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  {relatorio.titulo}
                </Typography>
                
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <Chip 
                    label={relatorio.tipo} 
                    size="small" 
                    color="primary" 
                    variant="outlined"
                  />
                  <Chip 
                    label={relatorio.categoria} 
                    size="small" 
                    color="secondary" 
                    variant="outlined"
                  />
                </Stack>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {relatorio.descricao}
                </Typography>

                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                  📅 {relatorio.dataGeracao} • 👤 {relatorio.autor}
                </Typography>
                
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
                  📊 {relatorio.tamanho} • ⬇️ {relatorio.downloads} downloads
                </Typography>

                <Stack direction="row" spacing={1}>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<FileDownload />}
                    onClick={() => handleDownloadRelatorio(relatorio)}
                    sx={{ flexGrow: 1 }}
                  >
                    Baixar
                  </Button>
                  <Tooltip title="Visualizar">
                    <IconButton size="small" color="primary">
                      <Visibility />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {relatoriosFiltrados.length === 0 && (
        <Alert severity="info" sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            📋 Nenhum relatório encontrado
          </Typography>
          <Typography>
            Ajuste os filtros ou busque por outros termos.
          </Typography>
        </Alert>
      )}

      {/* Estatísticas */}
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          📊 Estatísticas dos Relatórios
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <Typography variant="h4" color="primary.main" sx={{ fontWeight: 700 }}>
              {relatorios.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total de Relatórios
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h4" color="success.main" sx={{ fontWeight: 700 }}>
              {relatorios.reduce((acc, r) => acc + r.downloads, 0)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total de Downloads
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h4" color="warning.main" sx={{ fontWeight: 700 }}>
              {new Set(relatorios.map(r => r.categoria)).size}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Categorias Ativas
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h4" color="info.main" sx={{ fontWeight: 700 }}>
              {new Set(relatorios.map(r => r.tipo)).size}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Tipos Diferentes
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default RelatoriosCientificos;
