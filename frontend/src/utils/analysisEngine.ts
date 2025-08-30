// Sistema avançado de análise automática de dados
export interface AnalysisResult {
  descriptive: {
    summary: Record<string, any>;
    outliers: any[];
    distributions: Record<string, any>;
    correlations: Record<string, number>;
  };
  temporal?: {
    trends: any[];
    seasonality: any[];
    forecasts: any[];
  };
  multivariate?: {
    clusters: any[];
    pca: any[];
    factors: any[];
  };
  ml?: {
    models: any[];
    predictions: any[];
    evaluation: Record<string, number>;
  };
}

export interface DataQuality {
  completeness: number;
  consistency: number;
  accuracy: number;
  timeliness: number;
  validity: number;
  overall: 'Excelente' | 'Boa' | 'Regular' | 'Ruim';
  issues: string[];
  recommendations: string[];
}

class AnalysisEngine {
  // Análise de qualidade dos dados
  async assessDataQuality(data: any[]): Promise<DataQuality> {
    if (!data || data.length === 0) {
      return {
        completeness: 0,
        consistency: 0,
        accuracy: 0,
        timeliness: 0,
        validity: 0,
        overall: 'Ruim',
        issues: ['Dataset vazio'],
        recommendations: ['Carregue dados válidos']
      };
    }

    const issues: string[] = [];
    const recommendations: string[] = [];
    
    // Análise de completude
    const totalCells = data.length * Object.keys(data[0]).length;
    const emptyCells = data.reduce((acc, row) => {
      return acc + Object.values(row).filter(val => 
        val === null || val === undefined || val === '' || val === 'N/A'
      ).length;
    }, 0);
    
    const completeness = ((totalCells - emptyCells) / totalCells) * 100;
    
    if (completeness < 80) {
      issues.push(`${(100 - completeness).toFixed(1)}% de dados faltantes`);
      recommendations.push('Considere técnicas de imputação ou coleta adicional');
    }

    // Análise de consistência
    const numericColumns = this.getNumericColumns(data);
    let consistencyScore = 100;
    
    numericColumns.forEach(col => {
      const values = data.map(row => row[col]).filter(val => val !== null && val !== undefined);
      const mean = values.reduce((a, b) => a + Number(b), 0) / values.length;
      const std = Math.sqrt(values.reduce((acc, val) => acc + Math.pow(Number(val) - mean, 2), 0) / values.length);
      
      // Detectar outliers extremos (3 desvios padrão)
      const outliers = values.filter(val => Math.abs(Number(val) - mean) > 3 * std);
      if (outliers.length > values.length * 0.05) {
        consistencyScore -= 10;
        issues.push(`Coluna ${col}: ${outliers.length} outliers extremos detectados`);
      }
    });

    // Análise de validade
    let validityScore = 100;
    const dateColumns = this.getDateColumns(data);
    
    dateColumns.forEach(col => {
      const invalidDates = data.filter(row => {
        const date = new Date(row[col]);
        return isNaN(date.getTime());
      }).length;
      
      if (invalidDates > 0) {
        validityScore -= (invalidDates / data.length) * 100;
        issues.push(`Coluna ${col}: ${invalidDates} datas inválidas`);
      }
    });

    // Análise de tempo (freshness)
    let timelinessScore = 100;
    const lastUpdate = this.findMostRecentDate(data);
    if (lastUpdate) {
      const daysSinceUpdate = (Date.now() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSinceUpdate > 30) {
        timelinessScore = Math.max(0, 100 - daysSinceUpdate);
        issues.push(`Dados podem estar desatualizados (${Math.floor(daysSinceUpdate)} dias)`);
      }
    }

    // Score geral
    const overallScore = (completeness + consistencyScore + validityScore + timelinessScore) / 4;
    let overall: 'Excelente' | 'Boa' | 'Regular' | 'Ruim';
    
    if (overallScore >= 90) overall = 'Excelente';
    else if (overallScore >= 75) overall = 'Boa';
    else if (overallScore >= 60) overall = 'Regular';
    else overall = 'Ruim';

    // Recomendações gerais
    if (overall === 'Regular' || overall === 'Ruim') {
      recommendations.push('Execute limpeza de dados antes da análise');
      recommendations.push('Considere validação manual dos resultados');
    }

    return {
      completeness: Math.round(completeness),
      consistency: Math.round(consistencyScore),
      accuracy: Math.round(validityScore), // Simplificado
      timeliness: Math.round(timelinessScore),
      validity: Math.round(validityScore),
      overall,
      issues,
      recommendations
    };
  }

