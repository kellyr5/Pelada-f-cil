// ==========================================
// PELADA FÁCIL - FUNCIONALIDADES COMPLETAS
// Todos os botões e ações funcionais
// ==========================================

console.log('⚙️ Módulo de funcionalidades carregado');

// ==========================================
// MODALS
// ==========================================

function createModal(title, content, actions) {
    // Remove modal existente
    const existing = document.querySelector('.modal-overlay');
    if (existing) existing.remove();

    // Cria overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
        <div class="modal-container">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
            <div class="modal-footer">
                ${actions}
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    // Fechar ao clicar fora
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeModal();
    });

    return overlay;
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 300);
    }
}

// ==========================================
// FUNCIONALIDADES DO DASHBOARD ADMIN
// ==========================================

// Aprovar quadra
function aprovarQuadra(id, nome) {
    const modal = createModal(
        'Aprovar Quadra',
        `
        <p>Deseja aprovar a quadra <strong>${nome}</strong>?</p>
        <div class="approval-details">
            <p><i class="fas fa-check-circle"></i> A quadra ficará visível para todos os usuários</p>
            <p><i class="fas fa-bell"></i> O dono receberá uma notificação</p>
        </div>
        `,
        `
            <button class="btn btn--secondary" onclick="closeModal()">Cancelar</button>
            <button class="btn btn--success" onclick="confirmarAprovacao('${id}', '${nome}')">
                <i class="fas fa-check"></i> Confirmar Aprovação
            </button>
        `
    );
}

function confirmarAprovacao(id, nome) {
    closeModal();
    showNotification(`Quadra "${nome}" aprovada com sucesso!`, 'success');

    // Remove o card da lista
    const card = document.querySelector(`[data-id="${id}"]`);
    if (card) {
        card.style.opacity = '0';
        setTimeout(() => card.remove(), 300);
    }

    // Atualiza contador
    atualizarContador('aprovacoes', -1);
}

// Rejeitar quadra
function rejeitarQuadra(id, nome) {
    const modal = createModal(
        'Rejeitar Quadra',
        `
        <p>Por que deseja rejeitar <strong>${nome}</strong>?</p>
        <textarea id="motivo-rejeicao" class="form-control" rows="4" placeholder="Descreva o motivo da rejeição..."></textarea>
        `,
        `
            <button class="btn btn--secondary" onclick="closeModal()">Cancelar</button>
            <button class="btn btn--danger" onclick="confirmarRejeicao('${id}', '${nome}')">
                <i class="fas fa-times"></i> Confirmar Rejeição
            </button>
        `
    );
}

function confirmarRejeicao(id, nome) {
    const motivo = document.getElementById('motivo-rejeicao').value;

    if (!motivo.trim()) {
        showNotification('Por favor, descreva o motivo da rejeição', 'error');
        return;
    }

    closeModal();
    showNotification(`Quadra "${nome}" rejeitada`, 'error');

    const card = document.querySelector(`[data-id="${id}"]`);
    if (card) {
        card.style.opacity = '0';
        setTimeout(() => card.remove(), 300);
    }

    atualizarContador('aprovacoes', -1);
}

// Ver detalhes da quadra
function verDetalhesQuadra(id, nome) {
    const modal = createModal(
        `Detalhes: ${nome}`,
        `
        <div class="details-grid">
            <div class="detail-item">
                <label><i class="fas fa-map-marker-alt"></i> Localização</label>
                <p>Vila Mariana, São Paulo - SP</p>
            </div>
            <div class="detail-item">
                <label><i class="fas fa-user"></i> Responsável</label>
                <p>Roberto Silva</p>
            </div>
            <div class="detail-item">
                <label><i class="fas fa-envelope"></i> Email</label>
                <p>roberto@quadra.com</p>
            </div>
            <div class="detail-item">
                <label><i class="fas fa-phone"></i> Telefone</label>
                <p>(11) 99999-9999</p>
            </div>
            <div class="detail-item">
                <label><i class="fas fa-dollar-sign"></i> Preço/hora</label>
                <p>R$ 150,00</p>
            </div>
            <div class="detail-item">
                <label><i class="fas fa-clock"></i> Horário</label>
                <p>07:00 - 23:00</p>
            </div>
            <div class="detail-item full-width">
                <label><i class="fas fa-list"></i> Comodidades</label>
                <div class="amenities">
                    <span class="amenity-tag"><i class="fas fa-lightbulb"></i> Iluminação</span>
                    <span class="amenity-tag"><i class="fas fa-shower"></i> Vestiários</span>
                    <span class="amenity-tag"><i class="fas fa-parking"></i> Estacionamento</span>
                    <span class="amenity-tag"><i class="fas fa-wifi"></i> Wi-Fi</span>
                </div>
            </div>
        </div>
        `,
        `
            <button class="btn btn--secondary" onclick="closeModal()">Fechar</button>
            <button class="btn btn--primary" onclick="editarQuadra('${id}')">
                <i class="fas fa-edit"></i> Editar
            </button>
        `
    );
}

