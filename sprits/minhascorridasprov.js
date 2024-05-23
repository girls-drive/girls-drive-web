document.addEventListener('DOMContentLoaded', function() {
    // Obtém o ID do passageiro logado (substitua pelo método adequado para obter o ID do passageiro logado)
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const passageiroId = loggedInUser ? loggedInUser.id : null;

    function loadCorridas() {
        const corridas = localStorage.getItem('corridas');
        return corridas ? JSON.parse(corridas) : [];
    }

    function displayCorridas(corridas, passageiroId) {
        const corridasList = document.getElementById('corridas-list');
        corridasList.innerHTML = ''; // Limpa a lista antes de exibir

        // Filtra as corridas com base no ID do passageiro
        const corridasDoPassageiro = corridas.filter(corrida => corrida.passageiro_id === passageiroId);

        if (corridasDoPassageiro.length === 0) {
            corridasList.innerHTML = '<p>Nenhuma corrida encontrada.</p>';
            return;
        }

        corridasDoPassageiro.forEach(corrida => {
            const corridaElement = document.createElement('div');
            corridaElement.className = 'corrida';
            corridaElement.innerHTML = `
                <h2>Corrida ID: ${corrida.id}</h2>
                <p><strong>Origem:</strong> ${corrida.origem}</p>
                <p><strong>Destino:</strong> ${corrida.destino}</p>
                <p><strong>Data:</strong> ${corrida.data}</p>
                <p><strong>Horário:</strong> ${corrida.hora}</p>
                <p class="${corrida.status === 'aceita' ? 'status-aceita' : 'status-agendada'}"><strong>Status:</strong> ${corrida.status === 'aceita' ? 'Aceita' : 'Agendada'}</p>
                <button class="ver-corrida-btn" data-id="${corrida.id}">Ver corrida</button>
                `;
            corridasList.appendChild(corridaElement);
        });

        // Adiciona event listener para os botões "Ver corrida"
        const verCorridaButtons = document.querySelectorAll('.ver-corrida-btn');
        verCorridaButtons.forEach(button => {
            button.addEventListener('click', function() {
                const corridaId = this.getAttribute('data-id');
                window.location.href = `../mensagens/index.html?id=${corridaId}`;
            });
        });
    }

    const corridas = loadCorridas();
    displayCorridas(corridas, passageiroId);
});
