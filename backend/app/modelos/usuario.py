"""
Modelo de Usuário
"""

from sqlalchemy import Column, Integer, String, DateTime, Boolean
from sqlalchemy.sql import func
from app.database.conexao import Base

class Usuario(Base):
    __tablename__ = "usuarios"
    
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    senha_hash = Column(String(255), nullable=False)
    ativo = Column(Boolean, default=True)
    data_criacao = Column(DateTime(timezone=True), server_default=func.now())
    ultimo_acesso = Column(DateTime(timezone=True), onupdate=func.now())
    
    def __repr__(self):
        return f"<Usuario(nome='{self.nome}', email='{self.email}')>"