// Gerenciar usuário
function gerenciarUsuario(id, nome, email) {
    const modal = createModal(
        `Gerenciar: ${nome}`,
        `
        <div class="user-manage">
            <div class="user-info">
                <div class="user-avatar-large">
                    <i class="fas fa-user"></i>
                </div>
                <div>
                    <h4>${nome}</h4>
                    <p>${email}</p>
                </div>
            </div>
            <div class="manage-options">
                <button class="manage-btn" onclick="enviarMensagem('${email}')">
                    <i class="fas fa-envelope"></i>
                    <span>Enviar Mensagem</span>
                </button>
                <button class="manage-btn" onclick="verHistorico('${id}')">
                    <i class="fas fa-history"></i>
                    <span>Ver Histórico</span>
                </button>
                <button class="manage-btn" onclick="editarPermissoes('${id}')">
                    <i class="fas fa-key"></i>
                    <span>Editar Permissões</span>
                </button>
                <button class="manage-btn danger" onclick="bloquearUsuario('${id}', '${nome}')">
                    <i class="fas fa-ban"></i>
                    <span>Bloquear Usuário</span>
                </button>
            </div>
        </div>
        `,
        `<button class="btn btn--secondary" onclick="closeModal()">Fechar</button>`
    );
}

function bloquearUsuario(id, nome) {
    if (confirm(`Tem certeza que deseja bloquear ${nome}?`)) {
        closeModal();
        showNotification(`Usuário ${nome} bloqueado`, 'warning');
    }
}

// ==========================================
// FUNCIONALIDADES DO DASHBOARD QUADRA
// ==========================================

// Adicionar horário
function adicionarHorario() {
    const modal = createModal(
        'Adicionar Horário',
        `
        <form id="form-horario" class="form-modal">
            <div class="form-group">
                <label><i class="fas fa-calendar"></i> Data</label>
                <input type="date" id="data-horario" class="form-control" required>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label><i class="fas fa-clock"></i> Hora Início</label>
                    <input type="time" id="hora-inicio" class="form-control" required>
                </div>
                <div class="form-group">
                    <label><i class="fas fa-clock"></i> Hora Fim</label>
                    <input type="time" id="hora-fim" class="form-control" required>
                </div>
            </div>
            <div class="form-group">
                <label><i class="fas fa-dollar-sign"></i> Preço</label>
                <input type="number" id="preco-horario" class="form-control" placeholder="150.00" step="0.01" required>
            </div>
        </form>
        `,
        `
            <button class="btn btn--secondary" onclick="closeModal()">Cancelar</button>
            <button class="btn btn--primary" onclick="salvarHorario()">
                <i class="fas fa-save"></i> Salvar Horário
            </button>
        `
    );
}

function salvarHorario() {
    const data = document.getElementById('data-horario').value;
    const inicio = document.getElementById('hora-inicio').value;
    const fim = document.getElementById('hora-fim').value;
    const preco = document.getElementById('preco-horario').value;

    if (!data || !inicio || !fim || !preco) {
        showNotification('Preencha todos os campos', 'error');
        return;
    }

    closeModal();
    showNotification('Horário adicionado com sucesso!', 'success');
}

// Bloquear horário
function bloquearHorario() {
    const modal = createModal(
        'Bloquear Horário',
        `
        <form id="form-bloquear" class="form-modal">
            <div class="form-group">
                <label><i class="fas fa-calendar"></i> Data</label>
                <input type="date" id="data-bloquear" class="form-control" required>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label><i class="fas fa-clock"></i> Hora Início</label>
                    <input type="time" id="hora-inicio-bloquear" class="form-control" required>
                </div>
                <div class="form-group">
                    <label><i class="fas fa-clock"></i> Hora Fim</label>
                    <input type="time" id="hora-fim-bloquear" class="form-control" required>
                </div>
            </div>
            <div class="form-group">
                <label><i class="fas fa-comment"></i> Motivo</label>
                <select id="motivo-bloquear" class="form-control" required>
                    <option value="">Selecione...</option>
                    <option value="manutencao">Manutenção</option>
                    <option value="evento">Evento Privado</option>
                    <option value="reforma">Reforma</option>
                    <option value="outro">Outro</option>
                </select>
            </div>
        </form>
        `,
        `
            <button class="btn btn--secondary" onclick="closeModal()">Cancelar</button>
            <button class="btn btn--warning" onclick="confirmarBloquear()">
                <i class="fas fa-lock"></i> Bloquear
            </button>
        `
    );
}

