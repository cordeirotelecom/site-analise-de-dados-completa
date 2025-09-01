import React from 'react';

interface DataAnalysisProps {
  data: any;
}

const DataAnalysisPro: React.FC<DataAnalysisProps> = ({ data }) => {
  return (
    <div>
      <h2>DataAnalysis Pro Component</h2>
      <p>Status: {data ? 'Data Loaded' : 'Demo Mode'}</p>
    </div>
  );
};

export default DataAnalysisPro;
