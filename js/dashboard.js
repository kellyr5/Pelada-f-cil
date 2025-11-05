/**
 * PELADA FÁCIL - DASHBOARD
 * Sistema de dashboard SEM loops
 */

// === INITIALIZE ===
document.addEventListener('DOMContentLoaded', () => {
    checkAuthOnce();
    initSidebar();
    loadUserData();
    initInteractions();
});

// === AUTH CHECK (Only once, no redirects if logged in) ===
function checkAuthOnce() {
    const authUser = localStorage.getItem('auth_user');

    // If NOT logged in AND on a dashboard page, redirect to login
    if (!authUser && isDashboardPage()) {
        window.location.replace('login.html');
        return;
    }

    // If logged in, just continue (no redirect loop)
    if (authUser) {
        console.log('✅ User authenticated');
    }
}

function isDashboardPage() {
    const path = window.location.pathname;
    return path.includes('dashboard-');
}

// === LOAD USER DATA ===
function loadUserData() {
    const authUser = localStorage.getItem('auth_user');
    if (!authUser) return;

    try {
        const user = JSON.parse(authUser);

        // Update user name in sidebar
        const userNameEls = document.querySelectorAll('.user-name');
        userNameEls.forEach(el => el.textContent = user.name);

        // Update topbar title
        const topbarTitle = document.querySelector('.topbar__title');
        if (topbarTitle && topbarTitle.textContent.includes('Olá')) {
            topbarTitle.textContent = `Olá, ${user.name.split(' ')[0]}! 👋`;
        }
    } catch (e) {
        console.error('Error loading user data:', e);
    }
}

// === SIDEBAR ===
function initSidebar() {
    const toggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');
    const links = document.querySelectorAll('.sidebar__link');

    // Toggle sidebar
    if (toggle && sidebar) {
        toggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            toggle.classList.toggle('active');
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024) {
                if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
                    sidebar.classList.remove('active');
                    toggle.classList.remove('active');
                }
            }
        });
    }

    // Handle links
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.classList.contains('sidebar__link--logout')) {
                e.preventDefault();
                handleLogout();
                return;
            }

            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            if (window.innerWidth <= 1024) {
                sidebar?.classList.remove('active');
                toggle?.classList.remove('active');
            }
        });
    });
}

// === LOGOUT ===
function handleLogout() {
    if (confirm('Tem certeza que deseja sair?')) {
        localStorage.removeItem('auth_user');
        showMsg('👋 Você saiu com sucesso!', 'info');
        setTimeout(() => {
            window.location.replace('index.html');
        }, 500);
    }
}

// === INTERACTIONS ===
function initInteractions() {
    // Buttons
    document.querySelectorAll('.btn--primary').forEach(btn => {
        if (!btn.type || btn.type !== 'submit') {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const text = btn.textContent.trim();
                showMsg(`🚀 ${text} - Clicado!`, 'info');
            });
        }
    });

    // Filter tabs
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            showMsg(`🔍 Filtrando: ${tab.textContent}`, 'info');
        });
    });

    // Approval buttons
    document.querySelectorAll('.btn--success').forEach(btn => {
        if (btn.textContent.includes('Aprovar')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const card = btn.closest('.approval-card');
                const name = card?.querySelector('h3')?.textContent || 'Item';

                btn.disabled = true;
                btn.innerHTML = '<span>Aprovando...</span>';

                setTimeout(() => {
                    card.style.transition = 'all 0.3s';
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';

                    setTimeout(() => {
                        card.remove();
                        showMsg(`✅ ${name} aprovado!`, 'success');
                    }, 300);
                }, 500);
            });
        }
    });

    document.querySelectorAll('.btn--danger').forEach(btn => {
        if (btn.textContent.includes('Rejeitar')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const card = btn.closest('.approval-card');
                const name = card?.querySelector('h3')?.textContent || 'Item';

                if (confirm(`Rejeitar "${name}"?`)) {
                    btn.disabled = true;
                    setTimeout(() => {
                        card.style.transition = 'all 0.3s';
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.remove();
                            showMsg(`❌ ${name} rejeitado`, 'error');
                        }, 300);
                    }, 300);
                }
            });
        }
    });

    // Quick actions
    document.querySelectorAll('.quick-action-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            showMsg(`🚀 ${btn.textContent.trim()}`, 'info');
        });
    });

    // Player invites
    document.querySelectorAll('.player-card .btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const name = btn.closest('.player-card')?.querySelector('h4')?.textContent;
            btn.innerHTML = '<span>Convidado ✓</span>';
            btn.classList.remove('btn--primary');
            btn.classList.add('btn--success');
            btn.disabled = true;
            showMsg(`✅ Convite enviado para ${name}!`, 'success');
        });
    });
}

// === NOTIFICATION ===
function showMsg(msg, type) {
    const existing = document.querySelector('.msg-notification');
    if (existing) existing.remove();

    const colors = { success: '#00c853', error: '#ff1744', info: '#0066ff' };
    const div = document.createElement('div');
    div.className = 'msg-notification';
    div.textContent = msg;
    div.style.cssText = `
        position: fixed; top: 100px; right: 20px; z-index: 99999;
        background: ${colors[type]}; color: white; padding: 1rem 1.5rem;
        border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        font-weight: 600; animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 3000);
}

// === KEYBOARD ===
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const sidebar = document.querySelector('.sidebar');
        const toggle = document.getElementById('menuToggle');
        if (sidebar?.classList.contains('active')) {
            sidebar.classList.remove('active');
            toggle?.classList.remove('active');
        }
    }
});

// === RESPONSIVE ===
window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
        const sidebar = document.querySelector('.sidebar');
        const toggle = document.getElementById('menuToggle');
        sidebar?.classList.remove('active');
        toggle?.classList.remove('active');
    }
});

console.log('✅ Dashboard loaded');