  // Análise descritiva automática
  async performDescriptiveAnalysis(data: any[]): Promise<any> {
    const numericColumns = this.getNumericColumns(data);
    const categoricalColumns = this.getCategoricalColumns(data);
    
    const summary: Record<string, any> = {};
    const outliers: any[] = [];
    const distributions: Record<string, any> = {};
    const correlations: Record<string, number> = {};

    // Estatísticas para colunas numéricas
    numericColumns.forEach(col => {
      const values = data.map(row => Number(row[col])).filter(val => !isNaN(val));
      
      if (values.length > 0) {
        const sorted = values.sort((a, b) => a - b);
        const mean = values.reduce((a, b) => a + b, 0) / values.length;
        const variance = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length;
        const std = Math.sqrt(variance);
        
        summary[col] = {
          count: values.length,
          mean: Number(mean.toFixed(2)),
          median: this.getMedian(sorted),
          mode: this.getMode(values),
          std: Number(std.toFixed(2)),
          min: Math.min(...values),
          max: Math.max(...values),
          q1: this.getPercentile(sorted, 25),
          q3: this.getPercentile(sorted, 75),
          skewness: this.calculateSkewness(values, mean, std),
          kurtosis: this.calculateKurtosis(values, mean, std)
        };

        // Detectar outliers (método IQR)
        const iqr = summary[col].q3 - summary[col].q1;
        const lowerBound = summary[col].q1 - 1.5 * iqr;
        const upperBound = summary[col].q3 + 1.5 * iqr;
        
        const colOutliers = data
          .map((row, index) => ({ index, value: Number(row[col]), row }))
          .filter(item => !isNaN(item.value) && (item.value < lowerBound || item.value > upperBound));
        
        if (colOutliers.length > 0) {
          outliers.push({
            column: col,
            count: colOutliers.length,
            percentage: (colOutliers.length / values.length * 100).toFixed(1),
            outliers: colOutliers.slice(0, 10) // Primeiros 10
          });
        }

        // Análise de distribuição
        distributions[col] = {
          type: this.detectDistributionType(values),
          normality: this.testNormality(values),
          histogram: this.createHistogram(values, 10)
        };
      }
    });

    // Estatísticas para colunas categóricas
    categoricalColumns.forEach(col => {
      const values = data.map(row => row[col]).filter(val => val !== null && val !== undefined);
      const frequencies = this.getFrequencies(values);
      
      summary[col] = {
        count: values.length,
        unique: Object.keys(frequencies).length,
        mode: Object.keys(frequencies).reduce((a, b) => frequencies[a] > frequencies[b] ? a : b),
        frequencies: Object.entries(frequencies)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 10) // Top 10
          .reduce((obj, [key, val]) => ({ ...obj, [key]: val }), {})
      };
    });

    // Matriz de correlação (apenas numéricas)
    if (numericColumns.length > 1) {
      for (let i = 0; i < numericColumns.length; i++) {
        for (let j = i + 1; j < numericColumns.length; j++) {
          const col1 = numericColumns[i];
          const col2 = numericColumns[j];
          const corr = this.calculateCorrelation(data, col1, col2);
          if (!isNaN(corr)) {
            correlations[`${col1}_${col2}`] = Number(corr.toFixed(3));
          }
        }
      }
    }

