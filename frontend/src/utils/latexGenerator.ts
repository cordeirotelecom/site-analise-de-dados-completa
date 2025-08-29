// Utilitário para conversão LaTeX
export interface LatexDocument {
  titulo: string;
  autor: string;
  resumo: string;
  introducao: string;
  metodologia: string;
  resultados: string;
  conclusao: string;
  referencias: string[];
  tabelas: LatexTable[];
  figuras: LatexFigure[];
}

export interface LatexTable {
  id: string;
  titulo: string;
  colunas: string[];
  dados: string[][];
  caption: string;
}

export interface LatexFigure {
  id: string;
  titulo: string;
  descricao: string;
  codigo_grafico: string;
  caption: string;
}

export class LatexGenerator {
  static gerarDocumentoCompleto(documento: LatexDocument): string {
    return `
\\documentclass[12pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[brazil]{babel}
\\usepackage{amsmath,amsfonts,amssymb}
\\usepackage{graphicx}
\\usepackage{float}
\\usepackage{booktabs}
\\usepackage{longtable}
\\usepackage{geometry}
\\usepackage{hyperref}
\\usepackage{xcolor}
\\usepackage{listings}

\\geometry{left=3cm,right=2cm,top=3cm,bottom=2cm}

\\hypersetup{
    colorlinks=true,
    linkcolor=blue,
    filecolor=magenta,      
    urlcolor=cyan,
    pdftitle={${documento.titulo}},
    pdfauthor={${documento.autor}},
}

\\lstset{
    basicstyle=\\ttfamily\\footnotesize,
    keywordstyle=\\color{blue}\\bfseries,
    commentstyle=\\color{gray},
    stringstyle=\\color{red},
    showstringspaces=false,
    breaklines=true,
    frame=single,
    backgroundcolor=\\color{gray!10}
}

\\title{${documento.titulo}}
\\author{${documento.autor}}
\\date{\\today}

\\begin{document}

\\maketitle

\\begin{abstract}
${documento.resumo}
\\end{abstract}

\\tableofcontents
\\newpage

\\section{Introdução}
${documento.introducao}

\\section{Metodologia}
${documento.metodologia}

\\subsection{Análise Estatística}
Para este estudo, foram aplicados os seguintes métodos estatísticos:

\\begin{itemize}
    \\item \\textbf{Análise Descritiva}: Medidas de tendência central e dispersão
    \\item \\textbf{Correlação de Pearson}: Para avaliar relações lineares entre variáveis
    \\item \\textbf{Teste t de Student}: Para comparação de médias entre grupos
    \\item \\textbf{Análise de Regressão}: Para modelagem preditiva
    \\item \\textbf{ANOVA}: Para comparação de múltiplas médias
\\end{itemize}

\\subsection{Critérios de Significância}
Adotou-se nível de significância de 5\\% (\\(\\alpha = 0.05\\)) para todos os testes estatísticos.

\\section{Resultados}
${documento.resultados}

${this.gerarTabelas(documento.tabelas)}

${this.gerarFiguras(documento.figuras)}

\\section{Discussão}
Os resultados obtidos demonstram...

\\section{Conclusão}
${documento.conclusao}

\\section{Referências}
\\begin{thebibliography}{99}
${documento.referencias.map((ref, index) => 
  `\\bibitem{ref${index + 1}} ${ref}`
).join('\n')}
\\end{thebibliography}

\\end{document}
    `;
  }

  static gerarTabelas(tabelas: LatexTable[]): string {
    return tabelas.map(tabela => `
\\begin{table}[H]
\\centering
\\caption{${tabela.caption}}
\\begin{tabular}{${tabela.colunas.map(() => 'c').join('|')}}
\\toprule
${tabela.colunas.join(' & ')} \\\\
\\midrule
${tabela.dados.map(linha => linha.join(' & ') + ' \\\\').join('\n')}
\\bottomrule
\\end{tabular}
\\label{tab:${tabela.id}}
\\end{table}
    `).join('\n');
  }

  static gerarFiguras(figuras: LatexFigure[]): string {
    return figuras.map(figura => `
\\begin{figure}[H]
\\centering
${figura.codigo_grafico}
\\caption{${figura.caption}}
\\label{fig:${figura.id}}
\\end{figure}
    `).join('\n');
  }

