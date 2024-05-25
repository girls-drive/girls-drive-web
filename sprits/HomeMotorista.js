document.addEventListener('DOMContentLoaded', function() {
    const ridesContainer = document.getElementById('ridesContainer');
    const searchOrigin = document.getElementById('searchOrigin');
    const searchDestination = document.getElementById('searchDestination');
    const searchButton = document.getElementById('searchButton');

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

    // Função para exibir as corridas na tela
    function displayCorridas(filteredCorridas) {
        const usuarios = loadUsuarios();
        ridesContainer.innerHTML = '';

        filteredCorridas.forEach(corrida => {
            const passageiro = usuarios.find(user => user.id === corrida.passageiro_id);
            if (passageiro) {
                const rideElement = document.createElement('div');
                rideElement.classList.add('ride');

                rideElement.innerHTML = `
                    <div class="profile">
                        <img src="${passageiro.fotoPerfilfotoPerfil ? passageiro.fotoPerfil: '../img/Rectangle 1582.png'}" alt="Foto de Perfil">
                        <div class="details">
                            <p class="nickname">${passageiro.nome || passageiro.NomeCompleto}</p>
                        </div>
                    </div>
                    <div class="details">
                        <p><strong>Origem</strong></p>
                        <p>${corrida.origem}</p>
                        <p><strong>Destino</strong></p>
                        <p>${corrida.destino}</p>
                    </div>
                    <button class="select-button" data-id="${corrida.id}">Aceitar corrida</button>
                `;

                ridesContainer.appendChild(rideElement);
            }
        });
    }

    // Função para filtrar corridas com base na pesquisa
    function filterCorridas() {
        const originValue = searchOrigin.value.toLowerCase();
        const destinationValue = searchDestination.value.toLowerCase();
        const corridas = loadCorridas();

        const filteredCorridas = corridas.filter(corrida => {
            const origemMatch = corrida.origem.toLowerCase().includes(originValue);
            const destinoMatch = corrida.destino.toLowerCase().includes(destinationValue);
            return origemMatch && destinoMatch;
        });

        displayCorridas(filteredCorridas);
    }

    // Event listener para o botão de pesquisa
    searchButton.addEventListener('click', filterCorridas);

    // Carrega as corridas ao carregar a página
    displayCorridas(loadCorridas());

    // Event listener para os botões "Selecionar"
    ridesContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('select-button')) {
            const corridaId = event.target.getAttribute('data-id');
            // Redirecionar para a página de aceitação de corrida com o ID da corrida na URL
            window.location.href = `../aceitar-corrida/index.html?id=${corridaId}`;
        }
    });

    // Função para cadastrar uma nova corrida
    function cadastrarCorrida(event) {
        event.preventDefault(); // Evita o comportamento padrão de recarregar a página

        // Captura os valores dos campos de entrada
        const origem = document.getElementById('circleFrom').value;
        const destino = document.getElementById('circleTo').value;
        const data = document.getElementById('date').value;
        const hora = document.getElementById('time').value;
        const email = document.getElementById('email').value;

        // Valida se todos os campos estão preenchidos
        if (!origem || !destino || !data || !hora || !email) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Verifica se o email já existe entre os motoristas
        const usuarios = loadUsuarios();
        const motoristas = usuarios.filter(usuario => usuario.tipo === 'motorista');
        const emailMotoristas = motoristas.map(motorista => motorista.email);
        if (emailMotoristas.includes(email)) {
            alert('Este email já está cadastrado para um motorista.');
            return;
        }

        // Carrega as corridas existentes
        const corridas = loadCorridas();

        // Cria um novo ID para a corrida
        const newId = corridas.length > 0 ? (parseInt(corridas[corridas.length - 1].id) + 1).toString() : "1";

        // Cria um objeto com os dados da nova corrida
        const novaCorrida = {
            id: newId,
            origem: origem,
            destino: destino,
            data: data,
            hora: hora,
            status: "agendada", // Status inicial da corrida
            passageiro_id: "1", // ID do passageiro (substitua pelo ID do passageiro logado)
            motorista_id: "2" // ID do motorista (substitua pelo ID do motorista atribuído à corrida)
        };

        // Adiciona a nova corrida à lista de corridas
        corridas.push(novaCorrida);

        // Salva a lista atualizada de corridas no Local Storage
        localStorage.setItem('corridas', JSON.stringify(corridas));

        // Exibe uma mensagem de sucesso
        alert('Pedido de corrida recebido com sucesso!');

        // Log as corridas no console
        console.log('Corridas cadastradas:', corridas);
    }

    // Adiciona um evento de submit ao formulário
    document.getElementById('rideForm').addEventListener('submit', cadastrarCorrida);

    document.getElementById('btnSair').addEventListener('click', function() {
        
        localStorage.removeItem('usuarioAtual'); // ou qualquer chave específica do usuário
      
        window.location.href = '../index.html'; // 
    });

   
});
