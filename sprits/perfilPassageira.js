document.addEventListener('DOMContentLoaded', function() {
    const ridesList = document.getElementById('ridesList');
    const btnSair = document.getElementById('btnSair');
    
    if (!ridesList) {
        console.error('Elemento ridesList não encontrado no DOM');
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

    // Função para carregar os dados do motorista logado
    function loadLoggedInUser() {
        return JSON.parse(localStorage.getItem('loggedInUser'));
    }

    // Função para capitalizar a primeira letra de cada palavra
    function capitalizeFirstLetter(str) {
        return str.replace(/\b\w/g, function(char) {
            return char.toUpperCase();
        });
    }

    // Função para exibir os dados do motorista
    function displayMotoristaDetails(motorista) {
        document.getElementById('profileImage').src = motorista.fotoPerfil ? motorista.fotoPerfil : '../img/Rectangle 1582.png';
        document.getElementById('passengerName').textContent = capitalizeFirstLetter(motorista.nome || motorista.NomeCompleto);
        document.getElementById('passengerPhone').textContent = `Telefone: ${motorista.telefone}`;
        document.getElementById('passengerEmail').textContent = `Email: ${motorista.email}`;
    }

    // Função para exibir as corridas aceitas pelo motorista logado
    function displayMotoristaRides(corridas, motoristaId) {
        ridesList.innerHTML = '';

        const motoristaRides = corridas.filter(corrida => corrida.motorista_id === motoristaId && corrida.status === 'aceita');

        motoristaRides.forEach(corrida => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                Origem: ${corrida.origem}<br>
                Destino: ${corrida.destino}<br>
                Data: ${corrida.data}<br>
                Hora: ${corrida.hora}<br>
                Status: ${corrida.status}
            `;
            ridesList.appendChild(listItem);
        });
    }

    // Carrega os dados ao carregar a página
    const loggedInUser = loadLoggedInUser();
    if (loggedInUser) {
        displayMotoristaDetails(loggedInUser);

        const corridas = loadCorridas();
        displayMotoristaRides(corridas, loggedInUser.id);
    } else {
        alert('Usuário não está logado.');
        window.location.href = '../index.html';
    }

    btnSair.addEventListener('click', function() {
        localStorage.removeItem('loggedInUser'); // Remove o usuário logado
        window.location.href = '../index.html'; // Redireciona para a página inicial
    });
});