    return { summary, outliers, distributions, correlations };
  }

  // Análise temporal
  async performTemporalAnalysis(data: any[]): Promise<any> {
    const dateColumns = this.getDateColumns(data);
    const numericColumns = this.getNumericColumns(data);
    
    if (dateColumns.length === 0) {
      return { error: 'Nenhuma coluna de data encontrada para análise temporal' };
    }

    const trends: any[] = [];
    const seasonality: any[] = [];
    const forecasts: any[] = [];

    // Analisar cada combinação data-numérica
    for (const dateCol of dateColumns) {
      for (const numCol of numericColumns) {
        const timeSeries = data
          .map(row => ({
            date: new Date(row[dateCol]),
            value: Number(row[numCol])
          }))
          .filter(item => !isNaN(item.date.getTime()) && !isNaN(item.value))
          .sort((a, b) => a.date.getTime() - b.date.getTime());

        if (timeSeries.length > 10) {
          // Detectar tendência
          const trend = this.detectTrend(timeSeries);
          trends.push({
            dateColumn: dateCol,
            valueColumn: numCol,
            ...trend
          });

          // Detectar sazonalidade (simplificada)
          const seasonal = this.detectSeasonality(timeSeries);
          seasonality.push({
            dateColumn: dateCol,
            valueColumn: numCol,
            ...seasonal
          });

          // Previsão simples (média móvel)
          const forecast = this.simpleForecasting(timeSeries, 5);
          forecasts.push({
            dateColumn: dateCol,
            valueColumn: numCol,
            predictions: forecast
          });
        }
      }
    }

    return { trends, seasonality, forecasts };
  }

  // Análise multivariada
  async performMultivariateAnalysis(data: any[]): Promise<any> {
    const numericColumns = this.getNumericColumns(data);
    
    if (numericColumns.length < 2) {
      return { error: 'Necessário pelo menos 2 colunas numéricas para análise multivariada' };
    }

    // Clustering K-means simplificado
    const clusters = await this.performClustering(data, numericColumns, 3);
    
    // PCA simplificado
    const pca = await this.performPCA(data, numericColumns);
    
    // Análise fatorial básica
    const factors = await this.performFactorAnalysis(data, numericColumns);

    return { clusters, pca, factors };
  }

  // Métodos auxiliares
  private getNumericColumns(data: any[]): string[] {
    if (data.length === 0) return [];
    
    return Object.keys(data[0]).filter(col => {
      const sample = data.slice(0, 10).map(row => row[col]);
      return sample.every(val => val === null || val === undefined || !isNaN(Number(val)));
    });
  }

  private getCategoricalColumns(data: any[]): string[] {
    if (data.length === 0) return [];
    
    return Object.keys(data[0]).filter(col => {
      const sample = data.slice(0, 10).map(row => row[col]);
      return !sample.every(val => val === null || val === undefined || !isNaN(Number(val)));
    });
  }

  private getDateColumns(data: any[]): string[] {
    if (data.length === 0) return [];
    
    return Object.keys(data[0]).filter(col => {
      const sample = data.slice(0, 10).map(row => row[col]);
      return sample.some(val => {
        if (!val) return false;
        const date = new Date(val);
        return !isNaN(date.getTime()) && val.toString().match(/\d{4}-\d{2}-\d{2}|\d{2}\/\d{2}\/\d{4}/);
      });
    });
  }

  private findMostRecentDate(data: any[]): Date | null {
    const dateColumns = this.getDateColumns(data);
    if (dateColumns.length === 0) return null;

    let mostRecent: Date | null = null;
    
    dateColumns.forEach(col => {
      data.forEach(row => {
        const date = new Date(row[col]);
        if (!isNaN(date.getTime()) && (!mostRecent || date > mostRecent)) {
          mostRecent = date;
        }
      });
    });

    return mostRecent;
  }

  private getMedian(sortedArray: number[]): number {
    const mid = Math.floor(sortedArray.length / 2);
    return sortedArray.length % 2 === 0 
      ? (sortedArray[mid - 1] + sortedArray[mid]) / 2 
      : sortedArray[mid];
  }

  private getMode(values: number[]): number {
    const frequencies = this.getFrequencies(values);
    return Number(Object.keys(frequencies).reduce((a, b) => frequencies[a] > frequencies[b] ? a : b));
  }

  private getPercentile(sortedArray: number[], percentile: number): number {
    const index = (percentile / 100) * (sortedArray.length - 1);
    if (Math.floor(index) === index) {
      return sortedArray[index];
    }
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    const weight = index - lower;
    return sortedArray[lower] * (1 - weight) + sortedArray[upper] * weight;
  }

  private getFrequencies(values: any[]): Record<string, number> {
    return values.reduce((acc, val) => {
      const key = String(val);
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }

  private calculateSkewness(values: number[], mean: number, std: number): number {
    const n = values.length;
    const skew = values.reduce((acc, val) => acc + Math.pow((val - mean) / std, 3), 0) / n;
    return Number(skew.toFixed(3));
  }

  private calculateKurtosis(values: number[], mean: number, std: number): number {
    const n = values.length;
    const kurt = values.reduce((acc, val) => acc + Math.pow((val - mean) / std, 4), 0) / n - 3;
    return Number(kurt.toFixed(3));
  }

  private calculateCorrelation(data: any[], col1: string, col2: string): number {
    const pairs = data
      .map(row => [Number(row[col1]), Number(row[col2])])
      .filter(([x, y]) => !isNaN(x) && !isNaN(y));

    if (pairs.length < 2) return NaN;

    const n = pairs.length;
    const sumX = pairs.reduce((sum, [x]) => sum + x, 0);
    const sumY = pairs.reduce((sum, [, y]) => sum + y, 0);
    const sumXY = pairs.reduce((sum, [x, y]) => sum + x * y, 0);
    const sumX2 = pairs.reduce((sum, [x]) => sum + x * x, 0);
    const sumY2 = pairs.reduce((sum, [, y]) => sum + y * y, 0);

    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

    return denominator === 0 ? 0 : numerator / denominator;
  }

  private detectDistributionType(values: number[]): string {
    const skewness = this.calculateSkewness(values, 
      values.reduce((a, b) => a + b, 0) / values.length,
      Math.sqrt(values.reduce((acc, val, _, arr) => 
        acc + Math.pow(val - arr.reduce((a, b) => a + b, 0) / arr.length, 2), 0) / values.length)
    );

    if (Math.abs(skewness) < 0.5) return 'Normal';
    else if (skewness > 0.5) return 'Assimétrica à direita';
    else return 'Assimétrica à esquerda';
  }

  private testNormality(values: number[]): { isNormal: boolean; confidence: number } {
    // Teste simplificado baseado em skewness e kurtosis
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const std = Math.sqrt(values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length);
    const skewness = Math.abs(this.calculateSkewness(values, mean, std));
    const kurtosis = Math.abs(this.calculateKurtosis(values, mean, std));
    
    const normalityScore = Math.max(0, 100 - (skewness * 30 + kurtosis * 20));
    
    return {
      isNormal: normalityScore > 70,
      confidence: Math.round(normalityScore)
    };
  }

  private createHistogram(values: number[], bins: number): any[] {
    const min = Math.min(...values);
    const max = Math.max(...values);
    const binWidth = (max - min) / bins;
    
    const histogram = Array(bins).fill(0);
    
    values.forEach(val => {
      const binIndex = Math.min(Math.floor((val - min) / binWidth), bins - 1);
      histogram[binIndex]++;
    });

    return histogram.map((count, index) => ({
      range: `${(min + index * binWidth).toFixed(1)}-${(min + (index + 1) * binWidth).toFixed(1)}`,
      count,
      frequency: (count / values.length * 100).toFixed(1)
    }));
  }

  private detectTrend(timeSeries: Array<{date: Date, value: number}>): any {
    if (timeSeries.length < 3) return { trend: 'Insuficiente', slope: 0 };

    // Regressão linear simples
    const x = timeSeries.map((_, i) => i);
    const y = timeSeries.map(item => item.value);
    
    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((acc, val, i) => acc + val * y[i], 0);
    const sumX2 = x.reduce((acc, val) => acc + val * val, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const r2 = this.calculateR2(x, y, slope);

    let trendType = 'Estável';
    if (Math.abs(slope) > 0.1) {
      trendType = slope > 0 ? 'Crescente' : 'Decrescente';
    }

    return {
      trend: trendType,
      slope: Number(slope.toFixed(4)),
      r2: Number(r2.toFixed(3)),
      strength: r2 > 0.7 ? 'Forte' : r2 > 0.4 ? 'Moderada' : 'Fraca'
    };
  }

  private calculateR2(x: number[], y: number[], slope: number): number {
    const yMean = y.reduce((a, b) => a + b, 0) / y.length;
    const intercept = yMean - slope * (x.reduce((a, b) => a + b, 0) / x.length);
    
    const ssRes = y.reduce((acc, val, i) => {
      const predicted = slope * x[i] + intercept;
      return acc + Math.pow(val - predicted, 2);
    }, 0);
    
    const ssTot = y.reduce((acc, val) => acc + Math.pow(val - yMean, 2), 0);
    
    return ssTot === 0 ? 1 : 1 - (ssRes / ssTot);
  }

  private detectSeasonality(timeSeries: Array<{date: Date, value: number}>): any {
    // Análise simplificada de sazonalidade mensal
    const monthlyData: Record<number, number[]> = {};
    
    timeSeries.forEach(item => {
      const month = item.date.getMonth();
      if (!monthlyData[month]) monthlyData[month] = [];
      monthlyData[month].push(item.value);
    });

    const monthlyAverages = Object.keys(monthlyData).map(month => ({
      month: parseInt(month),
      average: monthlyData[parseInt(month)].reduce((a, b) => a + b, 0) / monthlyData[parseInt(month)].length,
      count: monthlyData[parseInt(month)].length
    }));

    const overallMean = timeSeries.reduce((acc, item) => acc + item.value, 0) / timeSeries.length;
    const seasonalityStrength = monthlyAverages.reduce((max, item) => 
      Math.max(max, Math.abs(item.average - overallMean)), 0) / overallMean;

    return {
      hasSeasonality: seasonalityStrength > 0.1,
      strength: seasonalityStrength > 0.3 ? 'Forte' : seasonalityStrength > 0.1 ? 'Moderada' : 'Fraca',
      monthlyPattern: monthlyAverages
    };
  }

  private simpleForecasting(timeSeries: Array<{date: Date, value: number}>, periods: number): any[] {
    // Média móvel simples
    const windowSize = Math.min(12, Math.floor(timeSeries.length / 3));
    const recent = timeSeries.slice(-windowSize);
    const average = recent.reduce((acc, item) => acc + item.value, 0) / recent.length;
    
    const lastDate = timeSeries[timeSeries.length - 1].date;
    const predictions = [];
    
    for (let i = 1; i <= periods; i++) {
      const futureDate = new Date(lastDate);
      futureDate.setMonth(futureDate.getMonth() + i);
      
      predictions.push({
        date: futureDate,
        predicted: Number(average.toFixed(2)),
        confidence: 0.7 // Simplificado
      });
    }

    return predictions;
  }

  private async performClustering(data: any[], columns: string[], k: number): Promise<any> {
    // K-means simplificado
    const points = data.map(row => columns.map(col => Number(row[col])).filter(val => !isNaN(val)));
    const validPoints = points.filter(point => point.length === columns.length);
    
    if (validPoints.length < k) {
      return { error: 'Dados insuficientes para clustering' };
    }

    // Inicialização aleatória dos centroides
    const centroids = [];
    for (let i = 0; i < k; i++) {
      centroids.push(validPoints[Math.floor(Math.random() * validPoints.length)]);
    }

    // Iterações simplificadas
    for (let iter = 0; iter < 10; iter++) {
      const clusters = Array(k).fill(null).map(() => []);
      
      validPoints.forEach((point, index) => {
        let closestCentroid = 0;
        let minDistance = Infinity;
        
        centroids.forEach((centroid, i) => {
          const distance = this.euclideanDistance(point, centroid);
          if (distance < minDistance) {
            minDistance = distance;
            closestCentroid = i;
          }
        });
        
        clusters[closestCentroid].push({ point, originalIndex: index });
      });

      // Atualizar centroides
      clusters.forEach((cluster, i) => {
        if (cluster.length > 0) {
          centroids[i] = columns.map((_, colIndex) => 
            cluster.reduce((sum, item) => sum + item.point[colIndex], 0) / cluster.length
          );
        }
      });
    }

    return {
      centroids,
      clusterSizes: centroids.map((_, i) => 
        validPoints.filter(point => {
          let closestCentroid = 0;
          let minDistance = Infinity;
          
          centroids.forEach((centroid, j) => {
            const distance = this.euclideanDistance(point, centroid);
            if (distance < minDistance) {
              minDistance = distance;
              closestCentroid = j;
            }
          });
          
          return closestCentroid === i;
        }).length
      ),
      totalPoints: validPoints.length
    };
  }

  private euclideanDistance(point1: number[], point2: number[]): number {
    return Math.sqrt(
      point1.reduce((sum, val, i) => sum + Math.pow(val - point2[i], 2), 0)
    );
  }

  private async performPCA(data: any[], columns: string[]): Promise<any> {
    // PCA muito simplificado (apenas variância explicada)
    const matrix = data.map(row => columns.map(col => Number(row[col])).filter(val => !isNaN(val)));
    const validMatrix = matrix.filter(row => row.length === columns.length);
    
    if (validMatrix.length < 2) {
      return { error: 'Dados insuficientes para PCA' };
    }

    // Calcular variâncias por coluna
    const variances = columns.map((col, index) => {
      const values = validMatrix.map(row => row[index]);
      const mean = values.reduce((a, b) => a + b, 0) / values.length;
      const variance = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length;
      return { column: col, variance, contribution: 0 };
    });

    const totalVariance = variances.reduce((sum, item) => sum + item.variance, 0);
    variances.forEach(item => {
      item.contribution = (item.variance / totalVariance * 100);
    });

    return {
      components: variances.sort((a, b) => b.variance - a.variance),
      explainedVariance: variances.slice(0, 2).reduce((sum, item) => sum + item.contribution, 0)
    };
  }

  private async performFactorAnalysis(data: any[], columns: string[]): Promise<any> {
    // Análise fatorial muito simplificada
    const correlationMatrix: Record<string, Record<string, number>> = {};
    
    columns.forEach(col1 => {
      correlationMatrix[col1] = {};
      columns.forEach(col2 => {
        correlationMatrix[col1][col2] = this.calculateCorrelation(data, col1, col2);
      });
    });

    // Encontrar pares com alta correlação
    const highCorrelations = [];
    for (let i = 0; i < columns.length; i++) {
      for (let j = i + 1; j < columns.length; j++) {
        const corr = correlationMatrix[columns[i]][columns[j]];
        if (Math.abs(corr) > 0.5) {
          highCorrelations.push({
            variables: [columns[i], columns[j]],
            correlation: corr
          });
        }
      }
    }

    return {
      correlationMatrix,
      strongRelationships: highCorrelations.sort((a, b) => Math.abs(b.correlation) - Math.abs(a.correlation))
    };
  }
}

export const analysisEngine = new AnalysisEngine();
