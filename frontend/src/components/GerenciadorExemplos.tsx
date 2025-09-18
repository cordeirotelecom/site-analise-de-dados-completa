import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Alert,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Download,
  Visibility,
  School,
  Assessment,
  Analytics,
  BarChart,
} from '@mui/icons-material';

interface ArquivoExemplo {
  id: string;
  nome: string;
  descricao: string;
  ferramenta: string;
  tamanho: string;
  registros: number;
  colunas: string[];
  preview: string[][];
  icon: React.ReactNode;
  cor: string;
}

const GerenciadorExemplos: React.FC = () => {
  const [dialogAberto, setDialogAberto] = useState(false);
  const [arquivoSelecionado, setArquivoSelecionado] = useState<ArquivoExemplo | null>(null);

  const arquivosExemplo: ArquivoExemplo[] = [
    {
      id: 'automl',
      nome: 'exemplo_automl.csv',
      descricao: 'Dados de funcionários para predição de aprovação',
      ferramenta: 'AutoML',
      tamanho: '1.2 KB',
      registros: 20,
      colunas: ['nome', 'idade', 'salario', 'experiencia', 'aprovado'],
      preview: [
        ['João Silva', '25', '3000', '2', 'sim'],
        ['Maria Santos', '30', '5000', '5', 'sim'],
        ['Pedro Costa', '22', '2000', '1', 'não'],
        ['Ana Lima', '35', '7000', '8', 'sim']
      ],
      icon: <School />,
      cor: 'primary'
    },
    {
      id: 'cba',
      nome: 'exemplo_cba.csv',
      descricao: 'Dados categóricos para descoberta de regras de associação',
      ferramenta: 'Análise CBA',
      tamanho: '0.8 KB',
      registros: 20,
      colunas: ['idade', 'renda', 'regiao', 'estado_civil', 'tem_filhos', 'compra_online'],
      preview: [
        ['jovem', 'alta', 'sudeste', 'solteiro', 'não', 'sim'],
        ['adulto', 'media', 'sul', 'casado', 'sim', 'não'],
        ['jovem', 'baixa', 'nordeste', 'solteiro', 'não', 'não'],
        ['idoso', 'alta', 'sudeste', 'casado', 'sim', 'sim']
      ],
      icon: <Assessment />,
      cor: 'secondary'
    },
    {
      id: 'visualizacao',
      nome: 'exemplo_visualizacao.csv',
      descricao: 'Dados de vendas por mês e região para gráficos',
      ferramenta: 'Visualizações',
      tamanho: '1.0 KB',
      registros: 24,
      colunas: ['mes', 'vendas', 'regiao', 'categoria'],
      preview: [
        ['Janeiro', '15000', 'Norte', 'Eletrônicos'],
        ['Fevereiro', '18000', 'Norte', 'Eletrônicos'],
        ['Março', '22000', 'Norte', 'Eletrônicos'],
        ['Abril', '20000', 'Norte', 'Eletrônicos']
      ],
      icon: <BarChart />,
      cor: 'success'
    }
  ];

  const visualizarArquivo = (arquivo: ArquivoExemplo) => {
    setArquivoSelecionado(arquivo);
    setDialogAberto(true);
  };

  const baixarArquivo = (arquivo: ArquivoExemplo) => {
    // Simular download - em uma implementação real, seria um link para o arquivo
    const dados = {
      automl: `nome,idade,salario,experiencia,aprovado
João Silva,25,3000,2,sim
Maria Santos,30,5000,5,sim
Pedro Costa,22,2000,1,não
Ana Lima,35,7000,8,sim
Carlos Rocha,28,4000,3,sim
Lucia Alves,24,2500,1,não
Rafael Mendes,32,6000,6,sim
Fernanda Cruz,26,3500,2,sim
Bruno Dias,29,4500,4,sim
Camila Nunes,23,2200,1,não
José Oliveira,31,5500,7,sim
Mariana Gomes,27,3800,3,sim
Roberto Lima,33,6500,9,sim
Patricia Silva,25,3200,2,sim
Felipe Santos,24,2800,1,não
Amanda Costa,30,5200,5,sim
Diego Almeida,28,4200,3,sim
Juliana Rocha,26,3600,2,sim
Gustavo Pereira,29,4800,4,sim
Larissa Martins,27,3900,3,sim`,
      cba: `idade,renda,regiao,estado_civil,tem_filhos,compra_online
jovem,alta,sudeste,solteiro,não,sim
adulto,media,sul,casado,sim,não
jovem,baixa,nordeste,solteiro,não,não
idoso,alta,sudeste,casado,sim,sim
adulto,alta,centro-oeste,casado,não,sim
jovem,media,sul,solteiro,não,sim
idoso,media,nordeste,viuvo,sim,não
adulto,baixa,norte,casado,sim,não
jovem,alta,sudeste,solteiro,não,sim
adulto,media,sul,casado,sim,sim
idoso,baixa,nordeste,viuvo,sim,não
jovem,media,centro-oeste,solteiro,não,sim
adulto,alta,sudeste,casado,não,sim
jovem,baixa,norte,solteiro,não,não
idoso,alta,sul,casado,sim,sim
adulto,media,nordeste,casado,sim,não
jovem,alta,sudeste,solteiro,não,sim
idoso,media,centro-oeste,viuvo,sim,não
adulto,baixa,norte,casado,sim,não
jovem,media,sul,solteiro,não,sim`,
      visualizacao: `mes,vendas,regiao,categoria
Janeiro,15000,Norte,Eletrônicos
Fevereiro,18000,Norte,Eletrônicos
Março,22000,Norte,Eletrônicos
Abril,20000,Norte,Eletrônicos
Maio,25000,Norte,Eletrônicos
Junho,28000,Norte,Eletrônicos
Janeiro,12000,Sul,Roupas
Fevereiro,14000,Sul,Roupas
Março,16000,Sul,Roupas
Abril,18000,Sul,Roupas
Maio,21000,Sul,Roupas
Junho,24000,Sul,Roupas
Janeiro,8000,Nordeste,Livros
Fevereiro,9000,Nordeste,Livros
Março,10000,Nordeste,Livros
Abril,11000,Nordeste,Livros
Maio,12000,Nordeste,Livros
Junho,13500,Nordeste,Livros
Janeiro,20000,Sudeste,Eletrônicos
Fevereiro,23000,Sudeste,Eletrônicos
Março,26000,Sudeste,Eletrônicos
Abril,24000,Sudeste,Eletrônicos
Maio,28000,Sudeste,Eletrônicos
Junho,32000,Sudeste,Eletrônicos`
    };

    const conteudo = dados[arquivo.id as keyof typeof dados];
    const blob = new Blob([conteudo], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', arquivo.nome);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          📁 Arquivos de Exemplo
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Dados prontos para testar todas as funcionalidades da plataforma
        </Typography>
      </Box>

      <Alert severity="info" sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          🎯 Como usar os exemplos:
        </Typography>
        <Box component="ol" sx={{ pl: 2 }}>
          <li><strong>Baixe um arquivo:</strong> Clique em "Download" para salvar no seu computador</li>
          <li><strong>Teste a ferramenta:</strong> Use o arquivo na ferramenta correspondente</li>
          <li><strong>Aprenda:</strong> Veja como os dados devem ser formatados</li>
          <li><strong>Adapte:</strong> Use como modelo para seus próprios dados</li>
        </Box>
      </Alert>

      <Grid container spacing={3}>
        {arquivosExemplo.map((arquivo) => (
          <Grid item xs={12} md={4} key={arquivo.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ color: `${arquivo.cor}.main`, mr: 1 }}>
                    {arquivo.icon}
                  </Box>
                  <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    {arquivo.nome}
                  </Typography>
                  <Chip 
                    label={arquivo.ferramenta} 
                    color={arquivo.cor as any}
                    size="small"
                  />
                </Box>

                <Typography variant="body2" paragraph color="text.secondary">
                  {arquivo.descricao}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    📊 Informações:
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Paper sx={{ p: 1, textAlign: 'center', bgcolor: 'grey.50' }}>
                        <Typography variant="h6" color="primary">
                          {arquivo.registros}
                        </Typography>
                        <Typography variant="caption">Registros</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper sx={{ p: 1, textAlign: 'center', bgcolor: 'grey.50' }}>
                        <Typography variant="h6" color="primary">
                          {arquivo.colunas.length}
                        </Typography>
                        <Typography variant="caption">Colunas</Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>

                <Typography variant="subtitle2" gutterBottom>
                  📋 Colunas:
                </Typography>
                <Box sx={{ mb: 2 }}>
                  {arquivo.colunas.map((coluna, index) => (
                    <Chip
                      key={index}
                      label={coluna}
                      size="small"
                      sx={{ mr: 0.5, mb: 0.5 }}
                      variant="outlined"
                    />
                  ))}
                </Box>

                <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                  <Button
                    variant="outlined"
                    startIcon={<Visibility />}
                    onClick={() => visualizarArquivo(arquivo)}
                    size="small"
                    fullWidth
                  >
                    Visualizar
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<Download />}
                    onClick={() => baixarArquivo(arquivo)}
                    size="small"
                    fullWidth
                    color={arquivo.cor as any}
                  >
                    Download
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Tutorial de Como Usar */}
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            📚 Guia Rápido de Uso
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2, bgcolor: 'primary.light', color: 'white' }}>
                <Typography variant="h6" gutterBottom>
                  🤖 Para AutoML
                </Typography>
                <Typography variant="body2">
                  1. Baixe <strong>exemplo_automl.csv</strong><br/>
                  2. Vá para a seção AutoML<br/>
                  3. Carregue o arquivo<br/>
                  4. Execute o treinamento<br/>
                  5. Analise a precisão do modelo
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2, bgcolor: 'secondary.light', color: 'white' }}>
                <Typography variant="h6" gutterBottom>
                  🔍 Para Análise CBA
                </Typography>
                <Typography variant="body2">
                  1. Baixe <strong>exemplo_cba.csv</strong><br/>
                  2. Vá para a seção CBA<br/>
                  3. Carregue o arquivo<br/>
                  4. Execute a descoberta<br/>
                  5. Veja as regras encontradas
                </Typography>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2, bgcolor: 'success.light', color: 'white' }}>
                <Typography variant="h6" gutterBottom>
                  📊 Para Visualizações
                </Typography>
                <Typography variant="body2">
                  1. Baixe <strong>exemplo_visualizacao.csv</strong><br/>
                  2. Vá para a seção Visualizações<br/>
                  3. Carregue o arquivo<br/>
                  4. Escolha o tipo de gráfico<br/>
                  5. Visualize os resultados
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Dialog de Preview */}
      <Dialog 
        open={dialogAberto} 
        onClose={() => setDialogAberto(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          📄 Preview: {arquivoSelecionado?.nome}
        </DialogTitle>
        <DialogContent>
          {arquivoSelecionado && (
            <>
              <Alert severity="info" sx={{ mb: 2 }}>
                <strong>Ferramenta:</strong> {arquivoSelecionado.ferramenta} | 
                <strong> Registros:</strong> {arquivoSelecionado.registros} | 
                <strong> Tamanho:</strong> {arquivoSelecionado.tamanho}
              </Alert>
              
              <Typography variant="h6" gutterBottom>
                📋 Primeiras linhas do arquivo:
              </Typography>
              
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      {arquivoSelecionado.colunas.map((coluna, index) => (
                        <TableCell key={index}>
                          <strong>{coluna}</strong>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {arquivoSelecionado.preview.map((linha, index) => (
                      <TableRow key={index}>
                        {linha.map((valor, colIndex) => (
                          <TableCell key={colIndex}>{valor}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                ... e mais {arquivoSelecionado.registros - 4} registros
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogAberto(false)}>
            Fechar
          </Button>
          {arquivoSelecionado && (
            <Button 
              variant="contained" 
              startIcon={<Download />}
              onClick={() => {
                baixarArquivo(arquivoSelecionado);
                setDialogAberto(false);
              }}
              color={arquivoSelecionado.cor as any}
            >
              Download
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GerenciadorExemplos;