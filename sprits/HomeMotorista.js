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
                        <img src="${passageiro.fotoPerfil}" alt="Foto de Perfil">
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
                    <button class="select-button" data-id="${corrida.id}">Selecionar</button>
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
});
