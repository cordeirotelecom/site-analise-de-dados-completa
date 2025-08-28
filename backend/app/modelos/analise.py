"""
Modelo de Análise
"""

from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey, JSON, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database.conexao import Base
import enum

class TipoAnalise(enum.Enum):
    DESCRITIVA = "descritiva"
    CORRELACAO = "correlacao"
    CLUSTERING = "clustering"
    CLASSIFICACAO = "classificacao"
    REGRESSAO = "regressao"
    SERIES_TEMPORAIS = "series_temporais"
    ANALISE_FATORIAL = "analise_fatorial"
    ANOVA = "anova"
    TESTE_HIPOTESE = "teste_hipotese"

class StatusAnalise(enum.Enum):
    PENDENTE = "pendente"
    PROCESSANDO = "processando"
    CONCLUIDA = "concluida"
    ERRO = "erro"

class Analise(Base):
    __tablename__ = "analises"
    
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(200), nullable=False)
    tipo = Column(Enum(TipoAnalise), nullable=False)
    status = Column(Enum(StatusAnalise), default=StatusAnalise.PENDENTE)
    parametros = Column(JSON)  # parâmetros da análise
    resultados = Column(JSON)  # resultados da análise
    graficos = Column(JSON)  # dados dos gráficos
    relatorio = Column(Text)  # relatório em markdown/html
    tempo_execucao = Column(Integer)  # em segundos
    projeto_id = Column(Integer, ForeignKey("projetos.id"), nullable=False)
    dataset_id = Column(Integer, ForeignKey("datasets.id"), nullable=False)
    data_criacao = Column(DateTime(timezone=True), server_default=func.now())
    data_conclusao = Column(DateTime(timezone=True))
    
    # Relacionamentos
    projeto = relationship("Projeto", back_populates="analises")
    dataset = relationship("Dataset", back_populates="analises")
    
    def __repr__(self):
        return f"<Analise(nome='{self.nome}', tipo={self.tipo.value})>"
