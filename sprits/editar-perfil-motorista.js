document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    let photo = document.getElementById('imgPhoto');
    let file = document.getElementById('avatar');

    photo.addEventListener('click', () => {
        file.click();
    });

    const form = document.getElementById('cadastroForm');
    const profileImage = document.getElementById('imgPhoto');
    const fileInput = document.getElementById('avatar');

    // Função para carregar todos os usuários do JSON
    function loadUsers() {
        return JSON.parse(localStorage.getItem('usuarios')) || [];
    }

    // Função para encontrar e retornar o motorista logado
    function findLoggedInUser(users) {
        const loggedInUser = users.find(user => user.tipo === 'motorista');
        console.log('Motorista logado:', loggedInUser);
        return loggedInUser;
    }

    // Função para exibir os detalhes do motorista no formulário
    function displayDriverDetails(motorista) {
        if (motorista) {
            profileImage.src = motorista.fotoPerfil ? motorista.fotoPerfil : '../img/Rectangle 1582.png';
            document.getElementById('nome').value = motorista.nome || '';
            document.getElementById('placadocarro').value = motorista.placadocarro || '';
            document.getElementById('email').value = motorista.email || '';
            document.getElementById('senha').value = motorista.senha || '';
            document.getElementById('repetir-senha').value = motorista.senha || '';
            document.getElementById('telefone').value = motorista.telefone || '';
        }
    }

    // Adicionando evento de input para formatar o telefone
    document.getElementById('telefone').addEventListener('input', function(event) {
        let phone = event.target.value.replace(/\D/g, '');
        if (phone.length > 11) {
            phone = phone.slice(0, 11);
        }
        phone = phone.replace(/(\d{2})(\d)/, '($1) $2');
        phone = phone.replace(/(\d{5})(\d)/, '$1-$2');
        event.target.value = phone;
    });

    // Adicionando evento de submit para salvar as alterações
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const placadocarro = document.getElementById('placadocarro').value;
        const senha = document.getElementById('senha').value;
        const repetirSenha = document.getElementById('repetir-senha').value;
        const telefone = document.getElementById('telefone').value;

        if (senha !== repetirSenha) {
            alert('As senhas não coincidem. Por favor, verifique.');
            return;
        }

        let users = loadUsers();
        let motorista = findLoggedInUser(users);
        if (!motorista) {
            alert('Usuário não está logado.');
            return;
        }
        motorista.nome = nome;
        motorista.email = email;
        motorista.placadocarro = placadocarro;
        motorista.senha = senha;
        motorista.telefone = telefone;

        // Atualizando o usuário no JSON
        const index = users.findIndex(user => user.tipo === 'motorista');
        if (index !== -1) {
            users[index] = motorista;
            localStorage.setItem('usuarios', JSON.stringify(users));
        }

        // Salvando o motorista logado no localStorage
        localStorage.setItem('loggedInUser', JSON.stringify(motorista));
        console.log('Dados do motorista salvos:', motorista);
        alert('Dados do motorista salvos com sucesso!');
        window.location.href = '../PerfilMotorista/index.html';
    });

    // Adicionando evento de mudança para a foto do perfil
    fileInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                profileImage.src = event.target.result;
                let users = loadUsers();
                let motorista = findLoggedInUser(users);
                if (!motorista) {
                    alert('Usuário não está logado.');
                    return;
                }
                motorista.fotoPerfil = event.target.result;

                // Atualizando o usuário no JSON
                const index = users.findIndex(user => user.tipo === 'motorista');
                if (index !== -1) {
                    users[index] = motorista;
                    localStorage.setItem('usuarios', JSON.stringify(users));
                }

                // Salvando o motorista logado no localStorage
                localStorage.setItem('loggedInUser', JSON.stringify(motorista));
            }
            reader.readAsDataURL(file);
        }
    });

    // Carregando o motorista logado ao carregar a página
    const users = loadUsers();
    const loggedInUser = findLoggedInUser(users);
    if (loggedInUser) {
        displayDriverDetails(loggedInUser);
    }
});
