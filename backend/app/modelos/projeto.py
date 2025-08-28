"""
Modelo de Projeto
"""

from sqlalchemy import Column, Integer, String, DateTime, Text, ForeignKey, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database.conexao import Base

class Projeto(Base):
    __tablename__ = "projetos"
    
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(200), nullable=False)
    descricao = Column(Text)
    usuario_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)
    ativo = Column(Boolean, default=True)
    data_criacao = Column(DateTime(timezone=True), server_default=func.now())
    data_atualizacao = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relacionamentos
    usuario = relationship("Usuario", back_populates="projetos")
    datasets = relationship("Dataset", back_populates="projeto")
    analises = relationship("Analise", back_populates="projeto")
    
    def __repr__(self):
        return f"<Projeto(nome='{self.nome}', usuario_id={self.usuario_id})>"
