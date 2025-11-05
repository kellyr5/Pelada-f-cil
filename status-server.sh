#!/bin/bash

# Pelada Fácil - Status do Servidor

echo "🔍 Verificando status do servidor..."
echo ""

# Verifica se está rodando na porta 8000
if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    PID=$(lsof -ti:8000)
    echo "✅ Servidor RODANDO!"
    echo ""
    echo "   PID: $PID"
    echo "   Porta: 8000"
    echo "   URL: http://localhost:8000"
    echo ""
    echo "   Para parar: ./stop-server.sh"
    echo "   Ver logs: tail -f server.log"
else
    echo "❌ Servidor NÃO está rodando"
    echo ""
    echo "   Para iniciar: ./start-background.sh"
fi

echo ""
