document.addEventListener('DOMContentLoaded', function() {
    const ridesContainer = document.getElementById('ridesContainer');

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
    function displayCorridas() {
        const corridas = loadCorridas();
        const usuarios = loadUsuarios();
        ridesContainer.innerHTML = '';

        corridas.forEach(corrida => {
            const passageiro = usuarios.find(user => user.id === corrida.passageiro_id);
            if (passageiro) {
                const rideElement = document.createElement('div');
                rideElement.classList.add('ride');

                rideElement.innerHTML = `
                    <div class="profile">
                        <img src="${passageiro.fotoPerfil}" alt="Foto de Perfil">
                        <div class="details">
                        
                            <p>${passageiro.nome || passageiro.NomeCompleto}</p>
                        </div>
                    </div>
                    <div class="details">
                        <p><strong>Origem</strong></p>
                        <p> ${corrida.origem}</p>
                        <p><strong>Destino</strong></p>
                        <p> ${corrida.destino}</p>
                    </div>
                    <button class="select-button" data-id="${corrida.id}">Selecionar</button>
                `;

                ridesContainer.appendChild(rideElement);
            }
        });
    }

    // Carrega as corridas ao carregar a página
    displayCorridas();

    // Event listener para os botões "Selecionar"
    ridesContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('select-button')) {
            const corridaId = event.target.getAttribute('data-id');
            alert(`Corrida ${corridaId} selecionada!`);
        }
    });
});
