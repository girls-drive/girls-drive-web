document.addEventListener('DOMContentLoaded', function() {
    const passageiroId = "1"; // ID do passageiro (substitua pelo ID do passageiro logado)

    function loadCorridas() {
        const corridas = localStorage.getItem('corridas');
        return corridas ? JSON.parse(corridas) : [];
    }

    function displayCorridas(corridas, passageiroId) {
        const corridasList = document.getElementById('corridas-list');
        corridasList.innerHTML = ''; // Limpa a lista antes de exibir

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
                <button>Ver corrida</button>
                `;
            corridasList.appendChild(corridaElement);
        });
    }

    const corridas = loadCorridas();
    displayCorridas(corridas, passageiroId);
});