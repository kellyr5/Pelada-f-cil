/**
 * PELADA FÁCIL - AUTHENTICATION
 * Login & Registration System
 */

// === DOM ELEMENTS ===
const loginCard = document.getElementById('loginCard');
const registerCard = document.getElementById('registerCard');
const showRegisterLink = document.getElementById('showRegister');
const showLoginLink = document.getElementById('showLogin');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const quickBtns = document.querySelectorAll('.quick-btn');

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

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        // Show loading state
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Entrando...</span>';
        submitBtn.disabled = true;

        try {
            // Simulate API call (replace with real API)
            await simulateApiCall({ email, password, rememberMe });

            // Store login data (for demo)
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userRole', 'user');

            // Success notification
            showNotification('✅ Login realizado com sucesso!', 'success');

            // Redirect after 1 second
            setTimeout(() => {
                window.location.href = 'dashboard-user.html';
            }, 1000);

        } catch (error) {
            showNotification('❌ Email ou senha incorretos.', 'error');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// === REGISTER FORM ===
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const phone = document.getElementById('registerPhone').value;
        const type = document.getElementById('registerType').value;
        const password = document.getElementById('registerPassword').value;
        const passwordConfirm = document.getElementById('registerPasswordConfirm').value;
        const acceptTerms = document.getElementById('acceptTerms').checked;

        // Validation
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

        // Show loading state
        const submitBtn = registerForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Criando conta...</span>';
        submitBtn.disabled = true;

        try {
            // Simulate API call (replace with real API)
            await simulateApiCall({ name, email, phone, type, password });

            // Store registration data (for demo)
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userName', name);
            localStorage.setItem('userRole', type === 'court-owner' ? 'court-admin' : 'user');

            // Success notification
            showNotification('🎉 Conta criada com sucesso!', 'success');

            // Redirect after 1.5 seconds
            setTimeout(() => {
                if (type === 'court-owner') {
                    window.location.href = 'dashboard-court.html';
                } else {
                    window.location.href = 'dashboard-user.html';
                }
            }, 1500);

        } catch (error) {
            showNotification('❌ Erro ao criar conta. Tente novamente.', 'error');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// === QUICK LOGIN BUTTONS ===
quickBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const role = btn.dataset.role;

        // Show loading
        btn.style.opacity = '0.5';
        btn.style.pointerEvents = 'none';

        // Store demo login
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', role);

        // Set demo user data based on role
        if (role === 'user') {
            localStorage.setItem('userName', 'João Silva');
            localStorage.setItem('userEmail', 'joao@demo.com');
        } else if (role === 'court-admin') {
            localStorage.setItem('userName', 'Arena Sport Center');
            localStorage.setItem('userEmail', 'arena@demo.com');
        } else if (role === 'admin') {
            localStorage.setItem('userName', 'Admin Master');
            localStorage.setItem('userEmail', 'admin@peladafacil.com');
        }

        showNotification(`✅ Entrando como ${btn.textContent.trim()}...`, 'success');

        // Redirect based on role
        setTimeout(() => {
            if (role === 'user') {
                window.location.href = 'dashboard-user.html';
            } else if (role === 'court-admin') {
                window.location.href = 'dashboard-court.html';
            } else if (role === 'admin') {
                window.location.href = 'dashboard-admin.html';
            }
        }, 800);
    });
});

// === UTILITY FUNCTIONS ===

// Simulate API call
function simulateApiCall(data) {
    return new Promise((resolve, reject) => {
        console.log('Auth data:', data);
        setTimeout(() => {
            // Simulate 90% success rate
            if (Math.random() > 0.1) {
                resolve({ success: true });
            } else {
                reject(new Error('API Error'));
            }
        }, 1500);
    });
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
window.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userRole = localStorage.getItem('userRole');

    // If on login page and already logged in, redirect to dashboard
    if (isLoggedIn === 'true' && window.location.pathname.includes('login.html')) {
        if (userRole === 'admin') {
            window.location.href = 'dashboard-admin.html';
        } else if (userRole === 'court-admin') {
            window.location.href = 'dashboard-court.html';
        } else {
            window.location.href = 'dashboard-user.html';
        }
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
console.log('%c⚽ Pelada Fácil - Sistema de Autenticação', 'font-size: 16px; font-weight: bold; color: #00c853;');
console.log('%cUse os botões de login rápido para testar diferentes perfis!', 'font-size: 12px; color: #0066ff;');
