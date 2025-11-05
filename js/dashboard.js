/**
 * PELADA FÁCIL - DASHBOARD FUNCTIONALITY
 * Interactive dashboard features
 */

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    initSidebar();
    initFilters();
    initInteractiveElements();
    loadUserData();
});

// === AUTHENTICATION CHECK ===
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    // If not logged in and not on login page, redirect to login
    if (isLoggedIn !== 'true' && !window.location.pathname.includes('login.html') && !window.location.pathname.includes('index.html')) {
        window.location.href = 'login.html';
    }
}

// === LOAD USER DATA ===
function loadUserData() {
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');

    if (userName) {
        // Update user name in sidebar
        const userNameElements = document.querySelectorAll('.user-name');
        userNameElements.forEach(el => {
            el.textContent = userName;
        });

        // Update welcome message in topbar
        const topbarTitle = document.querySelector('.topbar__title');
        if (topbarTitle && topbarTitle.textContent.includes('Olá')) {
            topbarTitle.textContent = `Olá, ${userName.split(' ')[0]}! 👋`;
        }
    }
}

// === SIDEBAR FUNCTIONALITY ===
function initSidebar() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.querySelector('.sidebar');
    const sidebarLinks = document.querySelectorAll('.sidebar__link');

    // Toggle sidebar on mobile
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 1024) {
                if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                    sidebar.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            }
        });
    }

    // Handle sidebar link clicks
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Skip logout link
            if (link.classList.contains('sidebar__link--logout')) {
                e.preventDefault();
                handleLogout();
                return;
            }

            // Update active state
            sidebarLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Close sidebar on mobile after click
            if (window.innerWidth <= 1024) {
                sidebar?.classList.remove('active');
                menuToggle?.classList.remove('active');
            }
        });
    });
}

// === LOGOUT ===
function handleLogout() {
    // Show confirmation
    if (confirm('Tem certeza que deseja sair?')) {
        // Clear localStorage
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');

        // Show notification
        showNotification('👋 Você saiu com sucesso!', 'info');

        // Redirect to home after 1 second
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
}

// === FILTER TABS ===
function initFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active state
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Filter content (placeholder - implement actual filtering)
            const filterType = tab.textContent.trim();
            console.log('Filtering by:', filterType);

            // Show notification
            showNotification(`🔍 Filtrando por: ${filterType}`, 'info');
        });
    });
}

// === INTERACTIVE ELEMENTS ===
function initInteractiveElements() {
    // Button clicks
    initButtonClicks();

    // Stats animation on scroll
    initStatsAnimation();

    // Approval actions
    initApprovalActions();

    // Schedule interactions
    initScheduleActions();

    // Court interactions
    initCourtActions();

    // Player interactions
    initPlayerActions();
}

// === BUTTON CLICKS ===
function initButtonClicks() {
    // Primary buttons
    document.querySelectorAll('.btn--primary').forEach(btn => {
        if (!btn.dataset.initialized) {
            btn.dataset.initialized = 'true';
            btn.addEventListener('click', (e) => {
                if (!btn.type || btn.type !== 'submit') {
                    e.preventDefault();
                    handleAction(btn);
                }
            });
        }
    });

    // Quick action buttons
    document.querySelectorAll('.quick-action-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const actionName = btn.textContent.trim();
            showNotification(`🚀 ${actionName} - Em desenvolvimento!`, 'info');
        });
    });

    // Icon buttons
    document.querySelectorAll('.btn-icon[title]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const action = btn.getAttribute('title');
            showNotification(`👁️ ${action} - Em desenvolvimento!`, 'info');
        });
    });
}

// === HANDLE GENERIC ACTIONS ===
function handleAction(button) {
    const buttonText = button.textContent.trim();

    // Show loading state
    const originalHTML = button.innerHTML;
    button.innerHTML = '<span>Carregando...</span>';
    button.disabled = true;

    // Simulate action
    setTimeout(() => {
        button.innerHTML = originalHTML;
        button.disabled = false;

        if (buttonText.includes('Ver Horários') || buttonText.includes('Ver Detalhes')) {
            showNotification('📅 Abrindo detalhes...', 'info');
        } else if (buttonText.includes('Confirmar')) {
            showNotification('✅ Presença confirmada!', 'success');
        } else if (buttonText.includes('Convidar')) {
            showNotification('📧 Convite enviado!', 'success');
        } else {
            showNotification(`✓ ${buttonText} realizado!`, 'success');
        }
    }, 800);
}

// === STATS ANIMATION ===
function initStatsAnimation() {
    const statCards = document.querySelectorAll('.stat-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                const valueElement = entry.target.querySelector('.stat-card__value');
                if (valueElement) {
                    animateValue(valueElement);
                }
            }
        });
    }, { threshold: 0.5 });

    statCards.forEach(card => observer.observe(card));
}

function animateValue(element) {
    const text = element.textContent;
    const hasNumber = /\d/.test(text);

    if (!hasNumber) return;

    const number = parseFloat(text.replace(/[^\d.]/g, ''));
    const prefix = text.match(/^[^\d]*/)[0];
    const suffix = text.match(/[^\d]*$/)[0];

    const duration = 1500;
    const steps = 60;
    const stepValue = number / steps;
    const stepTime = duration / steps;
    let currentValue = 0;

    const interval = setInterval(() => {
        currentValue += stepValue;
        if (currentValue >= number) {
            element.textContent = prefix + number.toLocaleString('pt-BR') + suffix;
            clearInterval(interval);
        } else {
            element.textContent = prefix + Math.floor(currentValue).toLocaleString('pt-BR') + suffix;
        }
    }, stepTime);
}

