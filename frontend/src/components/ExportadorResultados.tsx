import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Grid,
  Divider,
  IconButton,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
import {
  Download,
  PictureAsPdf,
  TableChart,
  Image,
  Code,
  Share,
  Print
} from '@mui/icons-material';

// Interfaces para tipos de export
interface DadosExport {
  titulo: string;
  subtitulo?: string;
  dados: any[];
  graficos?: ExportGrafico[];
  metricas?: ExportMetrica[];
  analise?: ExportAnalise;
  configuracao?: any;
}

interface ExportGrafico {
  tipo: 'bar' | 'line' | 'pie' | 'scatter';
  titulo: string;
  dados: any[];
  elemento?: HTMLElement;
  configuracao?: any;
}

interface ExportMetrica {
  nome: string;
  valor: string | number;
  descricao?: string;
  tipo: 'percentual' | 'numero' | 'texto';
}

interface ExportAnalise {
  resumo: string;
  detalhes: string[];
  recomendacoes: string[];
  limitacoes?: string[];
}

interface ExportadorResultadosProps {
  dados: DadosExport;
  nomeArquivo?: string;
  onExportSuccess?: (formato: string) => void;
  onExportError?: (erro: string) => void;
}

export const ExportadorResultados: React.FC<ExportadorResultadosProps> = ({
  dados,
  nomeArquivo = 'analise_resultados',
  onExportSuccess,
  onExportError
}) => {
  const [formatoSelecionado, setFormatoSelecionado] = React.useState<string>('csv');
  const [exportando, setExportando] = React.useState<boolean>(false);

  const handleFormatoChange = (event: SelectChangeEvent) => {
    setFormatoSelecionado(event.target.value);
  };

  // Função para gerar CSV
  const gerarCSV = (): string => {
    try {
      if (!dados.dados || dados.dados.length === 0) {
        throw new Error('Nenhum dado disponível para exportar');
      }

      const headers = Object.keys(dados.dados[0]);
      const csvContent = [
        headers.join(','),
        ...dados.dados.map(row => 
          headers.map(header => {
            const value = row[header];
            // Escapar vírgulas e aspas
            if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
              return `"${value.replace(/"/g, '""')}"`;
            }
            return value ?? '';
          }).join(',')
        )
      ].join('\n');

      return csvContent;
    } catch (error) {
      throw new Error(`Erro ao gerar CSV: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  };

  // Função para gerar JSON
  const gerarJSON = (): string => {
    try {
      const exportData = {
        titulo: dados.titulo,
        subtitulo: dados.subtitulo,
        dataExport: new Date().toISOString(),
        dados: dados.dados,
        metricas: dados.metricas,
        analise: dados.analise,
        configuracao: dados.configuracao
      };

      return JSON.stringify(exportData, null, 2);
    } catch (error) {
      throw new Error(`Erro ao gerar JSON: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  };

  // Função para gerar relatório HTML
  const gerarHTML = (): string => {
    try {
      const metricas = dados.metricas || [];
      const analise = dados.analise;
      
      let html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${dados.titulo}</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            margin: 40px;
            color: #333;
            background-color: #f9f9f9;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #2c3e50;
            text-align: center;
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
        }
        h2 {
            color: #34495e;
            margin-top: 30px;
            border-left: 4px solid #3498db;
            padding-left: 15px;
        }
        .metricas {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        .metrica {
            background: #ecf0f1;
            padding: 20px;
            border-radius: 8px;
            text-align: center;
        }
        .metrica-valor {
            font-size: 2em;
            font-weight: bold;
            color: #3498db;
        }
        .metrica-nome {
            margin-top: 10px;
            color: #7f8c8d;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }
        th {
            background-color: #3498db;
            color: white;
        }
        tr:nth-child(even) {
            background-color: #f2f2f2;
        }
        .analise {
            background: #e8f4f8;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .recomendacoes {
            background: #f0f8f0;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .limitacoes {
            background: #fff3cd;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
        ul {
            padding-left: 20px;
        }
        li {
            margin: 8px 0;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #7f8c8d;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>${dados.titulo}</h1>
        ${dados.subtitulo ? `<p style="text-align: center; color: #7f8c8d; font-size: 1.1em;">${dados.subtitulo}</p>` : ''}
        
        ${metricas.length > 0 ? `
        <h2>📊 Métricas Principais</h2>
        <div class="metricas">
            ${metricas.map(metrica => `
                <div class="metrica">
                    <div class="metrica-valor">${metrica.valor}</div>
                    <div class="metrica-nome">${metrica.nome}</div>
                    ${metrica.descricao ? `<div style="font-size: 0.9em; color: #7f8c8d; margin-top: 5px;">${metrica.descricao}</div>` : ''}
                </div>
            `).join('')}
        </div>
        ` : ''}

        ${dados.dados.length > 0 ? `
        <h2>📋 Dados Processados</h2>
        <table>
            <thead>
                <tr>
                    ${Object.keys(dados.dados[0]).map(key => `<th>${key}</th>`).join('')}
                </tr>
            </thead>
            <tbody>
                ${dados.dados.slice(0, 50).map(row => `
                    <tr>
                        ${Object.values(row).map(value => `<td>${value ?? ''}</td>`).join('')}
                    </tr>
                `).join('')}
            </tbody>
        </table>
        ${dados.dados.length > 50 ? `<p><em>Mostrando apenas os primeiros 50 registros de ${dados.dados.length} total.</em></p>` : ''}
        ` : ''}

        ${analise ? `
        <h2>🔍 Análise dos Resultados</h2>
        <div class="analise">
            <h3>Resumo</h3>
            <p>${analise.resumo}</p>
            
            ${analise.detalhes.length > 0 ? `
            <h3>Detalhes</h3>
            <ul>
                ${analise.detalhes.map(detalhe => `<li>${detalhe}</li>`).join('')}
            </ul>
            ` : ''}
        </div>

        ${analise.recomendacoes.length > 0 ? `
        <div class="recomendacoes">
            <h3>💡 Recomendações</h3>
            <ul>
                ${analise.recomendacoes.map(rec => `<li>${rec}</li>`).join('')}
            </ul>
        </div>
        ` : ''}

        ${analise.limitacoes && analise.limitacoes.length > 0 ? `
        <div class="limitacoes">
            <h3>⚠️ Limitações</h3>
            <ul>
                ${analise.limitacoes.map(lim => `<li>${lim}</li>`).join('')}
            </ul>
        </div>
        ` : ''}
        ` : ''}

        <div class="footer">
            <p>Relatório gerado em: ${new Date().toLocaleString('pt-BR')}</p>
            <p>DataScience Pro - Plataforma de Análise de Dados</p>
        </div>
    </div>
</body>
</html>`;
      
      return html;
    } catch (error) {
      throw new Error(`Erro ao gerar HTML: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  };

  // Função para download de arquivo
  const downloadArquivo = (conteudo: string, extensao: string, tipoMime: string) => {
    try {
      const blob = new Blob([conteudo], { type: tipoMime });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${nomeArquivo}.${extensao}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      throw new Error(`Erro no download: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  };

  // Função principal de export
  const executarExport = async () => {
    setExportando(true);
    
    try {
      let conteudo: string;
      let extensao: string;
      let tipoMime: string;

      switch (formatoSelecionado) {
        case 'csv':
          conteudo = gerarCSV();
          extensao = 'csv';
          tipoMime = 'text/csv;charset=utf-8;';
          break;
        
        case 'json':
          conteudo = gerarJSON();
          extensao = 'json';
          tipoMime = 'application/json;charset=utf-8;';
          break;
        
        case 'html':
          conteudo = gerarHTML();
          extensao = 'html';
          tipoMime = 'text/html;charset=utf-8;';
          break;
        
        default:
          throw new Error('Formato de export não suportado');
      }

      downloadArquivo(conteudo, extensao, tipoMime);
      
      if (onExportSuccess) {
        onExportSuccess(formatoSelecionado);
      }
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido durante export';
      console.error('Erro no export:', error);
      
      if (onExportError) {
        onExportError(errorMessage);
      }
    } finally {
      setExportando(false);
    }
  };

  // Função para imprimir (apenas HTML)
  const imprimirRelatorio = () => {
    try {
      const conteudo = gerarHTML();
      const janela = window.open('', '_blank');
      if (janela) {
        janela.document.write(conteudo);
        janela.document.close();
        janela.focus();
        janela.print();
      }
    } catch (error) {
      if (onExportError) {
        onExportError('Erro ao preparar impressão');
      }
    }
  };

  // Função para compartilhar dados
  const compartilharDados = async () => {
    try {
      if (navigator.share) {
        const resumo = `${dados.titulo}\n\nResumo dos resultados:\n${dados.analise?.resumo || 'Análise de dados concluída'}`;
        
        await navigator.share({
          title: dados.titulo,
          text: resumo,
          url: window.location.href
        });
      } else {
        // Fallback: copiar para clipboard
        const resumo = `${dados.titulo}\n\n${dados.analise?.resumo || 'Análise de dados concluída'}`;
        await navigator.clipboard.writeText(resumo);
        
        if (onExportSuccess) {
          onExportSuccess('clipboard');
        }
      }
    } catch (error) {
      if (onExportError) {
        onExportError('Erro ao compartilhar dados');
      }
    }
  };

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          📤 Exportar Resultados
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Formato de Export</InputLabel>
                <Select
                  value={formatoSelecionado}
                  onChange={handleFormatoChange}
                  label="Formato de Export"
                >
                  <MenuItem value="csv">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <TableChart fontSize="small" />
                      CSV (Dados Tabulares)
                    </Box>
                  </MenuItem>
                  <MenuItem value="json">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Code fontSize="small" />
                      JSON (Dados Estruturados)
                    </Box>
                  </MenuItem>
                  <MenuItem value="html">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PictureAsPdf fontSize="small" />
                      HTML (Relatório Completo)
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                startIcon={<Download />}
                onClick={executarExport}
                disabled={exportando}
                fullWidth
                sx={{ height: 56 }}
              >
                {exportando ? 'Exportando...' : 'Baixar Arquivo'}
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle2" gutterBottom>
          Opções Adicionais:
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Tooltip title="Imprimir relatório completo">
            <IconButton 
              onClick={imprimirRelatorio}
              color="primary"
              size="small"
            >
              <Print />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Compartilhar resultados">
            <IconButton 
              onClick={compartilharDados}
              color="secondary"
              size="small"
            >
              <Share />
            </IconButton>
          </Tooltip>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="caption" color="text.secondary">
            📁 Arquivo: {nomeArquivo}.{formatoSelecionado} | 
            📊 {dados.dados.length} registros | 
            ⏰ {new Date().toLocaleString('pt-BR')}
          </Typography>
        </Box>

        {dados.metricas && dados.metricas.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="caption" color="text.secondary">
              Métricas incluídas: 
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 0.5 }}>
              {dados.metricas.map((metrica, index) => (
                <Chip 
                  key={index}
                  label={metrica.nome}
                  size="small"
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ExportadorResultados;