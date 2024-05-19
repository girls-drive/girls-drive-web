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



    document.getElementById('btnSair').addEventListener('click', function() {
        // Limpar o localStorage ou executar qualquer outra ação de logout aqui
        localStorage.clear(); // Isso limpará todos os dados salvos no localStorage
        // Após o logout, redirecione o usuário para a página de login ou para a página inicial
        window.location.href = '../index.html'; // Substitua 'login.html' pelo caminho correto da sua página de login
    });

