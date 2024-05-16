// Função para processar a solicitação de recuperação de senha
function forgotPassword() {
    const email = document.getElementById('email').value;
    
    // Verifica se o email está associado a algum usuário cadastrado
    const usuario = db_usuarios.usuarios.find(user => user.email === email);
    
    if (usuario) {
        // Se o email estiver associado a um usuário cadastrado, armazena a senha esquecida no localStorage
        localStorage.setItem('forgotPassword', usuario.senha);
        alert('Sua senha foi enviada para o seu email cadastrado.');
    } else {
        alert('Email não encontrado. Por favor, verifique o email digitado.');
    }
}

// Adiciona um evento de clique ao link "Esqueci minha senha"
document.querySelector('.forgot-password').addEventListener('click', function(event) {
    event.preventDefault(); // Evita que o link recarregue a página
    forgotPassword();
});

var db_usuarios = {
    usuarios: [
        { "id": "1", "login": "admin", "senha": "123", "nome": "Administrador do Sistema", "email": "admin@abc.com", "tipo": "motorista" },
        { "id": "2", "login": "user", "senha": "123", "nome": "Usuario Comum", "email": "user@abc.com", "tipo": "passageiro" }
    ]
};

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

    // Verifica se o usuário está cadastrado no banco de dados
    const usuarioCadastrado = db_usuarios.usuarios.find(usuario => usuario.email === email && usuario.senha === senha);
    
    if (usuarioCadastrado) {
        // Se o usuário estiver cadastrado, verifica se o tipo de usuário selecionado coincide com o tipo cadastrado
        if (usuarioCadastrado.tipo === tipoUsuario) {
            // Se coincidir, redireciona para a página inicial correspondente ao tipo de usuário
            if (tipoUsuario === 'passageiro') {
                window.location.href = '../home-passageiro.html';
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