// === APPROVAL ACTIONS ===
function initApprovalActions() {
    // Approve buttons
    document.querySelectorAll('.btn--success').forEach(btn => {
        if (btn.textContent.includes('Aprovar')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const card = btn.closest('.approval-card');
                const courtName = card?.querySelector('h3')?.textContent || 'Quadra';

                btn.innerHTML = '<span>Aprovando...</span>';
                btn.disabled = true;

                setTimeout(() => {
                    card.style.transition = 'all 0.3s ease';
                    card.style.transform = 'scale(0.9)';
                    card.style.opacity = '0';

                    setTimeout(() => {
                        card.remove();
                        showNotification(`✅ ${courtName} aprovada com sucesso!`, 'success');
                        updateApprovalCount(-1);
                    }, 300);
                }, 800);
            });
        }
    });

    // Reject buttons
    document.querySelectorAll('.btn--danger').forEach(btn => {
        if (btn.textContent.includes('Rejeitar')) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const card = btn.closest('.approval-card');
                const courtName = card?.querySelector('h3')?.textContent || 'Quadra';

                if (confirm(`Tem certeza que deseja rejeitar "${courtName}"?`)) {
                    btn.innerHTML = '<span>Rejeitando...</span>';
                    btn.disabled = true;

                    setTimeout(() => {
                        card.style.transition = 'all 0.3s ease';
                        card.style.transform = 'translateX(-100%)';
                        card.style.opacity = '0';

                        setTimeout(() => {
                            card.remove();
                            showNotification(`❌ ${courtName} rejeitada.`, 'error');
                            updateApprovalCount(-1);
                        }, 300);
                    }, 500);
                }
            });
        }
    });
}

function updateApprovalCount(delta) {
    const badge = document.querySelector('.sidebar__link .sidebar__badge-small');
    if (badge) {
        const currentCount = parseInt(badge.textContent) || 0;
        const newCount = Math.max(0, currentCount + delta);
        badge.textContent = newCount;

        if (newCount === 0) {
            badge.style.display = 'none';
        }
    }
}

// === SCHEDULE ACTIONS ===
function initScheduleActions() {
    const scheduleItems = document.querySelectorAll('.schedule-item');

    scheduleItems.forEach(item => {
        const reserveBtn = item.querySelector('.btn--primary');
        const confirmBtn = item.querySelector('.btn--warning');

        if (reserveBtn && reserveBtn.textContent.includes('Reservar')) {
            reserveBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const time = item.querySelector('.schedule-time')?.textContent;
                showNotification(`📅 Reservando horário: ${time}`, 'success');

                item.classList.remove('schedule-item--available');
                item.classList.add('schedule-item--booked');

                const info = item.querySelector('.schedule-info h4');
                if (info) info.innerHTML = '⚽ Futebol • Reservado';
            });
        }

        if (confirmBtn) {
            confirmBtn.addEventListener('click', (e) => {
                e.preventDefault();
                showNotification('✅ Pagamento confirmado!', 'success');

                item.classList.remove('schedule-item--pending');
                item.classList.add('schedule-item--booked');

                const badge = item.querySelector('.schedule-info h4');
                if (badge) badge.innerHTML = badge.innerHTML.replace('Pendente', 'Reservado');
            });
        }
    });
}

// === COURT ACTIONS ===
function initCourtActions() {
    const courtCards = document.querySelectorAll('.court-card');

    courtCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking on button
            if (e.target.closest('button')) return;

            const courtName = card.querySelector('h3')?.textContent;
            showNotification(`🏟️ Abrindo detalhes de: ${courtName}`, 'info');
        });
    });
}

// === PLAYER ACTIONS ===
function initPlayerActions() {
    document.querySelectorAll('.player-card .btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.player-card');
            const playerName = card?.querySelector('h4')?.textContent;

            if (btn.textContent.includes('Convidar')) {
                btn.innerHTML = '<span>Enviando...</span>';
                btn.disabled = true;

                setTimeout(() => {
                    btn.innerHTML = '<span>Convidado ✓</span>';
                    btn.classList.remove('btn--primary');
                    btn.classList.add('btn--success');
                    showNotification(`✅ Convite enviado para ${playerName}!`, 'success');
                }, 600);
            }
        });
    });
}

// === NOTIFICATIONS ===
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = message;

    // Add styles
    const colors = {
        success: '#00c853',
        error: '#ff1744',
        warning: '#ffd600',
        info: '#0066ff'
    };

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type] || colors.info};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        font-weight: 600;
        max-width: 400px;
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// === RESPONSIVE HANDLERS ===
window.addEventListener('resize', () => {
    const sidebar = document.querySelector('.sidebar');
    const menuToggle = document.getElementById('menuToggle');

    // Close sidebar on desktop
    if (window.innerWidth > 1024) {
        sidebar?.classList.remove('active');
        menuToggle?.classList.remove('active');
    }
});

// === KEYBOARD SHORTCUTS ===
document.addEventListener('keydown', (e) => {
    // ESC to close sidebar on mobile
    if (e.key === 'Escape') {
        const sidebar = document.querySelector('.sidebar');
        const menuToggle = document.getElementById('menuToggle');

        if (sidebar?.classList.contains('active')) {
            sidebar.classList.remove('active');
            menuToggle?.classList.remove('active');
        }
    }

    // Ctrl/Cmd + K for quick search (placeholder)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        showNotification('🔍 Busca rápida - Em desenvolvimento!', 'info');
    }
});

// === ANIMATIONS ===
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);

// === CONSOLE MESSAGE ===
console.log('%c⚽ Pelada Fácil - Dashboard', 'font-size: 16px; font-weight: bold; color: #00c853;');
console.log('%cDashboard carregado com sucesso!', 'font-size: 12px; color: #0066ff;');
console.log('%cAtalhos: ESC (fechar sidebar) | Ctrl+K (busca)', 'font-size: 10px; color: #999;');
