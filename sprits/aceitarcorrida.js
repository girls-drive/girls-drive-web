document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const corridaId = urlParams.get('id');
    
    // Verificar se o ID da corrida está presente na URL
    if (!corridaId) {
        console.error('ID da corrida não fornecido na URL');
        // Redirecionar para a página inicial ou exibir uma mensagem de erro
        window.location.href = '/'; // Redirecionar para a página inicial
        return;
    }
    console.log('ID da corrida:', corridaId);

    // Função para carregar as corridas do Local Storage
    function loadCorridas() {
        const corridas = localStorage.getItem('corridas');
        console.log('Corridas carregadas do Local Storage:', corridas);
        return corridas ? JSON.parse(corridas) : [];
    }

    // Carregar as corridas
    const corridas = loadCorridas();
    console.log('Corridas após parse:', corridas);

    // Encontrar a corrida com o ID correspondente
    const corrida = corridas.find(c => c.id === corridaId);
    console.log('Corrida encontrada:', corrida);

    // Verificar se a corrida foi encontrada
    if (!corrida) {
        // Corrida não encontrada, redirecionar ou exibir mensagem de erro
        console.error('Corrida não encontrada');
        document.getElementById('corrida-details').innerHTML = `
            <p>Corrida não encontrada. <a href="/">Voltar para a página inicial</a></p>
        `;
        return;
    }

    // Exibir detalhes da corrida
    displayCorridaDetails(corrida);

    // Função para exibir os detalhes da corrida na página
    function displayCorridaDetails(corrida) {
        const corridaDetailsContainer = document.getElementById('corrida-details');
        if (!corridaDetailsContainer) {
            console.error('Elemento corrida-details não encontrado no DOM');
            return;
        }
        console.log('Exibindo detalhes da corrida:', corrida);
        corridaDetailsContainer.innerHTML = `
            <h2>Detalhes da Corrida</h2>
            <p><strong>Destino:</strong> ${corrida.destino}</p>
            <p><strong>Origem:</strong> ${corrida.origem}</p>
            <p><strong>Data:</strong> ${corrida.data}</p>
            <p><strong>Horário:</strong> ${corrida.hora}</p>
            <p><strong>Motorista ID:</strong> ${corrida.motorista_id}</p>
            <p><strong>Passageiro ID:</strong> ${corrida.passageiro_id}</p>
            <p><strong>Rating:</strong> ${corrida.rating}</p>
            <p><strong>Status:</strong> ${corrida.status}</p>
            <button id="accept-corrida">Aceitar Corrida</button>
        `;
    }

    // Event listener para aceitar a corrida
    document.getElementById('corrida-details').addEventListener('click', function(event) {
        if (event.target && event.target.id === 'accept-corrida') {
            // Aqui você pode adicionar a lógica para aceitar a corrida
            // Por exemplo, você pode exibir uma mensagem de confirmação ou realizar uma ação específica
            alert('Corrida aceita!');
        }
    });
});