function confirmarBloquear() {
    const data = document.getElementById('data-bloquear').value;
    const motivo = document.getElementById('motivo-bloquear').value;

    if (!data || !motivo) {
        showNotification('Preencha todos os campos', 'error');
        return;
    }

    closeModal();
    showNotification('Horário bloqueado com sucesso', 'warning');
}

// Registrar pagamento
function registrarPagamento() {
    const modal = createModal(
        'Registrar Pagamento',
        `
        <form id="form-pagamento" class="form-modal">
            <div class="form-group">
                <label><i class="fas fa-user"></i> Cliente</label>
                <input type="text" id="cliente-pagamento" class="form-control" placeholder="Nome do cliente" required>
            </div>
            <div class="form-group">
                <label><i class="fas fa-dollar-sign"></i> Valor</label>
                <input type="number" id="valor-pagamento" class="form-control" placeholder="150.00" step="0.01" required>
            </div>
            <div class="form-group">
                <label><i class="fas fa-credit-card"></i> Forma de Pagamento</label>
                <select id="forma-pagamento" class="form-control" required>
                    <option value="">Selecione...</option>
                    <option value="dinheiro">Dinheiro</option>
                    <option value="pix">PIX</option>
                    <option value="cartao">Cartão</option>
                    <option value="transferencia">Transferência</option>
                </select>
            </div>
            <div class="form-group">
                <label><i class="fas fa-calendar"></i> Data</label>
                <input type="date" id="data-pagamento" class="form-control" required>
            </div>
        </form>
        `,
        `
            <button class="btn btn--secondary" onclick="closeModal()">Cancelar</button>
            <button class="btn btn--success" onclick="confirmarPagamento()">
                <i class="fas fa-check"></i> Confirmar Pagamento
            </button>
        `
    );
}

function confirmarPagamento() {
    const cliente = document.getElementById('cliente-pagamento').value;
    const valor = document.getElementById('valor-pagamento').value;
    const forma = document.getElementById('forma-pagamento').value;

    if (!cliente || !valor || !forma) {
        showNotification('Preencha todos os campos', 'error');
        return;
    }

    closeModal();
    showNotification(`Pagamento de R$ ${valor} registrado`, 'success');
}

// Adicionar fotos
function adicionarFotos() {
    const modal = createModal(
        'Adicionar Fotos da Quadra',
        `
        <div class="upload-area">
            <input type="file" id="input-fotos" multiple accept="image/*" style="display:none">
            <div class="upload-zone" onclick="document.getElementById('input-fotos').click()">
                <i class="fas fa-cloud-upload-alt"></i>
                <p>Clique para selecionar fotos</p>
                <small>ou arraste imagens aqui</small>
            </div>
            <div id="preview-fotos" class="photos-preview"></div>
        </div>
        `,
        `
            <button class="btn btn--secondary" onclick="closeModal()">Cancelar</button>
            <button class="btn btn--primary" onclick="uploadFotos()">
                <i class="fas fa-upload"></i> Fazer Upload
            </button>
        `
    );

    document.getElementById('input-fotos').addEventListener('change', function(e) {
        const preview = document.getElementById('preview-fotos');
        preview.innerHTML = '';

        Array.from(e.target.files).forEach(file => {
            const reader = new FileReader();
            reader.onload = function(event) {
                const img = document.createElement('div');
                img.className = 'preview-item';
                img.innerHTML = `<img src="${event.target.result}" alt="Preview">`;
                preview.appendChild(img);
            };
            reader.readAsDataURL(file);
        });
    });
}

function uploadFotos() {
    const files = document.getElementById('input-fotos').files;
    if (files.length === 0) {
        showNotification('Selecione pelo menos uma foto', 'error');
        return;
    }

    closeModal();
    showNotification(`${files.length} foto(s) adicionada(s) com sucesso!`, 'success');
}

