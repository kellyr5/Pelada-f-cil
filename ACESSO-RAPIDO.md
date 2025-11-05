# 🚀 ACESSO RÁPIDO - Pelada Fácil

## ✅ **O SERVIDOR JÁ ESTÁ RODANDO!**

Você **NÃO precisa fazer nada** para acessar!

---

## 🌐 **ACESSE AGORA (SEM BAIXAR NADA)**

Simplesmente abra no navegador:

```
http://localhost:8000
```

### **Páginas diretas:**
- 🏠 **Home:** `http://localhost:8000`
- 🔐 **Login:** `http://localhost:8000/login.html`
- 🧹 **Reset:** `http://localhost:8000/reset.html`
- 👑 **Admin:** `http://localhost:8000/dashboard-admin.html`
- 🏟️ **Quadra:** `http://localhost:8000/dashboard-court.html`
- 👤 **Jogador:** `http://localhost:8000/dashboard-user.html`

**É só clicar e usar!** 🎉

---

## 🔧 **GERENCIAR O SERVIDOR**

### **Ver Status:**
```bash
cd /home/user/Pelada-f-cil
./status-server.sh
```

### **Iniciar em Background:**
```bash
cd /home/user/Pelada-f-cil
./start-background.sh
```
✅ Servidor continua rodando mesmo se você fechar o terminal!

### **Parar:**
```bash
cd /home/user/Pelada-f-cil
./stop-server.sh
```

### **Ver Logs:**
```bash
cd /home/user/Pelada-f-cil
tail -f server.log
```

---

## 📱 **ACESSO MOBILE**

Descubra seu IP local:
```bash
hostname -I
```

No celular, acesse:
```
http://SEU_IP:8000
```

Exemplo: `http://192.168.1.100:8000`

---

## ⚡ **ATALHOS RÁPIDOS**

### **No Linux/Mac:**
Adicione ao seu `.bashrc` ou `.zshrc`:

```bash
alias pelada-start="cd /home/user/Pelada-f-cil && ./start-background.sh"
alias pelada-stop="cd /home/user/Pelada-f-cil && ./stop-server.sh"
alias pelada-status="cd /home/user/Pelada-f-cil && ./status-server.sh"
alias pelada-open="xdg-open http://localhost:8000/login.html"
```

Depois:
```bash
source ~/.bashrc
```

Agora use:
- `pelada-start` → Inicia servidor
- `pelada-stop` → Para servidor
- `pelada-status` → Ver status
- `pelada-open` → Abre no navegador

---

## 📁 **ESTRUTURA DE SCRIPTS**

| Script | Função |
|--------|--------|
| `start.sh` | Inicia servidor no terminal |
| `start-background.sh` | Inicia em background (continua após fechar terminal) |
| `stop-server.sh` | Para o servidor |
| `status-server.sh` | Verifica se está rodando |
| `start.bat` | Para Windows |

---

## 🔄 **REINICIAR APÓS ALTERAÇÕES**

Se você modificar arquivos HTML/CSS/JS:

**NÃO precisa reiniciar!** O servidor serve arquivos estáticos.

Apenas **recarregue a página** no navegador:
- `F5` ou `Ctrl + R` → Recarregar
- `Ctrl + F5` ou `Ctrl + Shift + R` → Recarregar forçado (limpa cache)

---

## 🆘 **RESOLVER PROBLEMAS**

### **Porta 8000 já está em uso:**
```bash
# Ver o que está usando a porta
lsof -i :8000

# Matar o processo
kill $(lsof -ti:8000)

# Ou use outra porta
python3 -m http.server 8080
# Acesse: http://localhost:8080
```

### **Servidor não inicia:**
```bash
# Verificar se Python está instalado
python3 --version

# Se não tiver, instale:
# Ubuntu/Debian: sudo apt install python3
# Mac: brew install python3
```

### **Não consigo acessar:**
```bash
# Verifique se o servidor está rodando
./status-server.sh

# Se não estiver, inicie
./start-background.sh

# Verifique firewall (se necessário)
sudo ufw allow 8000
```

---

## 💡 **DICAS**

1. **Marque como favorito:** `http://localhost:8000/login.html`
2. **Sempre use background:** `./start-background.sh`
3. **Verifique antes de iniciar:** `./status-server.sh`
4. **Logs úteis:** `tail -f server.log` mostra acessos em tempo real
5. **Mobile:** Use seu IP local para acessar do celular

---

## 📊 **COMANDOS ÚTEIS**

```bash
# Ver qual porta está sendo usada
netstat -tuln | grep 8000

# Ver todos os servidores Python rodando
ps aux | grep python

# Usar porta diferente
python3 -m http.server 3000

# Servidor com logs coloridos
python3 -m http.server 8000 --bind 0.0.0.0
```

---

## 🎯 **RESUMO**

| Ação | Como Fazer |
|------|------------|
| **Acessar** | Abra `http://localhost:8000` no navegador |
| **Verificar** | `./status-server.sh` |
| **Iniciar** | `./start-background.sh` |
| **Parar** | `./stop-server.sh` |
| **Ver Logs** | `tail -f server.log` |

---

## ✅ **CHECKLIST DIÁRIO**

- [ ] Servidor está rodando? → `./status-server.sh`
- [ ] Não está? → `./start-background.sh`
- [ ] Quer parar? → `./stop-server.sh`
- [ ] Quer acessar? → `http://localhost:8000/login.html`

---

## 🎉 **PRONTO!**

Seu servidor está rodando **24/7**!

**Acesse sempre:** `http://localhost:8000`

**Nunca mais precisa baixar ou instalar nada!** ✅

---

**Senha Admin:** `admin123`

**Dúvidas? Leia os outros guias:**
- `COMO-EXECUTAR.md` → Como rodar pela primeira vez
- `INSTRUCOES-LOGIN.md` → Como fazer login sem bugs
- `CREDENCIAIS.md` → Todas as senhas
- `GUIA-DASHBOARDS.md` → Como usar os dashboards
