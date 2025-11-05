/**
 * PELADA FÁCIL - AUTHENTICATION
 * Sistema de autenticação SEM loops
 */

// === CREDENCIAIS ===
const USERS = {
    'admin@peladafacil.com': { password: 'admin123', name: 'Admin Master', role: 'admin' },
    'quadra@demo.com': { password: 'quadra123', name: 'Arena Sport Center', role: 'court-admin' },
    'jogador@demo.com': { password: 'jogador123', name: 'João Silva', role: 'user' }
};

// === STATE ===
let isProcessing = false;

// === INITIALIZE ===
document.addEventListener('DOMContentLoaded', () => {
    initLoginForm();
    initRegisterForm();
    initQuickLogin();
    initToggleForms();

    // NO AUTO-REDIRECT - Let user stay on login page if they want
    console.log('%c⚽ Pelada Fácil - Login', 'font-size: 16px; font-weight: bold; color: #00c853;');
    console.log('%cCredenciais: admin@peladafacil.com / admin123', 'color: #999;');
});

// === TOGGLE FORMS ===
function initToggleForms() {
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    const loginCard = document.getElementById('loginCard');
    const registerCard = document.getElementById('registerCard');

    if (showRegister) {
        showRegister.addEventListener('click', (e) => {
            e.preventDefault();
            loginCard.classList.add('hidden');
            registerCard.classList.remove('hidden');
        });
    }

    if (showLogin) {
        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            registerCard.classList.add('hidden');
            loginCard.classList.remove('hidden');
        });
    }
}

// === LOGIN FORM ===
function initLoginForm() {
    const form = document.getElementById('loginForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (isProcessing) return;

        isProcessing = true;
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>Entrando...</span>';
        btn.disabled = true;

        const email = document.getElementById('loginEmail').value.trim().toLowerCase();
        const password = document.getElementById('loginPassword').value;

        await new Promise(resolve => setTimeout(resolve, 500));

        const user = USERS[email];

        if (!user || user.password !== password) {
            showMsg('❌ Email ou senha incorretos', 'error');
            btn.innerHTML = originalText;
            btn.disabled = false;
            isProcessing = false;
            return;
        }

        // SUCCESS
        localStorage.setItem('auth_user', JSON.stringify({
            email: email,
            name: user.name,
            role: user.role,
            timestamp: Date.now()
        }));

        showMsg(`✅ Bem-vindo, ${user.name}!`, 'success');

        setTimeout(() => {
            goToDashboard(user.role);
        }, 500);
    });
}

// === REGISTER FORM ===
function initRegisterForm() {
    const form = document.getElementById('registerForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (isProcessing) return;

        isProcessing = true;
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>Criando...</span>';
        btn.disabled = true;

        const name = document.getElementById('registerName').value.trim();
        const email = document.getElementById('registerEmail').value.trim().toLowerCase();
        const password = document.getElementById('registerPassword').value;
        const passwordConfirm = document.getElementById('registerPasswordConfirm').value;
        const type = document.getElementById('registerType').value;

        if (!name || !email || !password || !type) {
            showMsg('❌ Preencha todos os campos', 'error');
            btn.innerHTML = originalText;
            btn.disabled = false;
            isProcessing = false;
            return;
        }

        if (password !== passwordConfirm) {
            showMsg('❌ As senhas não coincidem', 'error');
            btn.innerHTML = originalText;
            btn.disabled = false;
            isProcessing = false;
            return;
        }

        if (password.length < 6) {
            showMsg('❌ Senha deve ter 6+ caracteres', 'error');
            btn.innerHTML = originalText;
            btn.disabled = false;
            isProcessing = false;
            return;
        }

        await new Promise(resolve => setTimeout(resolve, 500));

        const role = type === 'court-owner' ? 'court-admin' : 'user';

        localStorage.setItem('auth_user', JSON.stringify({
            email: email,
            name: name,
            role: role,
            timestamp: Date.now()
        }));

        showMsg('🎉 Conta criada!', 'success');

        setTimeout(() => {
            goToDashboard(role);
        }, 500);
    });
}

// === QUICK LOGIN ===
function initQuickLogin() {
    const btns = document.querySelectorAll('.quick-btn');

    btns.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            if (isProcessing) return;

            isProcessing = true;
            btn.style.opacity = '0.5';

            const role = btn.dataset.role;
            let userData;

            if (role === 'admin') userData = USERS['admin@peladafacil.com'];
            else if (role === 'court-admin') userData = USERS['quadra@demo.com'];
            else userData = USERS['jogador@demo.com'];

            await new Promise(resolve => setTimeout(resolve, 300));

            localStorage.setItem('auth_user', JSON.stringify({
                email: Object.keys(USERS).find(e => USERS[e].role === role),
                name: userData.name,
                role: role,
                timestamp: Date.now()
            }));

            showMsg(`✅ Entrando como ${userData.name}...`, 'success');

            setTimeout(() => {
                goToDashboard(role);
            }, 400);
        });
    });
}

// === REDIRECT ===
function goToDashboard(role) {
    if (role === 'admin') {
        window.location.replace('dashboard-admin.html');
    } else if (role === 'court-admin') {
        window.location.replace('dashboard-court.html');
    } else {
        window.location.replace('dashboard-user.html');
    }
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

// === STYLES ===
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateX(0); }
    }
`;
document.head.appendChild(style);
