/**
 * PELADA FÁCIL - AUTHENTICATION
 * Login & Registration System with Real Credentials
 */

// === CREDENCIAIS DE TESTE ===
const USERS = {
    'admin@peladafacil.com': {
        password: 'admin123',
        name: 'Admin Master',
        role: 'admin'
    },
    'quadra@demo.com': {
        password: 'quadra123',
        name: 'Arena Sport Center',
        role: 'court-admin'
    },
    'jogador@demo.com': {
        password: 'jogador123',
        name: 'João Silva',
        role: 'user'
    }
};

// === DOM ELEMENTS ===
const loginCard = document.getElementById('loginCard');
const registerCard = document.getElementById('registerCard');
const showRegisterLink = document.getElementById('showRegister');
const showLoginLink = document.getElementById('showLogin');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const quickBtns = document.querySelectorAll('.quick-btn');

// === PREVENT AUTO REDIRECT LOOP ===
let isRedirecting = false;

// === SWITCH BETWEEN LOGIN/REGISTER ===
if (showRegisterLink) {
    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginCard.classList.add('hidden');
        registerCard.classList.remove('hidden');
    });
}

if (showLoginLink) {
    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        registerCard.classList.add('hidden');
        loginCard.classList.remove('hidden');
    });
}

// === LOGIN FORM ===
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (isRedirecting) return; // Prevent double submission

        const email = document.getElementById('loginEmail').value.trim().toLowerCase();
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        // Show loading state
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Entrando...</span>';
        submitBtn.disabled = true;

        // Wait a bit for UX
        await new Promise(resolve => setTimeout(resolve, 800));

        // Validate credentials
        const user = USERS[email];

        if (!user || user.password !== password) {
            showNotification('❌ Email ou senha incorretos.', 'error');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            return;
        }

        // Success! Store login data
        isRedirecting = true;
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', user.name);
        localStorage.setItem('userRole', user.role);

        if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
        }

        // Success notification
        showNotification(`✅ Bem-vindo, ${user.name}!`, 'success');

        // Redirect after 1 second
        setTimeout(() => {
            redirectToDashboard(user.role);
        }, 1000);
    });
}

// === REGISTER FORM ===
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (isRedirecting) return; // Prevent double submission

        const name = document.getElementById('registerName').value.trim();
        const email = document.getElementById('registerEmail').value.trim().toLowerCase();
        const phone = document.getElementById('registerPhone').value.trim();
        const type = document.getElementById('registerType').value;
        const password = document.getElementById('registerPassword').value;
        const passwordConfirm = document.getElementById('registerPasswordConfirm').value;
        const acceptTerms = document.getElementById('acceptTerms').checked;

        // Validation
        if (!name || !email || !phone || !type || !password) {
            showNotification('❌ Preencha todos os campos.', 'error');
            return;
        }

        if (password !== passwordConfirm) {
            showNotification('❌ As senhas não coincidem.', 'error');
            return;
        }

        if (!acceptTerms) {
            showNotification('❌ Você precisa aceitar os termos de uso.', 'error');
            return;
        }

        if (password.length < 6) {
            showNotification('❌ A senha deve ter pelo menos 6 caracteres.', 'error');
            return;
        }

        // Check if email already exists
        if (USERS[email]) {
            showNotification('❌ Este email já está cadastrado. Faça login.', 'error');
            return;
        }

        // Show loading state
        const submitBtn = registerForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Criando conta...</span>';
        submitBtn.disabled = true;

        // Wait for UX
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Determine role based on type
        let role = 'user';
        if (type === 'court-owner') {
            role = 'court-admin';
        } else if (type === 'organizer') {
            role = 'user'; // Organizers use user dashboard for now
        }

        // Store registration data
        isRedirecting = true;
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', name);
        localStorage.setItem('userRole', role);

        // Success notification
        showNotification('🎉 Conta criada com sucesso!', 'success');

        // Redirect after 1.5 seconds
        setTimeout(() => {
            redirectToDashboard(role);
        }, 1500);
    });
}

// === QUICK LOGIN BUTTONS ===
quickBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();

        if (isRedirecting) return; // Prevent double click

        const role = btn.dataset.role;

        // Show loading
        btn.style.opacity = '0.5';
        btn.style.pointerEvents = 'none';

        // Set credentials based on role
        let userData = {};
        if (role === 'admin') {
            userData = USERS['admin@peladafacil.com'];
        } else if (role === 'court-admin') {
            userData = USERS['quadra@demo.com'];
        } else {
            userData = USERS['jogador@demo.com'];
        }

        // Store demo login
        isRedirecting = true;
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', role);
        localStorage.setItem('userName', userData.name);
        localStorage.setItem('userEmail', Object.keys(USERS).find(email => USERS[email].role === role));

        showNotification(`✅ Entrando como ${userData.name}...`, 'success');

        // Redirect based on role
        setTimeout(() => {
            redirectToDashboard(role);
        }, 800);
    });
});

// === UTILITY FUNCTIONS ===

// Redirect to appropriate dashboard
function redirectToDashboard(role) {
    if (role === 'admin') {
        window.location.href = 'dashboard-admin.html';
    } else if (role === 'court-admin') {
        window.location.href = 'dashboard-court.html';
    } else {
        window.location.href = 'dashboard-user.html';
    }
}

// Show notification
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

    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// === CHECK IF ALREADY LOGGED IN ===
// Only redirect if not already in the process of redirecting
window.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure page is fully loaded
    setTimeout(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const userRole = localStorage.getItem('userRole');

        // If on login page and already logged in, show message and redirect
        if (isLoggedIn === 'true' && window.location.pathname.includes('login.html') && !isRedirecting) {
            const userName = localStorage.getItem('userName') || 'Usuário';
            showNotification(`👋 Você já está logado como ${userName}!`, 'info');

            isRedirecting = true;
            setTimeout(() => {
                redirectToDashboard(userRole);
            }, 1500);
        }
    }, 100);
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
console.log('%c⚽ Pelada Fácil - Sistema de Autenticação', 'font-size: 16px; font-weight: bold; color: #00c853;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #00c853;');
console.log('%cCREDENCIAIS DE TESTE:', 'font-size: 14px; font-weight: bold; color: #0066ff;');
console.log('%c', '');
console.log('%c👑 SUPER ADMIN:', 'font-weight: bold; color: #ffd700;');
console.log('%c   Email: admin@peladafacil.com', 'color: #999;');
console.log('%c   Senha: admin123', 'color: #999;');
console.log('%c', '');
console.log('%c🏟️ DONO DE QUADRA:', 'font-weight: bold; color: #00c853;');
console.log('%c   Email: quadra@demo.com', 'color: #999;');
console.log('%c   Senha: quadra123', 'color: #999;');
console.log('%c', '');
console.log('%c👤 JOGADOR:', 'font-weight: bold; color: #0066ff;');
console.log('%c   Email: jogador@demo.com', 'color: #999;');
console.log('%c   Senha: jogador123', 'color: #999;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #00c853;');
console.log('%cOu use os botões de login rápido! 🚀', 'font-size: 12px; color: #00c853;');
