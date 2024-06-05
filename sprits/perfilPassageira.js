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
    function displayPassengerDetails(passageiro) {
        document.getElementById('profileImage').src = passageiro.fotoPerfil ? passageiro.fotoPerfil : '../img/Rectangle 1582.png';

        document.getElementById('passengerName').textContent = capitalizeFirstLetter(passageiro.nome);
        document.getElementById('passengerPhone').textContent = `Telefone: ${passageiro.telefone}`;
        document.getElementById('passengerEmail').textContent = `Email: ${passageiro.email}`;
    }

    // Função para exibir as corridas do passageiro logado
    function displayPassengerRides(corridas, passageiroId) {
        ridesList.innerHTML = '';

        const passengerRides = corridas.filter(corrida => corrida.passageiro_id === passageiroId);

        passengerRides.forEach(corrida => {
            const listItem = document.createElement('li');
            listItem.textContent = `${corrida.origem} para ${corrida.destino} em ${corrida.data} às ${corrida.hora} - Status: ${corrida.status}`;listItem.textContent = `${passageiro.nome}
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
function displayPassengerRides(corridas, passageiroId) {
    console.log('Corridas recebidas:', corridas);
    console.log('ID do passageiro:', passageiroId);

    ridesList.innerHTML = '';

    const passengerRides = corridas.filter(corrida => corrida.passageiro_id === passageiroId);
    console.log('Corridas do passageiro:', passengerRides);

    const loggedInUser = loadLoggedInUser(); // Obter o passageiro logado
    console.log('Passageiro logado:', loggedInUser);

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
                               ${corrida.hora}`;

        ridesList.appendChild(listItem);
    });
}


    // Carrega os dados ao carregar a página
    const loggedInUser = loadLoggedInUser();
    if (loggedInUser) {
        displayPassengerDetails(loggedInUser);

        const corridas = loadCorridas();
        displayPassengerRides(corridas, loggedInUser.id);
    } else {
        alert('Usuário não está logado.');
        window.location.href = '../index.html';
    }

    document.getElementById('btnSair').addEventListener('click', function() {
        localStorage.removeItem('loggedInUser'); // Remove o usuário logado
        window.location.href = '../index.html'; // Redireciona para a página inicial
    });
});
