#!/bin/bash

# Pelada Fácil - Servidor em Background
# Mantém o servidor rodando mesmo após fechar o terminal

echo "🚀 Iniciando Pelada Fácil em background..."

# Verifica se já está rodando
if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "⚠️  Servidor já está rodando na porta 8000!"
    echo ""
    echo "Acesse: http://localhost:8000"
    echo ""
    echo "Para parar: ./stop-server.sh"
    exit 0
fi

# Navega para o diretório
cd /home/user/Pelada-f-cil

# Inicia em background com nohup
nohup python3 -m http.server 8000 > server.log 2>&1 &

# Salva o PID
echo $! > server.pid

echo ""
echo "✅ Servidor iniciado em background!"
echo ""
echo "┌─────────────────────────────────────────┐"
echo "│  🎉 PELADA FÁCIL RODANDO!              │"
echo "│                                         │"
echo "│  Acesse no navegador:                   │"
echo "│  👉 http://localhost:8000              │"
echo "│                                         │"
echo "│  O servidor continua rodando mesmo      │"
echo "│  se você fechar o terminal!             │"
echo "│                                         │"
echo "│  Para parar: ./stop-server.sh          │"
echo "│  Ver logs:   tail -f server.log        │"
echo "└─────────────────────────────────────────┘"
echo ""
