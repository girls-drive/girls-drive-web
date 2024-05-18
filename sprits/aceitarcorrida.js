document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const corridaId = urlParams.get('id');
    
    // Verificar se o ID da corrida está presente na URL
    if (!corridaId) {
        console.error('ID da corrida não fornecido na URL');
        // Redirecionar para a página inicial ou exibir uma mensagem de erro
        window.location.href = '/'; // Redirecionar para a página inicial
        return;
    }
    console.log('ID da corrida:', corridaId);

    // Função para carregar as corridas do Local Storage
    function loadCorridas() {
        const corridas = localStorage.getItem('corridas');
        console.log('Corridas carregadas do Local Storage:', corridas);
        return corridas ? JSON.parse(corridas) : [];
    }

    // Carregar as corridas
    const corridas = loadCorridas();
    console.log('Corridas após parse:', corridas);

    // Encontrar a corrida com o ID correspondente
    const corrida = corridas.find(c => c.id === corridaId);
    console.log('Corrida encontrada:', corrida);

    // Verificar se a corrida foi encontrada
    if (!corrida) {
        // Corrida não encontrada, redirecionar ou exibir mensagem de erro
        console.error('Corrida não encontrada');
        document.getElementById('corrida-details').innerHTML = `
            <p>Corrida não encontrada. <a href="/">Voltar para a página inicial</a></p>
        `;
        return;
    }

    // Função para carregar os usuários do Local Storage
    function loadUsuarios() {
        const usuarios = localStorage.getItem('usuarios');
        return usuarios ? JSON.parse(usuarios) : [];
    }

    // Carregar os usuários
    const usuarios = loadUsuarios();
    console.log('Usuários após parse:', usuarios);

    // Encontrar informações do passageiro da corrida selecionada
    const passageiro = usuarios.find(u => u.id === corrida.passageiro_id);
    console.log('Passageiro encontrado:', passageiro);

    // Verificar se o passageiro foi encontrado
    if (!passageiro) {
        console.error('Passageiro não encontrado');
        document.getElementById('corrida-details').innerHTML = `
            <p>Passageiro não encontrado. <a href="/">Voltar para a página inicial</a></p>
        `;
        return;
    }

    // Exibir detalhes da corrida e do passageiro
    displayCorridaDetails(corrida, passageiro);

    // Função para exibir os detalhes da corrida na página
    function displayCorridaDetails(corrida, passageiro) {
        const corridaDetailsContainer = document.getElementById('corrida-details');
        if (!corridaDetailsContainer) {
            console.error('Elemento corrida-details não encontrado no DOM');
            return;
        }
        console.log('Exibindo detalhes da corrida e do passageiro:', corrida, passageiro);
        corridaDetailsContainer.innerHTML = `
            <h2>Detalhes da Corrida</h2>
            <div class="user-details">
                <img src="${passageiro.fotoPerfil}" alt="Foto do Usuário" class="profile-picture">
                <div class="name-address">
                    <p><strong>Nome do Passageiro:</strong> ${passageiro.nome}</p>
                </div>
            </div>
            <hr>
            <div class="corrida-info">
                <p><strong>Origem:</strong> ${corrida.origem}</p>
                <p><strong>Destino:</strong> ${corrida.destino}</p>
                <p><strong>Data:</strong> ${corrida.data}</p>
                <p><strong>Horário:</strong> ${corrida.hora}</p>
            </div>
            <hr>
            <div class="contato-info">
                <p><strong>Contato:</strong></p>
                <p><strong>Telefone:</strong> ${passageiro.telefone || 'Telefone não disponível'}</p>
                <p><strong>Email:</strong> ${passageiro.email || 'Email não disponível'}</p>
            </div>
            <button id="accept-corrida">Aceitar Corrida</button>
        `;
    }

    // Event listener para aceitar a corrida
    document.getElementById('corrida-details').addEventListener('click', function(event) {
        if (event.target && event.target.id === 'accept-corrida') {
            // Aqui você pode adicionar a lógica para aceitar a corrida
            // Por exemplo, você pode exibir uma mensagem de confirmação ou realizar uma ação específica
            alert('Corrida aceita!');
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const corridaId = urlParams.get('id');
    
    // Verificar se o ID da corrida está presente na URL
    if (!corridaId) {
        console.error('ID da corrida não fornecido na URL');
        // Redirecionar para a página inicial ou exibir uma mensagem de erro
        window.location.href = '/'; // Redirecionar para a página inicial
        return;
    }
    console.log('ID da corrida:', corridaId);

    // Função para carregar as corridas do Local Storage
    function loadCorridas() {
        const corridas = localStorage.getItem('corridas');
        console.log('Corridas carregadas do Local Storage:', corridas);
        return corridas ? JSON.parse(corridas) : [];
    }

    // Carregar as corridas
    const corridas = loadCorridas();
    console.log('Corridas após parse:', corridas);

    // Encontrar a corrida com o ID correspondente
    const corrida = corridas.find(c => c.id === corridaId);
    console.log('Corrida encontrada:', corrida);

    // Verificar se a corrida foi encontrada
    if (!corrida) {
        // Corrida não encontrada, redirecionar ou exibir mensagem de erro
        console.error('Corrida não encontrada');
        document.getElementById('corrida-details').innerHTML = `
            <p>Corrida não encontrada. <a href="/">Voltar para a página inicial</a></p>
        `;
        return;
    }

    // Função para carregar os usuários do Local Storage
    function loadUsuarios() {
        const usuarios = localStorage.getItem('usuarios');
        return usuarios ? JSON.parse(usuarios) : [];
    }

    // Carregar os usuários
    const usuarios = loadUsuarios();
    console.log('Usuários após parse:', usuarios);

    // Encontrar informações do passageiro da corrida selecionada
    const passageiro = usuarios.find(u => u.id === corrida.passageiro_id);
    console.log('Passageiro encontrado:', passageiro);

    // Verificar se o passageiro foi encontrado
    if (!passageiro) {
        console.error('Passageiro não encontrado');
        document.getElementById('corrida-details').innerHTML = `
            <p>Passageiro não encontrado. <a href="/">Voltar para a página inicial</a></p>
        `;
        return;
    }

    // Exibir detalhes da corrida e do passageiro
    displayCorridaDetails(corrida, passageiro);

    // Função para exibir os detalhes da corrida na página
    function displayCorridaDetails(corrida, passageiro) {
        const corridaDetailsContainer = document.getElementById('corrida-details');
        if (!corridaDetailsContainer) {
            console.error('Elemento corrida-details não encontrado no DOM');
            return;
        }
        console.log('Exibindo detalhes da corrida e do passageiro:', corrida, passageiro);
        corridaDetailsContainer.innerHTML = `
            <h2>Detalhes da Corrida</h2>
            <div class="user-details">
                <img src="${passageiro.fotoPerfil}" alt="Foto do Usuário" class="profile-picture">
                <div class="name-address">
                    <p><strong>Nome do Passageiro:</strong> ${passageiro.nome}</p>
                </div>
            </div>
            <hr>
            <div class="corrida-info">
                <p><strong>Origem:</strong> ${corrida.origem}</p>
                <p><strong>Destino:</strong> ${corrida.destino}</p>
                <p><strong>Data:</strong> ${corrida.data}</p>
                <p><strong>Horário:</strong> ${corrida.hora}</p>
            </div>
            <hr>
            <div class="contato-info">
                <p><strong>Contato:</strong></p>
                <p><strong>Telefone:</strong> ${passageiro.telefone || 'Telefone não disponível'}</p>
                <p><strong>Email:</strong> ${passageiro.email || 'Email não disponível'}</p>
            </div>
            <button id="accept-corrida">Aceitar Corrida</button>
        `;
    }

    // Event listener para aceitar a corrida
    document.getElementById('corrida-details').addEventListener('click', function(event) {
        if (event.target && event.target.id === 'accept-corrida') {
            // Aqui você pode adicionar a lógica para aceitar a corrida
            // Por exemplo, você pode exibir uma mensagem de confirmação ou realizar uma ação específica
            alert('Corrida aceita!');
        }
    });
});
