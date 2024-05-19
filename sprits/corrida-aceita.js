document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const corridaId = urlParams.get('id');
    
    if (!corridaId) {
        console.error('ID da corrida não fornecido na URL');
        window.location.href = '/';
        return;
    }
    console.log('ID da corrida:', corridaId);

    function loadCorridas() {
        const corridas = localStorage.getItem('corridas');
        console.log('Corridas carregadas do Local Storage:', corridas);
        return corridas ? JSON.parse(corridas) : [];
    }

    const corridas = loadCorridas();
    console.log('Corridas após parse:', corridas);

    const corrida = corridas.find(c => c.id === corridaId);
    console.log('Corrida encontrada:', corrida);

    if (!corrida) {
        console.error('Corrida não encontrada');
        document.getElementById('corrida-details').innerHTML = `
            <p>Corrida não encontrada. <a href="/">Voltar para a página inicial</a></p>
        `;
        return;
    }

    function loadUsuarios() {
        const usuarios = localStorage.getItem('usuarios');
        return usuarios ? JSON.parse(usuarios) : [];
    }

    const usuarios = loadUsuarios();
    console.log('Usuários após parse:', usuarios);

    const passageiro = usuarios.find(u => u.id === corrida.passageiro_id);
    console.log('Passageiro encontrado:', passageiro);

    if (!passageiro) {
        console.error('Passageiro não encontrado');
        document.getElementById('corrida-details').innerHTML = `
            <p>Passageiro não encontrado. <a href="/">Voltar para a página inicial</a></p>
        `;
        return;
    }

    function displayCorridaDetails(corrida, passageiro) {
        const corridaDetailsContainer = document.getElementById('corrida-details');
        if (!corridaDetailsContainer) {
            console.error('Elemento corrida-details não encontrado no DOM');
            return;
        }
        console.log('Exibindo detalhes da corrida e do passageiro:', corrida, passageiro);
        corridaDetailsContainer.innerHTML = `
            <div class="user-details">
                <img src="${passageiro.fotoPerfil}" alt="Foto do Usuário" class="profile-picture">
                <p class="nomeP">${passageiro.nome}</p>
            </div>
            <div class="corrida-info">
                <p><strong>Origem:</strong> ${corrida.origem}</p>
                <p><strong>Destino:</strong> ${corrida.destino}</p>
                <p><strong>Data:</strong> ${corrida.data}</p>
                <p><strong>Horário:</strong> ${corrida.hora}</p>
            </div>
            <div class="contato-info">
                <p><strong>Contato:</strong></p>
                <p><strong>Telefone:</strong> ${passageiro.telefone || 'Telefone não disponível'}</p>
                <p><strong>Email:</strong> ${passageiro.email || 'Email não disponível'}</p>
            </div>
        `;
    }

    displayCorridaDetails(corrida, passageiro);

    function checkCorridaStatus() {
        const corridas = loadCorridas();
        const updatedCorrida = corridas.find(c => c.id === corridaId);
        if (updatedCorrida && updatedCorrida.status === 'aceita') {
            document.getElementById('status-message').innerText = 'Sua corrida foi aceita pelo motorista!';
        }
    }

    setInterval(checkCorridaStatus, 3000); // Verifica o status da corrida a cada 3 segundos
});