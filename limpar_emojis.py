#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para remover caracteres problemáticos dos arquivos TSX
Solução definitiva para problema de compilação JSX
"""

import re
import os

def remover_caracteres_problemáticos(arquivo):
    """Remove caracteres que causam problemas de compilação em JSX"""
    
    print(f"Processando arquivo: {arquivo}")
    
    # Ler o arquivo
    with open(arquivo, 'r', encoding='utf-8') as f:
        conteudo = f.read()
    
    # Substituições de caracteres problemáticos
    substituicoes = {
        'Único': 'Unico',
        'Saúde': 'Saude',
        'ção': 'cao',
        'ã': 'a',
        'õ': 'o',
        'ê': 'e',
        'â': 'a',
        'ô': 'o',
        'é': 'e',
        'í': 'i',
        'ó': 'o',
        'ú': 'u',
        'ç': 'c'
    }
    
    # Aplicar substituições
    conteudo_limpo = conteudo
    chars_removidos = 0
    
    for char_problema, char_limpo in substituicoes.items():
        if char_problema in conteudo_limpo:
            conteudo_limpo = conteudo_limpo.replace(char_problema, char_limpo)
            chars_removidos += 1
            print(f"  Substituído: {char_problema} -> {char_limpo}")
    
    # Salvar arquivo limpo
    with open(arquivo, 'w', encoding='utf-8') as f:
        f.write(conteudo_limpo)
    
    print(f"✓ Arquivo limpo! Total de caracteres processados: {chars_removidos}")
    return chars_removidos

if __name__ == "__main__":
    # Arquivo a ser processado
    arquivo_target = r"c:\Users\corde\OneDrive\Desktop\projeto_dados\frontend\src\components\DadosSantaCatarinaCompleto.tsx"
    
    if os.path.exists(arquivo_target):
        total_chars = remover_caracteres_problemáticos(arquivo_target)
        print(f"\n🎉 CONCLUÍDO! {total_chars} caracteres especiais removidos/substituídos.")
        print("Arquivo TSX agora deve compilar sem erros de caracteres especiais.")
    else:
        print(f"❌ Arquivo não encontrado: {arquivo_target}")
