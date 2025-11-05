#!/bin/bash

# Script para iniciar o servidor Pelada Fácil

echo "🚀 Iniciando Pelada Fácil..."
echo ""
echo "📁 Pasta atual: $(pwd)"
echo ""

# Verifica se o arquivo index.html existe
if [ ! -f "index.html" ]; then
    echo "❌ Erro: index.html não encontrado!"
    echo "   Certifique-se de estar na pasta correta."
    exit 1
fi

echo "✅ Arquivos encontrados!"
echo ""
echo "🌐 Iniciando servidor na porta 8000..."
echo ""
echo "┌─────────────────────────────────────────┐"
echo "│  🎉 SERVIDOR INICIADO COM SUCESSO!     │"
echo "│                                         │"
echo "│  Abra seu navegador e acesse:          │"
echo "│                                         │"
echo "│  👉 http://localhost:8000              │"
echo "│  👉 http://127.0.0.1:8000              │"
echo "│                                         │"
echo "│  Pressione Ctrl+C para parar           │"
echo "└─────────────────────────────────────────┘"
echo ""

# Tenta iniciar com Python 3
if command -v python3 &> /dev/null; then
    python3 -m http.server 8000
# Se não tiver Python 3, tenta Python 2
elif command -v python &> /dev/null; then
    python -m SimpleHTTPServer 8000
# Se não tiver Python, tenta PHP
elif command -v php &> /dev/null; then
    php -S localhost:8000
# Se não tiver nada, mostra erro
else
    echo "❌ Erro: Python ou PHP não encontrado!"
    echo ""
    echo "📦 Instale o Python:"
    echo "   - Ubuntu/Debian: sudo apt install python3"
    echo "   - MacOS: brew install python3"
    echo "   - Windows: https://www.python.org/downloads/"
    echo ""
    echo "Ou use o método alternativo abrindo index.html diretamente."
    exit 1
fi
