# 🎮 Guia dos Dashboards - Pelada Fácil

## 🚀 Acesso Rápido

Acesse: **`http://localhost:8000/login.html`**

---

## 👥 Tipos de Usuário

O sistema possui **3 tipos de usuário**, cada um com seu próprio dashboard:

### 1. 👤 **Jogador/Usuário Comum**
- Ver quadras e campos próximos
- Buscar jogadores disponíveis
- Confirmar presença em peladas
- Acompanhar estatísticas pessoais

### 2. 🏟️ **Dono de Quadra**
- Gerenciar agenda e reservas
- Controlar financeiro (receitas/despesas)
- Ver avaliações de clientes
- Bloquear/desbloquear horários

### 3. 👑 **Super Administrador**
- Aprovar/rejeitar novas quadras
- Gerenciar todos os usuários
- Monitorar denúncias
- Visualizar estatísticas gerais

---

## 🔐 Como Fazer Login

### Opção 1: Login Rápido (Testes)

Na página de login, use os **botões de login rápido**:

```
┌─────────────────────────────────────┐
│  👤 Jogador                         │
│  🏟️ Dono Quadra                    │
│  👑 Admin                           │
└─────────────────────────────────────┘
```

**Clique em qualquer um** e você será redirecionado automaticamente!

---

### Opção 2: Login Manual

Preencha o formulário:
- **Email:** qualquer@email.com
- **Senha:** qualquersenha

(Sistema em desenvolvimento - aceita qualquer credencial)

---

### Opção 3: Criar Conta

1. Clique em "Cadastre-se grátis"
2. Preencha os dados
3. Escolha o tipo de conta:
   - Jogador
   - Dono de Quadra/Campo
   - Organizador de Eventos
4. Clique em "Criar Conta Grátis"

---

## 🎯 Acessos Diretos

| Tipo | URL |
|------|-----|
| **Login** | `http://localhost:8000/login.html` |
| **Dashboard Jogador** | `http://localhost:8000/dashboard-user.html` |
| **Dashboard Quadra** | `http://localhost:8000/dashboard-court.html` |
| **Dashboard Admin** | `http://localhost:8000/dashboard-admin.html` |

---

## 📱 Dashboard do Jogador

### Estatísticas
- ⚽ Peladas jogadas
- 🏆 Títulos conquistados
- ⭐ Avaliação média
- 👥 Amigos na plataforma

### Próximas Peladas
- Ver peladas confirmadas
- Confirmar presença
- Detalhes de data/hora/local

### Quadras & Campos
- Filtrar por modalidade (Futebol, Vôlei, Basquete, etc)
- Ver distância e avaliações
- Verificar preços e horários
- Reservar horários

### Encontrar Jogadores
- Ver jogadores disponíveis próximos
- Filtrar por posição
- Ver avaliações
- Enviar convites

---

## 🏟️ Dashboard do Dono de Quadra

### Estatísticas Principais
- 💰 Receita do mês
- 📅 Número de reservas
- ⭐ Avaliação média
- 📈 Taxa de ocupação

### Agenda de Hoje
- Ver todos os horários
- Status das reservas:
  - 🟢 **Reservado** (pago)
  - 🟡 **Pendente** (aguardando pagamento)
  - 🔵 **Disponível** (livre para reserva)
  - 🔴 **Bloqueado** (manutenção)

### Ações Rápidas
- 📅 Bloquear horário
- 💵 Registrar pagamento
- 📸 Adicionar fotos
- 🎁 Criar promoção

### Reservas Recentes
- Lista completa de todas as reservas
- Informações do cliente
- Status do pagamento
- Enviar mensagens

### Avaliações
- Ver todas as avaliações recebidas
- Responder avaliações
- Monitorar satisfação dos clientes

---

## 👑 Dashboard do Super Admin

### Estatísticas Gerais
- 👥 Total de usuários ativos
- 🏟️ Quadras cadastradas
- ⚽ Partidas realizadas no mês
- 💰 Receita total da plataforma

### Aprovações Pendentes ⏳
As novas quadras precisam ser aprovadas antes de ficarem visíveis:

**Como aprovar:**
1. Veja os detalhes da quadra
2. Clique em:
   - ✅ **Aprovar** (quadra fica ativa)
   - 👁️ **Detalhes** (ver mais informações)
   - ❌ **Rejeitar** (recusar cadastro)

### Atividade Recente
- Novas aprovações
- Cadastros de usuários
- Pagamentos processados
- Denúncias recebidas

