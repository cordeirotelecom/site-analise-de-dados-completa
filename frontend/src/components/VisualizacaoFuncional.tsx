import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import {
  Upload,
  BarChart,
  Timeline,
  PieChart,
  ScatterPlot,
  Download,
  Refresh,
} from '@mui/icons-material';

interface DadosGrafico {
  labels: string[];
  values: number[];
  tipo: string;
}

const VisualizacaoFuncional: React.FC = () => {
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [dados, setDados] = useState<any>(null);
  const [tipoGrafico, setTipoGrafico] = useState<string>('bar');
  const [dadosGrafico, setDadosGrafico] = useState<DadosGrafico | null>(null);
  const [processando, setProcessando] = useState(false);

  const tiposGraficos = [
    { id: 'bar', nome: '📊 Gráfico de Barras', descricao: 'Comparar categorias' },
    { id: 'line', nome: '📈 Gráfico de Linha', descricao: 'Mostrar tendências' },
    { id: 'pie', nome: '🥧 Gráfico de Pizza', descricao: 'Mostrar proporções' },
    { id: 'histogram', nome: '📊 Histograma', descricao: 'Distribuição de valores' },
    { id: 'scatter', nome: '🔹 Gráfico de Dispersão', descricao: 'Correlações' },
  ];

  // Processar arquivo CSV
  const processarCSV = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          const linhas = text.split('\n').filter(linha => linha.trim());
          const cabecalho = linhas[0].split(',').map(col => col.trim());
          const dados = linhas.slice(1).map(linha => {
            const valores = linha.split(',');
            const objeto: any = {};
            cabecalho.forEach((col, index) => {
              const valor = valores[index]?.trim() || '';
              // Tenta converter para número
              const numero = Number(valor);
              objeto[col] = !isNaN(numero) && valor !== '' ? numero : valor;
            });
            return objeto;
          });

          const analise = {
            totalLinhas: dados.length,
            colunas: cabecalho,
            dados: dados,
            tipos: cabecalho.map(col => {
              const valores = dados.map(row => row[col]).filter(val => val !== '');
              const numericos = valores.filter(val => typeof val === 'number');
              
              return {
                nome: col,
                tipo: numericos.length > valores.length * 0.7 ? 'numérico' : 'categórico',
                valoresUnicos: [...new Set(valores)].length,
                exemplos: [...new Set(valores)].slice(0, 3)
              };
            })
          };

          resolve(analise);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
      reader.readAsText(file);
    });
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.csv')) {
      alert('Por favor, selecione um arquivo CSV.');
      return;
    }

    setProcessando(true);
    setArquivo(file);

    try {
      const resultado = await processarCSV(file);
      setDados(resultado);
      gerarGraficoPadrao(resultado);
    } catch (error) {
      alert('Erro ao processar arquivo CSV.');
    } finally {
      setProcessando(false);
    }
  };

  const gerarGraficoPadrao = (dadosAnalise: any) => {
    if (!dadosAnalise.dados.length) return;

    // Pega primeira coluna categórica e primeira numérica
    const colunaCategorica = dadosAnalise.tipos.find((t: any) => t.tipo === 'categórico');
    const colunaNumerica = dadosAnalise.tipos.find((t: any) => t.tipo === 'numérico');

    if (!colunaCategorica || !colunaNumerica) {
      // Se não tem ambos os tipos, faz uma contagem simples da primeira coluna
      const primeiraColuna = dadosAnalise.colunas[0];
      const contagem = dadosAnalise.dados.reduce((acc: any, row: any) => {
        const valor = row[primeiraColuna];
        acc[valor] = (acc[valor] || 0) + 1;
        return acc;
      }, {});

      setDadosGrafico({
        labels: Object.keys(contagem),
        values: Object.values(contagem) as number[],
        tipo: 'bar'
      });
      return;
    }

    // Agrupa dados por categoria e calcula valores
    const agrupamento = dadosAnalise.dados.reduce((acc: any, row: any) => {
      const categoria = row[colunaCategorica.nome];
      const valor = row[colunaNumerica.nome];
      
      if (!acc[categoria]) {
        acc[categoria] = [];
      }
      if (typeof valor === 'number') {
        acc[categoria].push(valor);
      }
      return acc;
    }, {});

    // Calcula média por categoria
    const labels = Object.keys(agrupamento);
    const values = labels.map(label => {
      const valores = agrupamento[label];
      return valores.length > 0 ? valores.reduce((a: number, b: number) => a + b, 0) / valores.length : 0;
    });

    setDadosGrafico({
      labels,
      values,
      tipo: tipoGrafico
    });
  };

  const handleTipoGraficoChange = (novoTipo: string) => {
    setTipoGrafico(novoTipo);
    if (dados) {
      gerarGraficoPadrao(dados);
    }
  };

  // Renderizar gráfico simples usando CSS/HTML
  const renderizarGrafico = () => {
    if (!dadosGrafico) return null;

    const valorMaximo = Math.max(...dadosGrafico.values);
    
    if (tipoGrafico === 'bar') {
      return (
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            📊 Gráfico de Barras
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'end', gap: 1, height: 300, mt: 2 }}>
            {dadosGrafico.labels.map((label, index) => {
              const altura = (dadosGrafico.values[index] / valorMaximo) * 250;
              return (
                <Box key={index} sx={{ textAlign: 'center', flex: 1 }}>
                  <Box
                    sx={{
                      height: altura,
                      backgroundColor: `hsl(${index * 60}, 70%, 50%)`,
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'end',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '0.8rem',
                      mb: 1
                    }}
                  >
                    {dadosGrafico.values[index].toFixed(1)}
                  </Box>
                  <Typography variant="caption" sx={{ transform: 'rotate(-45deg)', display: 'block' }}>
                    {label}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      );
    }

    if (tipoGrafico === 'pie') {
      const total = dadosGrafico.values.reduce((a, b) => a + b, 0);
      let anguloAcumulado = 0;

      return (
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            🥧 Gráfico de Pizza
          </Typography>
          <Box sx={{ position: 'relative', width: 300, height: 300, mx: 'auto', mt: 2 }}>
            <svg width="300" height="300">
              {dadosGrafico.values.map((valor, index) => {
                const porcentagem = (valor / total) * 100;
                const angulo = (valor / total) * 360;
                const x1 = 150 + 120 * Math.cos((anguloAcumulado * Math.PI) / 180);
                const y1 = 150 + 120 * Math.sin((anguloAcumulado * Math.PI) / 180);
                anguloAcumulado += angulo;
                const x2 = 150 + 120 * Math.cos((anguloAcumulado * Math.PI) / 180);
                const y2 = 150 + 120 * Math.sin((anguloAcumulado * Math.PI) / 180);
                const largeArc = angulo > 180 ? 1 : 0;

                return (
                  <g key={index}>
                    <path
                      d={`M 150 150 L ${x1} ${y1} A 120 120 0 ${largeArc} 1 ${x2} ${y2} Z`}
                      fill={`hsl(${index * 60}, 70%, 50%)`}
                      stroke="white"
                      strokeWidth="2"
                    />
                    <text
                      x={150 + 80 * Math.cos(((anguloAcumulado - angulo/2) * Math.PI) / 180)}
                      y={150 + 80 * Math.sin(((anguloAcumulado - angulo/2) * Math.PI) / 180)}
                      textAnchor="middle"
                      fill="white"
                      fontSize="12"
                      fontWeight="bold"
                    >
                      {porcentagem.toFixed(1)}%
                    </text>
                  </g>
                );
              })}
            </svg>
          </Box>
          <Box sx={{ mt: 2 }}>
            {dadosGrafico.labels.map((label, index) => (
              <Chip
                key={index}
                label={`${label}: ${dadosGrafico.values[index].toFixed(1)}`}
                sx={{ 
                  m: 0.5, 
                  backgroundColor: `hsl(${index * 60}, 70%, 50%)`,
                  color: 'white'
                }}
                size="small"
              />
            ))}
          </Box>
        </Box>
      );
    }

    if (tipoGrafico === 'line') {
      const altura = 200;
      const largura = 400;
      const pontos = dadosGrafico.values.map((valor, index) => {
        const x = (index / (dadosGrafico.values.length - 1)) * largura;
        const y = altura - (valor / valorMaximo) * altura;
        return `${x},${y}`;
      }).join(' ');

      return (
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            📈 Gráfico de Linha
          </Typography>
          <Box sx={{ overflowX: 'auto', mt: 2 }}>
            <svg width={largura + 50} height={altura + 50} style={{ border: '1px solid #ddd' }}>
              <polyline
                points={pontos}
                fill="none"
                stroke="#2196f3"
                strokeWidth="3"
                transform="translate(25, 25)"
              />
              {dadosGrafico.values.map((valor, index) => {
                const x = (index / (dadosGrafico.values.length - 1)) * largura + 25;
                const y = altura - (valor / valorMaximo) * altura + 25;
                return (
                  <g key={index}>
                    <circle cx={x} cy={y} r="4" fill="#ff5722" />
                    <text x={x} y={y - 10} textAnchor="middle" fontSize="10" fill="#333">
                      {valor.toFixed(1)}
                    </text>
                  </g>
                );
              })}
            </svg>
          </Box>
          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', maxWidth: largura + 50, mx: 'auto' }}>
            {dadosGrafico.labels.map((label, index) => (
              <Typography key={index} variant="caption" sx={{ transform: 'rotate(-45deg)' }}>
                {label}
              </Typography>
            ))}
          </Box>
        </Box>
      );
    }

    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="body1">
          Gráfico "{tipoGrafico}" em desenvolvimento...
        </Typography>
      </Box>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" gutterBottom>
          📊 Visualização de Dados Funcional
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Crie gráficos reais a partir dos seus dados CSV
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Upload e Controles */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📁 Carregar Dados
              </Typography>

              {!arquivo && (
                <Box sx={{ border: '2px dashed #ccc', borderRadius: 2, p: 3, textAlign: 'center' }}>
                  <input
                    accept=".csv"
                    style={{ display: 'none' }}
                    id="upload-viz"
                    type="file"
                    onChange={handleUpload}
                  />
                  <label htmlFor="upload-viz">
                    <Button
                      variant="contained"
                      component="span"
                      startIcon={<Upload />}
                      disabled={processando}
                    >
                      {processando ? 'Processando...' : 'Carregar CSV'}
                    </Button>
                  </label>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Formato: .csv | Max: 5MB
                  </Typography>
                </Box>
              )}

              {arquivo && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  ✅ <strong>{arquivo.name}</strong> carregado!
                </Alert>
              )}

              {dados && (
                <>
                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    📊 Tipo de Gráfico
                  </Typography>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Escolha o tipo</InputLabel>
                    <Select
                      value={tipoGrafico}
                      onChange={(e) => handleTipoGraficoChange(e.target.value)}
                    >
                      {tiposGraficos.map((tipo) => (
                        <MenuItem key={tipo.id} value={tipo.id}>
                          {tipo.nome}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Typography variant="body2" color="text.secondary">
                    {tiposGraficos.find(t => t.id === tipoGrafico)?.descricao}
                  </Typography>

                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Refresh />}
                    onClick={() => gerarGraficoPadrao(dados)}
                    sx={{ mt: 2 }}
                  >
                    Atualizar Gráfico
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Informações dos Dados */}
          {dados && (
            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  📋 Informações dos Dados
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Paper sx={{ p: 1, textAlign: 'center' }}>
                      <Typography variant="h5" color="primary">
                        {dados.totalLinhas}
                      </Typography>
                      <Typography variant="caption">Registros</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper sx={{ p: 1, textAlign: 'center' }}>
                      <Typography variant="h5" color="primary">
                        {dados.colunas.length}
                      </Typography>
                      <Typography variant="caption">Colunas</Typography>
                    </Paper>
                  </Grid>
                </Grid>

                <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                  Colunas detectadas:
                </Typography>
                {dados.tipos.map((tipo: any, index: number) => (
                  <Chip
                    key={index}
                    label={`${tipo.nome} (${tipo.tipo})`}
                    color={tipo.tipo === 'numérico' ? 'primary' : 'secondary'}
                    size="small"
                    sx={{ m: 0.5 }}
                  />
                ))}
              </CardContent>
            </Card>
          )}
        </Grid>

        {/* Área do Gráfico */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              {!dados && (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <Typography variant="h5" color="text.secondary" gutterBottom>
                    📊 Seus gráficos aparecerão aqui
                  </Typography>
                  <Typography variant="body1">
                    Carregue um arquivo CSV para começar a visualizar
                  </Typography>
                </Box>
              )}

              {dados && !dadosGrafico && (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="h6">
                    Gerando gráfico...
                  </Typography>
                </Box>
              )}

              {dadosGrafico && renderizarGrafico()}

              {dadosGrafico && (
                <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    📊 Dados do Gráfico:
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell><strong>Categoria</strong></TableCell>
                          <TableCell align="right"><strong>Valor</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {dadosGrafico.labels.map((label, index) => (
                          <TableRow key={index}>
                            <TableCell>{label}</TableCell>
                            <TableCell align="right">
                              {dadosGrafico.values[index].toFixed(2)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VisualizacaoFuncional;