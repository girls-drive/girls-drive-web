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
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        console.log('Usuários carregados:', usuarios);
        return usuarios;
    }

    // Função para carregar o motorista logado do localStorage
    function loadLoggedInUser() {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        console.log('Motorista logado carregado:', loggedInUser);
        return loggedInUser;
    }

    // Função para exibir os detalhes do motorista no formulário
    function displayDriverDetails(motorista) {
        if (motorista) {
            profileImage.src = motorista.fotoPerfil ? motorista.fotoPerfil : '../img/Rectangle 1582.png';
            document.getElementById('nome').value = motorista.nome || '';
            document.getElementById('placadocarro').value = motorista.placa || '';
            document.getElementById('cordocarro').value = motorista.cor || ''; // Campo da cor do carro
            document.getElementById('email').value = motorista.email || '';
            document.getElementById('senha').value = motorista.senha || '';
            document.getElementById('repetir-senha').value = motorista.senha || '';
            document.getElementById('telefone').value = motorista.telefone || '';
            console.log('Detalhes do motorista exibidos no formulário:', motorista);
        } else {
            console.error('Nenhum motorista encontrado para exibição.');
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

    // Função para validar o formulário
    function validateForm() {
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const placa = document.getElementById('placadocarro').value.trim();
        const cor = document.getElementById('cordocarro').value.trim();
        const senha = document.getElementById('senha').value.trim();
        const repetirSenha = document.getElementById('repetir-senha').value.trim();
        const telefone = document.getElementById('telefone').value.trim();

        if (!nome || !email || !placa || !cor || !senha || !repetirSenha || !telefone) {
            alert('Por favor, preencha todos os campos.');
            return false;
        }

        if (senha !== repetirSenha) {
            alert('As senhas não coincidem. Por favor, verifique.');
            return false;
        }

        return true;
    }

    // Adicionando evento de submit para salvar as alterações
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const placa = document.getElementById('placadocarro').value.trim();
        const cor = document.getElementById('cordocarro').value.trim();
        const senha = document.getElementById('senha').value.trim();
        const repetirSenha = document.getElementById('repetir-senha').value.trim();
        const telefone = document.getElementById('telefone').value.trim();

        let users = loadUsers();
        let motorista = loadLoggedInUser();
        if (!motorista) {
            alert('Usuário não está logado.');
            return;
        }

        motorista.nome = nome;
        motorista.email = email;
        motorista.placa = placa;
        motorista.cor = cor;
        motorista.senha = senha;
        motorista.telefone = telefone;

        console.log('Dados do motorista atualizados:', motorista);

        // Atualizando o usuário no JSON
        const index = users.findIndex(user => user.id === motorista.id);
        if (index !== -1) {
            users[index] = motorista;
            localStorage.setItem('usuarios', JSON.stringify(users));
            console.log('Usuários atualizados no localStorage:', users);
        }

        // Salvando o motorista logado no localStorage
        localStorage.setItem('loggedInUser', JSON.stringify(motorista));
        console.log('Motorista logado atualizado no localStorage:', motorista);
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
                let motorista = loadLoggedInUser();
                if (!motorista) {
                    alert('Usuário não está logado.');
                    return;
                }
                motorista.fotoPerfil = event.target.result;

                console.log('Foto do motorista atualizada:', motorista.fotoPerfil);

                // Atualizando o usuário no JSON
                const index = users.findIndex(user => user.id === motorista.id);
                if (index !== -1) {
                    users[index] = motorista;
                    localStorage.setItem('usuarios', JSON.stringify(users));
                    console.log('Usuários atualizados no localStorage:', users);
                }

                localStorage.setItem('loggedInUser', JSON.stringify(motorista));

                alert('Dados atualizados com sucesso!');
                displayDriverDetails(motorista);
            };
            reader.readAsDataURL(file);
        }
    });

    // Carregando o motorista logado ao carregar a página
    const loggedInUser = loadLoggedInUser();
    if (loggedInUser) {
        displayDriverDetails(loggedInUser);
    } else {
        alert('Usuário não está logado.');
        window.location.href = '../index.html';
    }
});