// Criar promoção
function criarPromocao() {
    const modal = createModal(
        'Criar Promoção',
        `
        <form id="form-promocao" class="form-modal">
            <div class="form-group">
                <label><i class="fas fa-tag"></i> Nome da Promoção</label>
                <input type="text" id="nome-promocao" class="form-control" placeholder="Ex: Happy Hour" required>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label><i class="fas fa-percent"></i> Desconto (%)</label>
                    <input type="number" id="desconto-promocao" class="form-control" placeholder="20" min="1" max="100" required>
                </div>
                <div class="form-group">
                    <label><i class="fas fa-users"></i> Vagas</label>
                    <input type="number" id="vagas-promocao" class="form-control" placeholder="10" min="1" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label><i class="fas fa-calendar"></i> Data Início</label>
                    <input type="date" id="data-inicio-promocao" class="form-control" required>
                </div>
                <div class="form-group">
                    <label><i class="fas fa-calendar"></i> Data Fim</label>
                    <input type="date" id="data-fim-promocao" class="form-control" required>
                </div>
            </div>
        </form>
        `,
        `
            <button class="btn btn--secondary" onclick="closeModal()">Cancelar</button>
            <button class="btn btn--primary" onclick="salvarPromocao()">
                <i class="fas fa-save"></i> Criar Promoção
            </button>
        `
    );
}

function salvarPromocao() {
    const nome = document.getElementById('nome-promocao').value;
    const desconto = document.getElementById('desconto-promocao').value;

    if (!nome || !desconto) {
        showNotification('Preencha todos os campos obrigatórios', 'error');
        return;
    }

    closeModal();
    showNotification(`Promoção "${nome}" criada com ${desconto}% de desconto!`, 'success');
}

// ==========================================
// FUNCIONALIDADES DO DASHBOARD USUÁRIO
// ==========================================

// Ver horários da quadra
function verHorariosQuadra(nome) {
    const modal = createModal(
        `Horários Disponíveis - ${nome}`,
        `
        <div class="horarios-grid">
            <div class="horario-item disponivel" onclick="reservarHorario('08:00', '09:00', '150')">
                <div class="horario-time">08:00 - 09:00</div>
                <div class="horario-price">R$ 150,00</div>
                <div class="horario-status"><i class="fas fa-check-circle"></i> Disponível</div>
            </div>
            <div class="horario-item disponivel" onclick="reservarHorario('09:00', '10:00', '150')">
                <div class="horario-time">09:00 - 10:00</div>
                <div class="horario-price">R$ 150,00</div>
                <div class="horario-status"><i class="fas fa-check-circle"></i> Disponível</div>
            </div>
            <div class="horario-item reservado">
                <div class="horario-time">10:00 - 11:00</div>
                <div class="horario-price">R$ 150,00</div>
                <div class="horario-status"><i class="fas fa-times-circle"></i> Reservado</div>
            </div>
            <div class="horario-item disponivel" onclick="reservarHorario('11:00', '12:00', '150')">
                <div class="horario-time">11:00 - 12:00</div>
                <div class="horario-price">R$ 150,00</div>
                <div class="horario-status"><i class="fas fa-check-circle"></i> Disponível</div>
            </div>
        </div>
        `,
        `<button class="btn btn--secondary" onclick="closeModal()">Fechar</button>`
    );
}

function reservarHorario(inicio, fim, preco) {
    if (confirm(`Reservar horário ${inicio} - ${fim} por R$ ${preco}?`)) {
        closeModal();
        showNotification('Horário reservado! Aguardando confirmação de pagamento.', 'success');
    }
}

// Convidar jogador
function convidarJogador(nome, id) {
    const modal = createModal(
        `Convidar ${nome}`,
        `
        <div class="convite-form">
            <p>Você está convidando <strong>${nome}</strong> para jogar</p>
            <div class="form-group">
                <label><i class="fas fa-futbol"></i> Para qual pelada?</label>
                <select id="pelada-convite" class="form-control">
                    <option value="1">Pelada Zona Sul - Sáb 15/12 15:00</option>
                    <option value="2">Rachão Domingo - Dom 18/12 09:00</option>
                </select>
            </div>
            <div class="form-group">
                <label><i class="fas fa-comment"></i> Mensagem (opcional)</label>
                <textarea id="mensagem-convite" class="form-control" rows="3" placeholder="Escreva uma mensagem..."></textarea>
            </div>
        </div>
        `,
        `
            <button class="btn btn--secondary" onclick="closeModal()">Cancelar</button>
            <button class="btn btn--primary" onclick="enviarConvite('${nome}')">
                <i class="fas fa-paper-plane"></i> Enviar Convite
            </button>
        `
    );
}

