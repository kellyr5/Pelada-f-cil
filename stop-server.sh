#!/bin/bash

# Pelada Fácil - Parar Servidor

echo "🛑 Parando servidor Pelada Fácil..."

# Verifica se existe PID salvo
if [ -f server.pid ]; then
    PID=$(cat server.pid)
    if ps -p $PID > /dev/null 2>&1; then
        kill $PID
        rm server.pid
        echo "✅ Servidor parado! (PID: $PID)"
    else
        echo "⚠️  Processo não encontrado"
        rm server.pid
    fi
else
    # Tenta encontrar o processo na porta 8000
    PID=$(lsof -ti:8000)
    if [ ! -z "$PID" ]; then
        kill $PID
        echo "✅ Servidor parado! (PID: $PID)"
    else
        echo "⚠️  Nenhum servidor rodando na porta 8000"
    fi
fi

echo ""
echo "Para iniciar novamente: ./start-background.sh"
echo ""
