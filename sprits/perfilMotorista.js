document.addEventListener('DOMContentLoaded', function() {
    const ridesList = document.getElementById('ridesList');

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

    // Função para carregar os dados do passageiro logado
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
    function displayPassengerDetails(motorista) {
        document.getElementById('profileImage').src = motorista.fotoPerfil ? motorista.fotoPerfil : '../img/Rectangle 1582.png';

        document.getElementById('passengerName').textContent = capitalizeFirstLetter(motorista.nome);
        document.getElementById('passengerPhone').textContent = `Telefone: ${motorista.telefone}`;
        document.getElementById('passengerEmail').textContent = `Email: ${motorista.email}`;
    }

    // Função para exibir as corridas do motorista logado
    function displayPassengerRides(corridas, motoristaId) {
        ridesList.innerHTML = '';

        const passengerRides = corridas.filter(corrida => corrida.motorista_id === motoristaId);

        passengerRides.forEach(corrida => {
            const listItem = document.createElement('li');
            listItem.textContent = `${corrida.origem} para ${corrida.destino} em ${corrida.data} às ${corrida.hora} - Status: ${corrida.status}`;listItem.textContent = `${motorista.nome}
            Origem
            ${corrida.origem}
            Destino
            ${corrida.destino}
            Data
            ${corrida.data}
            Hora
            ${corrida.hora}`;

            ridesList.appendChild(listItem);
        });
    }
 // Função para carregar as corridas do Local Storage
function loadCorridas() {
    const corridas = localStorage.getItem('corridas');
    console.log('Corridas no armazenamento local:', corridas);
    return corridas ? JSON.parse(corridas) : [];
}

// Função para carregar os dados do passageiro logado
function loadLoggedInUser() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    console.log('Passageiro logado:', loggedInUser);
    return loggedInUser;
}

// Função para exibir as corridas do passageiro logado
function displayPassengerRides(corridas, motoristaId) {
    console.log('Corridas recebidas:', corridas);
    console.log('ID do passageiro:', motoristaId);

    ridesList.innerHTML = '';

    const passengerRides = corridas.filter(corrida => corrida.motorista_id === motoristaId);
    console.log('Corridas do motorista:', passengerRides);

    const loggedInUser = loadLoggedInUser(); // Obter o passageiro logado
    console.log('motorista logado:', loggedInUser);

    passengerRides.forEach(corrida => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${loggedInUser.nome}<br>
                               Origem<br>
                               ${corrida.origem}<br>
                               Destino<br>
                               ${corrida.destino}<br>
                               Data<br>
                               ${corrida.data}<br>
                               Hora<br>
                               ${corrida.hora}
                               `;

        ridesList.appendChild(listItem);
    });
}


    // Carrega os dados ao carregar a página
    const loggedInUser = loadLoggedInUser();
    if (loggedInUser) {
        displaydriverDetails(loggedInUser);

        const corridas = loadCorridas();
        displaydriverRides(corridas, loggedInUser.id);
    } else {
        alert('Usuário não está logado.');
        window.location.href = '../index.html';
    }

    document.getElementById('btnSair').addEventListener('click', function() {
        localStorage.removeItem('loggedInUser'); // Remove o usuário logado
        window.location.href = '../index.html'; // Redireciona para a página inicial
    });
});
