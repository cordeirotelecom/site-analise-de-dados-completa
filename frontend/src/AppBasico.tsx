import { useState } from 'react';

const AppBasico = () => {
  const [mensagem, setMensagem] = useState('Site Funcionando!');

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#1976d2' }}>🎉 DataScience Pro - TESTE BÁSICO</h1>
      <h2>{mensagem}</h2>
      <p>Se você está vendo isto, o React está funcionando corretamente!</p>
      <button 
        onClick={() => setMensagem('Clique detectado! Tudo funcionando!')}
        style={{
          padding: '10px 20px',
          backgroundColor: '#1976d2',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        Testar Interatividade
      </button>
      
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '4px' }}>
        <h3>✅ Status do Sistema:</h3>
        <ul>
          <li>✅ React carregado</li>
          <li>✅ Estado funcionando</li>
          <li>✅ Eventos funcionando</li>
          <li>✅ CSS funcionando</li>
        </ul>
      </div>
    </div>
  );
};

export default AppBasico;
