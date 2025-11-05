# 🔐 Credenciais de Acesso - Pelada Fácil

## 📋 Credenciais de Teste

Use estas credenciais para fazer login no sistema:

---

### 👑 **SUPER ADMINISTRADOR**

**Email:** `admin@peladafacil.com`
**Senha:** `admin123`

**Acesso:** Dashboard completo de administração
- Aprovar/rejeitar quadras
- Gerenciar usuários
- Ver denúncias
- Estatísticas gerais
- Controle total da plataforma

---

### 🏟️ **DONO DE QUADRA**

**Email:** `quadra@demo.com`
**Senha:** `quadra123`

**Acesso:** Dashboard de gestão de quadra
- Gerenciar agenda e reservas
- Ver receitas e estatísticas
- Responder avaliações
- Bloquear/desbloquear horários
- Controle financeiro

---

### 👤 **JOGADOR/USUÁRIO**

**Email:** `jogador@demo.com`
**Senha:** `jogador123`

**Acesso:** Dashboard do usuário
- Buscar quadras próximas
- Ver próximas peladas
- Encontrar jogadores
- Ver estatísticas pessoais
- Confirmar presença em jogos

---

## 🚀 Acesso Rápido

### Opção 1: Login Manual
1. Acesse: `http://localhost:8000/login.html`
2. Digite o email e senha de qualquer perfil acima
3. Clique em "Entrar"

### Opção 2: Login Rápido (Recomendado)
1. Acesse: `http://localhost:8000/login.html`
2. Clique em um dos botões:
   - 👤 **Jogador** → Acesso imediato ao dashboard do usuário
   - 🏟️ **Dono Quadra** → Acesso imediato ao dashboard da quadra
   - 👑 **Admin** → Acesso imediato ao dashboard admin

---

## 📝 Cadastro

Para criar uma nova conta:
1. Clique em "Cadastre-se grátis"
2. Preencha todos os campos
3. Escolha o tipo de conta:
   - **Jogador** → Dashboard do usuário
   - **Dono de Quadra/Campo** → Dashboard de gestão
   - **Organizador de Eventos** → Dashboard do usuário
4. Crie uma senha com pelo menos 6 caracteres
5. Aceite os termos de uso

**Nota:** Emails já cadastrados (admin, quadra, jogador) não podem ser usados novamente.

---

## ⚠️ Importante

- As senhas são **case-sensitive** (diferenciam maiúsculas/minúsculas)
- Os emails são convertidos automaticamente para minúsculas
- Se você já estiver logado, será redirecionado automaticamente
- Use "Sair" no menu lateral para fazer logout

---

## 🔒 Segurança

**ATENÇÃO:** Estas são credenciais de teste/demonstração.

Em produção:
- ❌ NUNCA armazene senhas em texto plano
- ✅ Use hash de senha (bcrypt, argon2)
- ✅ Implemente autenticação JWT
- ✅ Use HTTPS sempre
- ✅ Adicione 2FA para admins
- ✅ Implemente rate limiting
- ✅ Valide dados no backend

---

## 🎯 Como Limpar a Sessão

Se precisar fazer logout forçado:

### Opção 1: Pelo Dashboard
Clique no botão "Sair" na sidebar

### Opção 2: Console do Navegador
1. Pressione `F12` para abrir DevTools
2. Vá na aba "Console"
3. Digite:
```javascript
localStorage.clear();
location.reload();
```

### Opção 3: Manualmente
1. Pressione `F12` → aba "Application"
2. Clique em "Local Storage" → seu site
3. Clique no botão "Clear All"
4. Recarregue a página (F5)

---

## 💡 Dicas

1. **Primeira vez?** Use os botões de login rápido!
2. **Testando validação?** Tente senha errada e veja o erro
3. **Explorando?** Entre com cada perfil para ver as diferenças
4. **Console?** Pressione F12 e veja as credenciais no console

---

## 📞 Suporte

Problemas com login?
- Verifique se o servidor está rodando
- Limpe o cache (Ctrl + F5)
- Verifique o console (F12) por erros
- Certifique-se de usar email e senha corretos

---

**Desenvolvido com 🔒 segurança (demo) e ⚽ paixão pelo esporte!**