  static escaparTextoLatex(texto: string): string {
    return texto
      .replace(/\\\\/g, '\\textbackslash')
      .replace(/#/g, '\\#')
      .replace(/\$/g, '\\$')
      .replace(/%/g, '\\%')
      .replace(/&/g, '\\&')
      .replace(/_/g, '\\_')
      .replace(/\^/g, '\\textasciicircum')
      .replace(/{/g, '\\{')
      .replace(/}/g, '\\}')
      .replace(/~/g, '\\textasciitilde');
  }

  static gerarTabelaEstatisticas(dados: any[]): LatexTable {
    if (!dados || dados.length === 0) {
      return {
        id: 'stats_vazia',
        titulo: 'Estatísticas Descritivas',
        colunas: ['Variável', 'N', 'Média', 'DP', 'Min', 'Max'],
        dados: [['Sem dados disponíveis', '-', '-', '-', '-', '-']],
        caption: 'Estatísticas descritivas das variáveis analisadas'
      };
    }

    const colunas = ['Variável', 'N', 'Média', 'DP', 'Min', 'Max'];
    const linhas = dados.map(item => [
      this.escaparTextoLatex(item.variavel || 'N/A'),
      (item.n || 0).toString(),
      (item.media || 0).toFixed(2),
      (item.desvio || 0).toFixed(2),
      (item.minimo || 0).toFixed(2),
      (item.maximo || 0).toFixed(2)
    ]);

    return {
      id: 'estatisticas_descritivas',
      titulo: 'Estatísticas Descritivas',
      colunas,
      dados: linhas,
      caption: 'Estatísticas descritivas das principais variáveis do estudo'
    };
  }

  static gerarTabelaCorrelacao(correlacoes: any[]): LatexTable {
    if (!correlacoes || correlacoes.length === 0) {
      return {
        id: 'corr_vazia',
        titulo: 'Matriz de Correlação',
        colunas: ['Variável 1', 'Variável 2', 'Correlação', 'p-valor'],
        dados: [['Sem dados disponíveis', '-', '-', '-']],
        caption: 'Matriz de correlação entre as variáveis'
      };
    }

    const colunas = ['Variável 1', 'Variável 2', 'Correlação', 'p-valor', 'Interpretação'];
    const linhas = correlacoes.map(item => [
      this.escaparTextoLatex(item.var1 || 'N/A'),
      this.escaparTextoLatex(item.var2 || 'N/A'),
      (item.correlacao || 0).toFixed(3),
      item.pvalor ? (item.pvalor < 0.001 ? '<0.001' : item.pvalor.toFixed(3)) : 'N/A',
      this.interpretarCorrelacao(item.correlacao || 0)
    ]);

    return {
      id: 'matriz_correlacao',
      titulo: 'Matriz de Correlação',
      colunas,
      dados: linhas,
      caption: 'Correlações significativas entre as variáveis do estudo'
    };
  }

  static interpretarCorrelacao(r: number): string {
    const absR = Math.abs(r);
    let forca = '';
    
    if (absR >= 0.9) forca = 'muito forte';
    else if (absR >= 0.7) forca = 'forte';
    else if (absR >= 0.5) forca = 'moderada';
    else if (absR >= 0.3) forca = 'fraca';
    else forca = 'muito fraca';
    
    const direcao = r > 0 ? 'positiva' : 'negativa';
    return `${forca} ${direcao}`;
  }

  static downloadLatex(conteudo: string, nomeArquivo: string = 'documento'): void {
    const blob = new Blob([conteudo], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${nomeArquivo}.tex`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  static gerarRelatorioCompleto(dados: any): string {
    const documento: LatexDocument = {
      titulo: dados.titulo || 'Relatório de Análise de Dados',
      autor: dados.autor || 'DataScience Pro',
      resumo: dados.resumo || 'Este relatório apresenta uma análise abrangente dos dados coletados, utilizando métodos estatísticos avançados para identificar padrões e relações significativas.',
      introducao: dados.introducao || 'A análise de dados é fundamental para a tomada de decisões baseada em evidências. Este estudo aplicou técnicas estatísticas modernas para extrair insights valiosos dos dados disponíveis.',
      metodologia: dados.metodologia || 'Foram utilizados métodos estatísticos descritivos e inferenciais, incluindo análise de correlação, testes de hipóteses e modelos de regressão.',
      resultados: dados.resultados || 'Os resultados indicam relações significativas entre as variáveis analisadas, conforme apresentado nas tabelas e figuras a seguir.',
      conclusao: dados.conclusao || 'A análise revelou padrões importantes nos dados, fornecendo base sólida para futuras decisões e pesquisas.',
      referencias: dados.referencias || [
        'R Core Team (2023). R: A language and environment for statistical computing. R Foundation for Statistical Computing, Vienna, Austria.',
        'Wickham, H. (2016). ggplot2: Elegant Graphics for Data Analysis. Springer-Verlag New York.',
        'McKinney, W. (2010). Data Structures for Statistical Computing in Python. Proceedings of the 9th Python in Science Conference.'
      ],
      tabelas: dados.tabelas || [],
      figuras: dados.figuras || []
    };

    return this.gerarDocumentoCompleto(documento);
  }
}
