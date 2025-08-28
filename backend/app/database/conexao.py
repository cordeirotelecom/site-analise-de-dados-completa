"""
Configuração de Conexão com Banco de Dados
"""

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

# URL do banco de dados
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "sqlite:///./datasciencepro.db"
)

# Criar engine do SQLAlchemy
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {})

# Criar SessionLocal
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base para modelos
Base = declarative_base()

async def inicializar_database():
    """
    Inicializa o banco de dados criando as tabelas
    """
    # Importar todos os modelos aqui para garantir que sejam criados
    from app.modelos import usuario, projeto, dataset, analise
    
    # Criar todas as tabelas
    Base.metadata.create_all(bind=engine)

def obter_db():
    """
    Dependency para obter sessão do banco de dados
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Alias para compatibilidade
def get_db():
    """Alias para obter_db para compatibilidade"""
    return obter_db()
