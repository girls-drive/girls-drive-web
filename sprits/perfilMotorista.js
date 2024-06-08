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

    // Função para carregar os dados do motorista logado
    function loadLoggedInUser() {
        return JSON.parse(localStorage.getItem('loggedInUser'));
    }

    // Função para carregar todos os usuários
    function loadUsuarios() {
        const usuarios = localStorage.getItem('usuarios');
        return usuarios ? JSON.parse(usuarios) : [];
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
    function displayMotoristaRides(corridas, usuarios, motoristaId) {
        ridesList.innerHTML = '';

        const motoristaRides = corridas.filter(corrida => {
            console.log(`Corrida: ${JSON.stringify(corrida)}`);
            return corrida.motorista_id === motoristaId && corrida.status === 'aceita';
        });

        if (motoristaRides.length === 0) {
            ridesList.innerHTML = '<li>Nenhuma corrida aceita encontrada.</li>';
            return;
        }

        motoristaRides.forEach(corrida => {
            const passageiro = usuarios.find(u => u.id === corrida.passageiro_id);
            if (!passageiro) {
                console.error(`Passageiro com ID ${corrida.passageiro_id} não encontrado.`);
                return;
            }

            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <div style="text-align: center;">
                    <img src="${passageiro.fotoPerfil ? passageiro.fotoPerfil : '../img/Rectangle 1582.png'}" alt="Foto do Passageiro" width="100"><br>
                    <strong>Passageiro:</strong> ${capitalizeFirstLetter(passageiro.nome || passageiro.NomeCompleto)}
                </div>
                <div style="text-align: center;">
                    Origem: ${corrida.origem}<br>
                    Destino: ${corrida.destino}<br>
                    <strong>Telefone do Passageiro:</strong> ${passageiro.telefone}<br>
                    Data: ${corrida.data}<br>
                    Hora: ${corrida.hora}<br>
                    Status: ${corrida.status}
                </div>
                <div style="text-align: center;">
                    <strong>Avaliação da passageira:</strong> ${corrida.avaliacao ? `${corrida.avaliacao.nota} estrelas - ${corrida.avaliacao.comentario}` : 'Nenhuma avaliação ainda'}
                </div>
            `;
            ridesList.appendChild(listItem);
        });
    }

    // Carrega os dados ao carregar a página
    const loggedInUser = loadLoggedInUser();
    if (loggedInUser) {
        console.log(`Motorista logado: ${JSON.stringify(loggedInUser)}`);
        displayMotoristaDetails(loggedInUser);

        const corridas = loadCorridas();
        const usuarios = loadUsuarios();
        console.log(`Corridas carregadas: ${JSON.stringify(corridas)}`);
        console.log(`Usuários carregados: ${JSON.stringify(usuarios)}`);
        displayMotoristaRides(corridas, usuarios, loggedInUser.id);
    } else {
        alert('Usuário não está logado.');
        window.location.href = '../index.html';
    }

    btnSair.addEventListener('click', function() {
        localStorage.removeItem('loggedInUser'); // Remove o usuário logado
        window.location.href = '../index.html'; // Redireciona para a página inicial
    });
});
