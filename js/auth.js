// ==========================================
// PELADA FÁCIL - SISTEMA DE AUTENTICAÇÃO
// Versão Ultra-Simples - SEM BUGS
// ==========================================

console.log('🔐 Sistema de Login Carregado');

// CREDENCIAIS DE TESTE
const CREDENTIALS = {
    'admin@peladafacil.com': { pass: 'admin123', name: 'Admin Master', role: 'admin' },
    'quadra@demo.com': { pass: 'quadra123', name: 'Arena Sport Center', role: 'court' },
    'jogador@demo.com': { pass: 'jogador123', name: 'João Silva', role: 'user' }
};

// ==========================================
// FUNÇÕES DE LOGIN
// ==========================================

// Login com formulário
function handleLoginForm(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value.toLowerCase().trim();
    const password = document.getElementById('loginPassword').value;

    console.log('Tentando login:', email);

    const user = CREDENTIALS[email];

    if (!user || user.pass !== password) {
        alert('❌ Email ou senha incorretos!\n\nTente:\nadmin@peladafacil.com / admin123');
        return;
    }

    // Salvar sessão
    sessionStorage.setItem('user', JSON.stringify({
        email: email,
        name: user.name,
        role: user.role
    }));

    console.log('✅ Login OK! Redirecionando...');

    // Redirecionar
    redirectToDashboard(user.role);
}

// Login rápido
function handleQuickLogin(role) {
    console.log('Login rápido:', role);

    let email, userData;

    if (role === 'admin') {
        email = 'admin@peladafacil.com';
        userData = CREDENTIALS[email];
    } else if (role === 'court-admin') {
        email = 'quadra@demo.com';
        userData = CREDENTIALS[email];
        role = 'court'; // Ajuste do role
    } else {
        email = 'jogador@demo.com';
        userData = CREDENTIALS[email];
        role = 'user'; // Ajuste do role
    }

    // Salvar sessão
    sessionStorage.setItem('user', JSON.stringify({
        email: email,
        name: userData.name,
        role: role
    }));

    console.log('✅ Login rápido OK! Redirecionando...');

    // Redirecionar
    redirectToDashboard(role);
}

// Redirecionar para dashboard correto
function redirectToDashboard(role) {
    if (role === 'admin') {
        window.location.href = 'dashboard-admin.html';
    } else if (role === 'court') {
        window.location.href = 'dashboard-court.html';
    } else {
        window.location.href = 'dashboard-user.html';
    }
}

// ==========================================
// INICIALIZAÇÃO
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 Página de login carregada');

    // Formulário de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginForm);
    }

    // Botões de login rápido
    const quickBtns = document.querySelectorAll('.quick-btn');
    quickBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const role = this.getAttribute('data-role');
            handleQuickLogin(role);
        });
    });

    // Alternância entre login e registro
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    const loginCard = document.getElementById('loginCard');
    const registerCard = document.getElementById('registerCard');

    if (showRegister) {
        showRegister.addEventListener('click', function(e) {
            e.preventDefault();
            loginCard.classList.add('hidden');
            registerCard.classList.remove('hidden');
        });
    }

    if (showLogin) {
        showLogin.addEventListener('click', function(e) {
            e.preventDefault();
            registerCard.classList.add('hidden');
            loginCard.classList.remove('hidden');
        });
    }

    // Formulário de registro
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('registerName').value.trim();
            const email = document.getElementById('registerEmail').value.toLowerCase().trim();
            const type = document.getElementById('registerType').value;
            const password = document.getElementById('registerPassword').value;
            const passwordConfirm = document.getElementById('registerPasswordConfirm').value;

            if (password !== passwordConfirm) {
                alert('❌ As senhas não coincidem!');
                return;
            }

            if (password.length < 6) {
                alert('❌ A senha deve ter pelo menos 6 caracteres!');
                return;
            }

            const role = type === 'court-owner' ? 'court' : 'user';

            // Salvar sessão
            sessionStorage.setItem('user', JSON.stringify({
                email: email,
                name: name,
                role: role
            }));

            alert('🎉 Conta criada com sucesso!');

            // Redirecionar
            redirectToDashboard(role);
        });
    }

    console.log('✅ Eventos de login configurados');
    console.log('📝 Use: admin@peladafacil.com / admin123');
});
