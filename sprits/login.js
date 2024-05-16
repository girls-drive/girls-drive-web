// Função para processar o login com base nas escolhas de passageiro ou motorista
function processLogin() {
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    let tipoUsuario;

    // Verifica qual tipo de usuário foi selecionado
    if (document.getElementById('passageiro').checked) {
        tipoUsuario = 'passageiro';
    } else if (document.getElementById('motorista').checked) {
        tipoUsuario = 'motorista';
    } else {
        // Se nenhum tipo de usuário for selecionado, exibe uma mensagem de erro
        alert('Por favor, selecione o tipo de usuário.');
        return;
    }

    // Carrega os dados de usuários do localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verifica se o usuário está cadastrado no localStorage
    const usuarioCadastrado = usuarios.find(usuario => usuario.email === email && usuario.senha === senha);

    if (usuarioCadastrado) {
        // Se o usuário estiver cadastrado, verifica se o tipo de usuário selecionado coincide com o tipo cadastrado
        if (usuarioCadastrado.tipo === tipoUsuario) {
            // Se coincidir, armazena os dados de login no localStorage
            localStorage.setItem('loggedInUser', JSON.stringify(usuarioCadastrado));

            // Redireciona para a página inicial correspondente ao tipo de usuário
            if (tipoUsuario === 'passageiro') {
                window.location.href = '../homePassageira/index.html';
            } else {
                window.location.href = '../home-motorista.html';
            }
        } else {
            alert('O tipo de usuário selecionado não corresponde ao cadastrado.');
        }
    } else {
        alert('Usuário não cadastrado. Por favor, realize o cadastro.');
    }
}

// Adiciona um evento de clique ao botão de login
document.querySelector('.login-button').addEventListener('click', function(event) {
    event.preventDefault(); // Evita que o formulário seja enviado
    processLogin();
});
