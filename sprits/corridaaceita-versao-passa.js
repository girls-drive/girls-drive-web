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

    const motorista = usuarios.find(u => u.id === corrida.motorista_id);
    console.log('Motorista encontrado:', motorista);

    if (!motorista) {
        console.error('Motorista não encontrado');
        document.getElementById('corrida-details').innerHTML = `
            <p>Motorista não encontrado. <a href="/">Voltar para a página inicial</a></p>
        `;
        return;
    }

    function displayCorridaDetails(corrida, motorista) {
        const corridaDetailsContainer = document.getElementById('corrida-details');
        if (!corridaDetailsContainer) {
            console.error('Elemento corrida-details não encontrado no DOM');
            return;
        }
        console.log('Exibindo detalhes da corrida e do motorista:', corrida, motorista);
        corridaDetailsContainer.innerHTML = `
            <div class="user-details">
                <img src="${motorista.fotoPerfil ? motorista.fotoPerfil : '../img/Rectangle 1582.png'}" alt="Foto do Usuário" class="profile-picture">
                <p class="nomeP">${motorista.nome}</p>
            </div>
            <div class="corrida-info">
                <p><strong>Origem</strong></p>
                <p>${corrida.origem}</p>
                <p><strong>Destino</strong></p>
                <p>${corrida.destino}</p>
                <p><strong>Data</strong></p>
                <p>${corrida.data}</p>
                <p><strong>Horário</strong></p>
                <p>${corrida.hora}</p>
            </div>
            <div class="contato-info">
                <p><strong>Telefone</strong></p>
                <p>${motorista.telefone || 'Telefone não disponível'}</p>
            </div>
            <button id="contact-motorista">Entrar em contato com o motorista</button>
        `;
    }

    displayCorridaDetails(corrida, motorista);

    document.getElementById('corrida-details').addEventListener('click', function(event) {
        if (event.target && event.target.id === 'contact-motorista') {
            console.log('Botão Entrar em Contato com o Motorista clicado');
            contatarWhatsApp(motorista.telefone);
        }
    });

    function clearNumber(x) {
        return x.replace(/[()\s-]/g, '');
    }

    function contatarWhatsApp(telefone) {
        if (!telefone) {
            alert('Telefone não disponível para contato via WhatsApp');
            return;
        }
        const whatsappUrl = `https://wa.me/+55${clearNumber(telefone)}`;
        window.open(whatsappUrl, '_blank');
    }
});
