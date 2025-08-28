"""
Configuração de Logging para DataScience Pro
"""

import logging
import sys
from logging.handlers import RotatingFileHandler
import os

def configurar_logging():
    """
    Configura o sistema de logging da aplicação
    """
    
    # Criar diretório de logs se não existir
    if not os.path.exists("logs"):
        os.makedirs("logs")
    
    # Configurar formato do log
    formato_log = logging.Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    
    # Configurar logger principal
    logger = logging.getLogger("datasciencepro")
    logger.setLevel(logging.INFO)
    
    # Handler para console
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setFormatter(formato_log)
    logger.addHandler(console_handler)
    
    # Handler para arquivo com rotação
    file_handler = RotatingFileHandler(
        "logs/app.log",
        maxBytes=10485760,  # 10MB
        backupCount=5
    )
    file_handler.setFormatter(formato_log)
    logger.addHandler(file_handler)
    
    return logger