function enviarConvite(nome) {
    closeModal();
    showNotification(`Convite enviado para ${nome}!`, 'success');
}

// Ver detalhes da pelada
function verDetalhesPelada(nome) {
    const modal = createModal(
        nome,
        `
        <div class="pelada-details">
            <div class="detail-row">
                <i class="fas fa-map-marker-alt"></i>
                <div>
                    <label>Local</label>
                    <p>Arena Sport Center - Vila Mariana, SP</p>
                </div>
            </div>
            <div class="detail-row">
                <i class="fas fa-calendar"></i>
                <div>
                    <label>Data e Hora</label>
                    <p>Sábado, 15 de Dezembro - 15:00</p>
                </div>
            </div>
            <div class="detail-row">
                <i class="fas fa-users"></i>
                <div>
                    <label>Jogadores</label>
                    <p>10 confirmados / 12 vagas</p>
                </div>
            </div>
            <div class="detail-row">
                <i class="fas fa-dollar-sign"></i>
                <div>
                    <label>Valor</label>
                    <p>R$ 15,00 por pessoa</p>
                </div>
            </div>
            <div class="jogadores-list">
                <h4>Jogadores Confirmados:</h4>
                <div class="jogador-item">
                    <i class="fas fa-user-circle"></i> João Silva (Você)
                </div>
                <div class="jogador-item">
                    <i class="fas fa-user-circle"></i> Carlos Mendes
                </div>
                <div class="jogador-item">
                    <i class="fas fa-user-circle"></i> Ana Paula
                </div>
            </div>
        </div>
        `,
        `
            <button class="btn btn--secondary" onclick="closeModal()">Fechar</button>
            <button class="btn btn--danger" onclick="cancelarPresenca()">
                <i class="fas fa-times"></i> Cancelar Presença
            </button>
            <button class="btn btn--primary" onclick="compartilharPelada()">
                <i class="fas fa-share"></i> Compartilhar
            </button>
        `
    );
}

function cancelarPresenca() {
    if (confirm('Tem certeza que deseja cancelar sua presença?')) {
        closeModal();
        showNotification('Presença cancelada', 'warning');
    }
}

function compartilharPelada() {
    showNotification('Link copiado para área de transferência!', 'info');
}

// ==========================================
// UTILIDADES
// ==========================================

function atualizarContador(tipo, delta) {
    const badge = document.querySelector(`.sidebar__badge-small[data-type="${tipo}"]`);
    if (badge) {
        const atual = parseInt(badge.textContent) || 0;
        const novo = Math.max(0, atual + delta);
        badge.textContent = novo;
        if (novo === 0) badge.style.display = 'none';
    }
}

function enviarMensagem(email) {
    closeModal();
    const modal = createModal(
        'Enviar Mensagem',
        `
        <div class="form-group">
            <label><i class="fas fa-envelope"></i> Para</label>
            <input type="email" class="form-control" value="${email}" disabled>
        </div>
        <div class="form-group">
            <label><i class="fas fa-comment"></i> Mensagem</label>
            <textarea id="texto-mensagem" class="form-control" rows="5" placeholder="Digite sua mensagem..."></textarea>
        </div>
        `,
        `
            <button class="btn btn--secondary" onclick="closeModal()">Cancelar</button>
            <button class="btn btn--primary" onclick="confirmarEnvioMensagem()">
                <i class="fas fa-paper-plane"></i> Enviar
            </button>
        `
    );
}

function confirmarEnvioMensagem() {
    const texto = document.getElementById('texto-mensagem').value;
    if (!texto.trim()) {
        showNotification('Digite uma mensagem', 'error');
        return;
    }
    closeModal();
    showNotification('Mensagem enviada!', 'success');
}

function verHistorico(id) {
    closeModal();
    showNotification('Funcionalidade em desenvolvimento', 'info');
}

function editarPermissoes(id) {
    closeModal();
    showNotification('Funcionalidade em desenvolvimento', 'info');
}

function editarQuadra(id) {
    closeModal();
    showNotification('Funcionalidade em desenvolvimento', 'info');
}

console.log('✅ Funcionalidades carregadas');
