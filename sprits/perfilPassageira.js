document.addEventListener('DOMContentLoaded', function() {
    const ridesListSolicitadas = document.getElementById('ridesListSolicitadas');
    const ridesListAceitas = document.getElementById('ridesListAceitas');
    const btnSair = document.getElementById('btnSair');

    if (!ridesListSolicitadas) {
        console.error('Elemento ridesListSolicitadas não encontrado no DOM');
        return;
    }

    if (!ridesListAceitas) {
        console.error('Elemento ridesListAceitas não encontrado no DOM');
        return;
    }

    if (!btnSair) {
        console.error('Elemento btnSair não encontrado no DOM');
        return;
    }

    // Função para carregar as corridas do Local Storage
    function loadCorridas() {
        const corridas = localStorage.getItem('corridas');
        return corridas ? JSON.parse(corridas) : [];
    }

    // Função para carregar os usuários do Local Storage
    function loadUsuarios() {
        const usuarios = localStorage.getItem('usuarios');
        return usuarios ? JSON.parse(usuarios) : [];
    }

    // Função para carregar os dados do usuário logado
    function loadLoggedInUser() {
        return JSON.parse(localStorage.getItem('loggedInUser'));
    }

    // Função para capitalizar a primeira letra de cada palavra
    function capitalizeFirstLetter(str) {
        return str.replace(/\b\w/g, function(char) {
            return char.toUpperCase();
        });
    }

    // Função para exibir os dados do passageiro
    function displayPassengerDetails(passageiro) {
        document.getElementById('profileImage').src = passageiro.fotoPerfil ? passageiro.fotoPerfil : '../img/Rectangle 1582.png';
        document.getElementById('passengerName').textContent = capitalizeFirstLetter(passageiro.nome || passageiro.NomeCompleto);
        document.getElementById('passengerPhone').textContent = `Telefone: ${passageiro.telefone}`;
        document.getElementById('passengerEmail').textContent = `Email: ${passageiro.email}`;
    }

    // Função para exibir as corridas solicitadas e aceitas
    function displayRides(corridas, usuarioId, usuarios) {
        ridesListSolicitadas.innerHTML = '';
        ridesListAceitas.innerHTML = '';

        const corridasSolicitadas = corridas.filter(corrida => corrida.passageiro_id === usuarioId && corrida.status !== 'aceita');
        const corridasAceitas = corridas.filter(corrida => corrida.passageiro_id === usuarioId && corrida.status === 'aceita');

        corridasSolicitadas.forEach(corrida => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <strong>Origem:</strong> ${corrida.origem}<br>
                <strong>Destino:</strong> ${corrida.destino}<br>
                <strong>Data:</strong> ${corrida.data}<br>
                <strong>Hora:</strong> ${corrida.hora}<br>
                <strong>Status:</strong> ${corrida.status}
            `;
            ridesListSolicitadas.appendChild(listItem);
        });

        corridasAceitas.forEach(corrida => {
            const motorista = usuarios.find(usuario => usuario.id === corrida.motorista_id);
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <strong>Origem:</strong> ${corrida.origem}<br>
                <strong>Destino:</strong> ${corrida.destino}<br>
                <strong>Data:</strong> ${corrida.data}<br>
                <strong>Hora:</strong> ${corrida.hora}<br>
                <strong>Status:</strong> ${corrida.status}<br>
                <strong>Motorista:</strong> ${capitalizeFirstLetter(motorista.nome || motorista.NomeCompleto)}<br>
                <strong>Telefone do Motorista:</strong> ${motorista.telefone}<br>
                <strong>Cor do Carro:</strong> ${motorista.cordocarro}<br>
                <strong>Placa do Carro:</strong> ${motorista.placadocarro}<br>
                <img src="${motorista.fotoPerfil ? motorista.fotoPerfil : '../img/Rectangle 1582.png'}" alt="Foto do Motorista" width="100"><br>
                <button onclick="window.location.href='avaliar_corrida.html'">Avaliar Corrida</button>
                <button onclick="window.location.href='contato_motorista.html'">Entrar em Contato</button>
            `;
            ridesListAceitas.appendChild(listItem);
        });
    }

    // Carrega os dados ao carregar a página
    const loggedInUser = loadLoggedInUser();
    if (loggedInUser) {
        displayPassengerDetails(loggedInUser);

        const corridas = loadCorridas();
        const usuarios = loadUsuarios();
        displayRides(corridas, loggedInUser.id, usuarios);
    } else {
        alert('Usuário não está logado.');
        window.location.href = '../index.html';
    }

    btnSair.addEventListener('click', function() {
        localStorage.removeItem('loggedInUser'); // Remove o usuário logado
        window.location.href = '../index.html'; // Redireciona para a página inicial
    });
});
