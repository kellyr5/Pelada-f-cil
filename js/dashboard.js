// ==========================================
// PELADA FÁCIL - DASHBOARD
// Versão Ultra-Simples - SEM BUGS
// ==========================================

console.log('📊 Dashboard carregado');

// ==========================================
// VERIFICAÇÃO DE AUTENTICAÇÃO
// ==========================================

function checkAuth() {
    const userSession = sessionStorage.getItem('user');

    if (!userSession) {
        console.log('❌ Não autenticado - redirecionando...');
        window.location.href = 'login.html';
        return null;
    }

    console.log('✅ Usuário autenticado');
    return JSON.parse(userSession);
}

// ==========================================
// CARREGAR DADOS DO USUÁRIO
// ==========================================

function loadUserData() {
    const user = checkAuth();
    if (!user) return;

    console.log('👤 Carregando dados:', user.name);

    // Atualizar nome do usuário na sidebar
    const userNameElements = document.querySelectorAll('.user-name');
    userNameElements.forEach(el => {
        el.textContent = user.name;
    });

    // Atualizar título do topbar
    const topbarTitle = document.querySelector('.topbar__title');
    if (topbarTitle && topbarTitle.textContent.includes('Olá')) {
        topbarTitle.textContent = `Olá, ${user.name.split(' ')[0]}! 👋`;
    }
}

// ==========================================
// LOGOUT
// ==========================================

function handleLogout() {
    if (confirm('Tem certeza que deseja sair?')) {
        console.log('🚪 Fazendo logout...');
        sessionStorage.clear();
        window.location.href = 'index.html';
    }
}

// ==========================================
// SIDEBAR
// ==========================================

function initSidebar() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');
    const sidebarLinks = document.querySelectorAll('.sidebar__link');

    // Toggle menu mobile
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Fechar ao clicar fora
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 1024) {
                if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                    sidebar.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    }

    // Links da sidebar
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Logout
            if (this.classList.contains('sidebar__link--logout')) {
                e.preventDefault();
                handleLogout();
                return;
            }

            // Atualizar ativo
            sidebarLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // Fechar sidebar no mobile
            if (window.innerWidth <= 1024 && sidebar) {
                sidebar.classList.remove('active');
                if (menuToggle) menuToggle.classList.remove('active');
            }
        });
    });
}

// ==========================================
// INTERAÇÕES
// ==========================================

function initInteractions() {
    // Botões primários
    const primaryBtns = document.querySelectorAll('.btn--primary');
    primaryBtns.forEach(btn => {
        if (btn.type === 'submit') return;

        btn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Botão clicado:', this.textContent);
            showNotification('🚀 ' + this.textContent.trim(), 'info');
        });
    });

    // Filtros
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            showNotification('🔍 Filtrando: ' + this.textContent, 'info');
        });
    });

    // Aprovar
    const approveBtns = document.querySelectorAll('.btn--success');
    approveBtns.forEach(btn => {
        if (!btn.textContent.includes('Aprovar')) return;

        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.approval-card');
            const name = card?.querySelector('h3')?.textContent || 'Item';

            this.disabled = true;
            this.textContent = 'Aprovando...';

            setTimeout(() => {
                card.style.transition = 'all 0.3s';
                card.style.opacity = '0';
                setTimeout(() => {
                    card.remove();
                    showNotification('✅ ' + name + ' aprovado!', 'success');
                }, 300);
            }, 500);
        });
    });

    // Rejeitar
    const rejectBtns = document.querySelectorAll('.btn--danger');
    rejectBtns.forEach(btn => {
        if (!btn.textContent.includes('Rejeitar')) return;

        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.approval-card');
            const name = card?.querySelector('h3')?.textContent || 'Item';

            if (!confirm('Rejeitar "' + name + '"?')) return;

            this.disabled = true;
            setTimeout(() => {
                card.style.transition = 'all 0.3s';
                card.style.opacity = '0';
                setTimeout(() => {
                    card.remove();
                    showNotification('❌ ' + name + ' rejeitado', 'error');
                }, 300);
            }, 300);
        });
    });

    // Ações rápidas
    const quickActions = document.querySelectorAll('.quick-action-btn');
    quickActions.forEach(btn => {
        btn.addEventListener('click', function() {
            showNotification('🚀 ' + this.textContent.trim(), 'info');
        });
    });

    // Convites de jogadores
    const playerBtns = document.querySelectorAll('.player-card .btn');
    playerBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const name = this.closest('.player-card')?.querySelector('h4')?.textContent;
            this.textContent = 'Convidado ✓';
            this.classList.remove('btn--primary');
            this.classList.add('btn--success');
            this.disabled = true;
            showNotification('✅ Convite enviado para ' + name + '!', 'success');
        });
    });
}

// ==========================================
// NOTIFICAÇÃO
// ==========================================

function showNotification(message, type) {
    type = type || 'info';

    const existing = document.querySelector('.dash-notification');
    if (existing) existing.remove();

    const colors = {
        success: '#00c853',
        error: '#ff1744',
        warning: '#ffd600',
        info: '#0066ff'
    };

    const notif = document.createElement('div');
    notif.className = 'dash-notification';
    notif.textContent = message;
    notif.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        z-index: 99999;
        font-weight: 600;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notif);

    setTimeout(() => {
        notif.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

// ==========================================
// ANIMAÇÕES
// ==========================================

const animStyle = document.createElement('style');
animStyle.textContent = `
    @keyframes slideInRight {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideOutRight {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100px); }
    }
`;
document.head.appendChild(animStyle);

// ==========================================
// TECLAS DE ATALHO
// ==========================================

document.addEventListener('keydown', function(e) {
    // ESC fecha sidebar
    if (e.key === 'Escape') {
        const sidebar = document.querySelector('.sidebar');
        const toggle = document.getElementById('menuToggle');
        if (sidebar && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            if (toggle) toggle.classList.remove('active');
        }
    }
});

// ==========================================
// INICIALIZAÇÃO
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando dashboard...');

    // Verificar autenticação PRIMEIRO
    const user = checkAuth();
    if (!user) return; // Se não autenticado, já foi redirecionado

    // Carregar dados do usuário
    loadUserData();

    // Inicializar componentes
    initSidebar();
    initInteractions();

    console.log('✅ Dashboard pronto!');
});