### Denúncias Abertas 🚨
Prioridades:
- 🔴 **Alta** (investigar imediatamente)
- 🟡 **Média** (analisar em breve)
- 🟢 **Baixa** (revisar quando possível)

### Gerenciamento
- Ver quadras mais populares
- Gerenciar usuários
- Bloquear usuários problemáticos
- Visualizar relatórios

---

## 🎨 Interface Visual

### Cores do Tema
- 🟢 **Verde**: Ações positivas, aprovações, sucesso
- 🔵 **Azul**: Informações, detalhes
- 🟡 **Amarelo**: Avisos, pendências
- 🔴 **Vermelho**: Alertas, rejeições, denúncias
- 🟣 **Roxo**: Estatísticas, dados especiais

### Ícones Emoji
O sistema usa emojis para tornar a interface mais descontraída:
- ⚽ Futebol
- 🏐 Vôlei
- 🏀 Basquete
- 🎾 Tênis
- 🏓 Padel
- 💰 Financeiro
- 📅 Agenda
- 👥 Usuários
- 🏆 Conquistas

---

## 🔔 Notificações

O sistema mostra notificações no canto superior direito:

- ✅ **Verde**: Sucesso (ação realizada)
- ❌ **Vermelho**: Erro (algo deu errado)
- ⚠️ **Amarelo**: Aviso (atenção necessária)
- ℹ️ **Azul**: Informação (feedback geral)

---

## ⌨️ Atalhos de Teclado

| Atalho | Ação |
|--------|------|
| `ESC` | Fechar sidebar (mobile) |
| `Ctrl + K` | Busca rápida (em desenvolvimento) |

---

## 📱 Responsividade

O sistema é **100% responsivo**:

### Desktop (> 1024px)
- Sidebar fixa à esquerda
- Layout em grid
- Hover effects

### Tablet (768px - 1024px)
- Sidebar retrátil
- Grid adaptativo
- Touch-friendly

### Mobile (< 768px)
- Menu hamburger
- Cards em coluna única
- Botões grandes para touch
- Swipe gestures

---

## 🎯 Funcionalidades Interativas

### Cards Animados
- Hover effect com elevação
- Transições suaves
- Feedback visual

### Botões
- Loading state ao clicar
- Confirmação visual
- Mudança de estado (ex: "Convidar" → "Convidado ✓")

### Tabelas
- Hover na linha
- Ações rápidas (ver, editar, deletar)
- Ordenação (em desenvolvimento)

### Filtros
- Tabs clicáveis
- Feedback visual ativo
- Atualização dinâmica

---

## 🚧 Em Desenvolvimento

Recursos que serão implementados:

- [ ] Busca avançada
- [ ] Filtros complexos
- [ ] Upload de imagens
- [ ] Chat em tempo real
- [ ] Notificações push
- [ ] Integração com pagamento
- [ ] API backend real
- [ ] Geolocalização real
- [ ] Mapas interativos

---

## 🐛 Resolução de Problemas

### "Não consigo fazer login"
✅ Use os botões de **Login Rápido** para testes

### "Dashboard não carrega"
✅ Verifique se o servidor está rodando em `localhost:8000`

### "Sidebar não abre no mobile"
✅ Clique no ícone do menu (☰) no canto superior esquerdo

### "Notificações não aparecem"
✅ Aguarde 1-2 segundos após a ação

### "CSS não carrega"
✅ Limpe o cache (Ctrl + F5)

---

## 💡 Dicas de Uso

1. **Teste todos os perfis**: Use login rápido para experimentar cada tipo de usuário

2. **Explore as animações**: Passe o mouse sobre cards e botões

3. **Use no mobile**: Abra no celular e teste a responsividade

4. **Teste aprovações**: Entre como admin e aprove/rejeite quadras

5. **Simule reservas**: Entre como usuário e reserve horários

6. **Gerencie agenda**: Entre como dono de quadra e veja a agenda

---

## 📞 Suporte

Problemas ou sugestões?
- 📧 Email: contato@peladafacil.com.br
- 🐛 Issues: GitHub
- 💬 Discord: [em breve]

---

## 🎉 Aproveite!

O sistema está pronto para testes! Explore todas as funcionalidades e veja como seria a experiência real do Pelada Fácil.

**Acesse agora:** `http://localhost:8000/login.html`

---

**Desenvolvido com ❤️ e ⚽ para revolucionar o esporte amador brasileiro!**
