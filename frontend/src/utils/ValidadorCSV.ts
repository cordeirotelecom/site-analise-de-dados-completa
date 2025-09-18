import { Alert, AlertColor } from '@mui/material';

export interface ResultadoValidacao {
  valido: boolean;
  erros: string[];
  avisos: string[];
  sugestoes: string[];
  estatisticas: {
    totalLinhas: number;
    totalColunas: number;
    linhasVazias: number;
    colunasComErros: string[];
    tiposDetectados: { [coluna: string]: string };
  };
}

export class ValidadorCSV {
  static validarArquivo(arquivo: File): Promise<{ valido: boolean; erro?: string }> {
    return new Promise((resolve) => {
      // Validar tamanho do arquivo (máximo 10MB)
      const tamanhoMaximo = 10 * 1024 * 1024; // 10MB
      if (arquivo.size > tamanhoMaximo) {
        resolve({
          valido: false,
          erro: `Arquivo muito grande (${(arquivo.size / 1024 / 1024).toFixed(1)}MB). Máximo permitido: 10MB.`
        });
        return;
      }

      // Validar extensão
      if (!arquivo.name.toLowerCase().endsWith('.csv')) {
        resolve({
          valido: false,
          erro: 'Arquivo deve ter extensão .csv'
        });
        return;
      }

      // Validar se não está vazio
      if (arquivo.size === 0) {
        resolve({
          valido: false,
          erro: 'Arquivo está vazio'
        });
        return;
      }

      resolve({ valido: true });
    });
  }

