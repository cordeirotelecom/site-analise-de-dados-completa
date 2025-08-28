"""
Modelo de Dataset
"""

from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey, JSON, BigInteger
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database.conexao import Base

class Dataset(Base):
    __tablename__ = "datasets"
    
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(200), nullable=False)
    arquivo_original = Column(String(500), nullable=False)
    caminho_arquivo = Column(String(1000), nullable=False)
    tipo_arquivo = Column(String(50), nullable=False)  # csv, excel, json, etc.
    tamanho_arquivo = Column(BigInteger)  # em bytes
    num_linhas = Column(Integer)
    num_colunas = Column(Integer)
    colunas_info = Column(JSON)  # metadados das colunas
    projeto_id = Column(Integer, ForeignKey("projetos.id"), nullable=False)
    data_upload = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relacionamentos
    projeto = relationship("Projeto", back_populates="datasets")
    analises = relationship("Analise", back_populates="dataset")
    
    def __repr__(self):
        return f"<Dataset(nome='{self.nome}', linhas={self.num_linhas})>"
