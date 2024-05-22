// Função para carregar as corridas do Local Storage
function loadCorridas() {
    const corridas = localStorage.getItem('corridas');
    return corridas ? JSON.parse(corridas) : [];
}

// Função para salvar as corridas no Local Storage
function saveCorridas(corridas) {
    localStorage.setItem('corridas', JSON.stringify(corridas));
}

// Função para registrar as corridas no console do navegador
function logCorridasNoConsole() {
    const corridas = loadCorridas();
    console.log('Corridas cadastradas:', corridas);
}

// Função para cadastrar uma nova corrida
function cadastrarCorrida(event) {
    event.preventDefault(); // Evita o comportamento padrão de recarregar a página

    // Captura os valores dos campos de entrada
    const origem = document.getElementById('circleFrom').value;
    const destino = document.getElementById('circleTo').value;
    const data = document.getElementById('date').value;
    const hora = document.getElementById('time').value;

    // Valida se todos os campos estão preenchidos
    if (!origem || !destino || !data || !hora) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Verifica se o usuário está logado
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
        alert('Usuário não está logado.');
        return;
    }

    // Obtém o ID do passageiro logado
    const passageiro_id = loggedInUser.id;

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
        passageiro_id: passageiro_id, // ID do passageiro logado
        motorista_id: "2" // ID do motorista (substitua pelo ID do motorista atribuído à corrida)
    };

    // Adiciona a nova corrida à lista de corridas
    corridas.push(novaCorrida);

    // Salva a lista atualizada de corridas no Local Storage
    saveCorridas(corridas);

    // Exibe uma mensagem de sucesso
    alert('Pedido de corrida recebido com sucesso!');

    // Log as corridas no console
    logCorridasNoConsole();
}

// Adiciona um evento de submit ao formulário
document.getElementById('rideForm').addEventListener('submit', cadastrarCorrida);

// Log as corridas no console ao carregar a página
document.addEventListener('DOMContentLoaded', logCorridasNoConsole);

// Função para sair
document.getElementById('btnSair').addEventListener('click', function() {
    localStorage.removeItem('loggedInUser'); // Remove o usuário logado
    window.location.href = '../index.html'; // Redireciona para a página inicial
});