  static validarConteudo(conteudo: string): ResultadoValidacao {
    const resultado: ResultadoValidacao = {
      valido: true,
      erros: [],
      avisos: [],
      sugestoes: [],
      estatisticas: {
        totalLinhas: 0,
        totalColunas: 0,
        linhasVazias: 0,
        colunasComErros: [],
        tiposDetectados: {}
      }
    };

    try {
      // Dividir em linhas e remover linhas completamente vazias
      const linhas = conteudo.split('\n').map(linha => linha.trim());
      const linhasNaoVazias = linhas.filter(linha => linha.length > 0);
      
      resultado.estatisticas.totalLinhas = linhasNaoVazias.length;
      resultado.estatisticas.linhasVazias = linhas.length - linhasNaoVazias.length;

      // Verificar se há linhas suficientes
      if (linhasNaoVazias.length < 2) {
        resultado.erros.push('Arquivo deve ter pelo menos 2 linhas (cabeçalho + dados)');
        resultado.valido = false;
        return resultado;
      }

      // Analisar cabeçalho
      const cabecalho = linhasNaoVazias[0].split(',').map(col => col.trim());
      resultado.estatisticas.totalColunas = cabecalho.length;

      // Validar cabeçalho
      if (cabecalho.length === 0) {
        resultado.erros.push('Cabeçalho não encontrado');
        resultado.valido = false;
        return resultado;
      }

      // Verificar colunas duplicadas no cabeçalho
      const colunasDuplicadas = cabecalho.filter((col, index) => 
        cabecalho.indexOf(col) !== index && col !== ''
      );
      if (colunasDuplicadas.length > 0) {
        resultado.avisos.push(`Colunas duplicadas encontradas: ${colunasDuplicadas.join(', ')}`);
      }

      // Verificar colunas vazias no cabeçalho
      const colunasVazias = cabecalho.filter(col => col === '');
      if (colunasVazias.length > 0) {
        resultado.avisos.push(`${colunasVazias.length} coluna(s) sem nome no cabeçalho`);
      }

      // Validar dados
      const dadosLinhas = linhasNaoVazias.slice(1);
      let linhasComProblemas = 0;

      dadosLinhas.forEach((linha, index) => {
        const valores = linha.split(',');
        
        // Verificar se o número de colunas está correto
        if (valores.length !== cabecalho.length) {
          linhasComProblemas++;
          if (linhasComProblemas <= 3) { // Mostrar apenas os primeiros 3 erros
            resultado.avisos.push(
              `Linha ${index + 2}: ${valores.length} valores, esperado ${cabecalho.length}`
            );
          }
        }
      });

      if (linhasComProblemas > 3) {
        resultado.avisos.push(`... e mais ${linhasComProblemas - 3} linhas com problemas similares`);
      }

      // Detectar tipos de dados
      cabecalho.forEach((nomeColuna, colIndex) => {
        if (nomeColuna === '') return;

        const valores = dadosLinhas.map(linha => {
          const vals = linha.split(',');
          return vals[colIndex]?.trim() || '';
        }).filter(val => val !== '');

        if (valores.length === 0) {
          resultado.estatisticas.tiposDetectados[nomeColuna] = 'vazio';
          resultado.estatisticas.colunasComErros.push(nomeColuna);
          return;
        }

        // Detectar tipo baseado na amostra
        const numericos = valores.filter(val => !isNaN(Number(val)) && val !== '');
        const percentualNumerico = numericos.length / valores.length;

        if (percentualNumerico > 0.8) {
          resultado.estatisticas.tiposDetectados[nomeColuna] = 'numérico';
        } else if (percentualNumerico > 0.5) {
          resultado.estatisticas.tiposDetectados[nomeColuna] = 'misto';
          resultado.avisos.push(`Coluna "${nomeColuna}" tem tipos mistos (${(percentualNumerico * 100).toFixed(0)}% numérico)`);
        } else {
          resultado.estatisticas.tiposDetectados[nomeColuna] = 'categórico';
        }

        // Verificar valores únicos
        const valoresUnicos = new Set(valores);
        if (valoresUnicos.size === 1) {
          resultado.avisos.push(`Coluna "${nomeColuna}" tem apenas um valor único: "${valores[0]}"`);
        } else if (valoresUnicos.size === valores.length && valores.length > 10) {
          resultado.avisos.push(`Coluna "${nomeColuna}" pode ser um identificador (todos valores únicos)`);
        }
      });

      // Sugestões baseadas na análise
      if (resultado.estatisticas.totalLinhas < 50) {
        resultado.sugestoes.push('Dataset pequeno (< 50 registros). Considerr coletar mais dados para análises mais confiáveis.');
      }

      if (resultado.estatisticas.totalColunas < 3) {
        resultado.sugestoes.push('Poucas colunas para análise. Datasets com mais variáveis geram insights mais ricos.');
      }

      const colunasNumericas = Object.values(resultado.estatisticas.tiposDetectados).filter(t => t === 'numérico').length;
      const colunasCategoricas = Object.values(resultado.estatisticas.tiposDetectados).filter(t => t === 'categórico').length;

      if (colunasNumericas === 0) {
        resultado.sugestoes.push('Nenhuma coluna numérica detectada. Algumas análises podem ser limitadas.');
      }

      if (colunasCategoricas === 0) {
        resultado.sugestoes.push('Nenhuma coluna categórica detectada. Análise CBA pode não ser aplicável.');
      }

      if (resultado.estatisticas.linhasVazias > 0) {
        resultado.avisos.push(`${resultado.estatisticas.linhasVazias} linha(s) vazia(s) foram ignoradas`);
      }

      // Se há muitos erros, marcar como inválido
      if (resultado.erros.length > 0) {
        resultado.valido = false;
      }

    } catch (error) {
      resultado.erros.push(`Erro ao processar arquivo: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
      resultado.valido = false;
    }

    return resultado;
  }

  static gerarRecomendacoes(validacao: ResultadoValidacao): Array<{
    tipo: AlertColor;
    titulo: string;
    mensagem: string;
  }> {
    const recomendacoes: Array<{
      tipo: AlertColor;
      titulo: string;
      mensagem: string;
    }> = [];

    // Erros críticos
    validacao.erros.forEach(erro => {
      recomendacoes.push({
        tipo: 'error',
        titulo: 'Erro Crítico',
        mensagem: erro
      });
    });

    // Avisos importantes
    validacao.avisos.forEach(aviso => {
      recomendacoes.push({
        tipo: 'warning',
        titulo: 'Atenção',
        mensagem: aviso
      });
    });

    // Sugestões de melhoria
    validacao.sugestoes.forEach(sugestao => {
      recomendacoes.push({
        tipo: 'info',
        titulo: 'Sugestão',
        mensagem: sugestao
      });
    });

    // Adicionar recomendação de sucesso se tudo estiver bem
    if (validacao.valido && validacao.avisos.length === 0) {
      recomendacoes.push({
        tipo: 'success',
        titulo: 'Arquivo Válido',
        mensagem: `Arquivo processado com sucesso! ${validacao.estatisticas.totalLinhas} registros e ${validacao.estatisticas.totalColunas} colunas detectadas.`
      });
    }

    return recomendacoes;
  }

  static formatarEstatisticas(validacao: ResultadoValidacao): {
    label: string;
    valor: string | number;
    cor: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  }[] {
    const stats = validacao.estatisticas;
    
    return [
      {
        label: 'Total de Registros',
        valor: stats.totalLinhas,
        cor: stats.totalLinhas > 100 ? 'success' : stats.totalLinhas > 50 ? 'warning' : 'error'
      },
      {
        label: 'Total de Colunas',
        valor: stats.totalColunas,
        cor: stats.totalColunas >= 3 ? 'success' : 'warning'
      },
      {
        label: 'Colunas Numéricas',
        valor: Object.values(stats.tiposDetectados).filter(t => t === 'numérico').length,
        cor: 'primary'
      },
      {
        label: 'Colunas Categóricas',
        valor: Object.values(stats.tiposDetectados).filter(t => t === 'categórico').length,
        cor: 'secondary'
      },
      {
        label: 'Problemas Detectados',
        valor: stats.colunasComErros.length,
        cor: stats.colunasComErros.length === 0 ? 'success' : 'error'
      }
    ];
  }
}

// Hook personalizado para usar o validador
export const useValidadorCSV = () => {
  const validarArquivo = async (arquivo: File): Promise<ResultadoValidacao | null> => {
    // Primeiro validar o arquivo
    const validacaoArquivo = await ValidadorCSV.validarArquivo(arquivo);
    if (!validacaoArquivo.valido) {
      return {
        valido: false,
        erros: [validacaoArquivo.erro || 'Erro desconhecido'],
        avisos: [],
        sugestoes: [],
        estatisticas: {
          totalLinhas: 0,
          totalColunas: 0,
          linhasVazias: 0,
          colunasComErros: [],
          tiposDetectados: {}
        }
      };
    }

    // Ler e validar conteúdo
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const conteudo = e.target?.result as string;
          const validacao = ValidadorCSV.validarConteudo(conteudo);
          resolve(validacao);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Erro ao ler arquivo'));
      reader.readAsText(arquivo);
    });
  };

  return { validarArquivo };
};