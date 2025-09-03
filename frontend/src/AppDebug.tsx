import React from 'react';

const AppDebug: React.FC = () => {
  console.log('AppDebug renderizando...');
  
  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f0f0',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: 'red' }}>DEBUG: React está funcionando!</h1>
      <p>Se você está vendo isso, o React está renderizando corretamente.</p>
      <p>Timestamp: {new Date().toLocaleString()}</p>
    </div>
  );
};

export default AppDebug;
