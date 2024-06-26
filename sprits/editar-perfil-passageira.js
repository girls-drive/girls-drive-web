'use strict';

let photo = document.getElementById('imgPhoto');
let file = document.getElementById('avatar');

photo.addEventListener('click', () => {
    file.click();
});

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    const form = document.getElementById('cadastroForm');
    const profileImage = document.getElementById('imgPhoto');
    const fileInput = document.getElementById('avatar');

    // Função para carregar os dados do passageiro logado
    function loadLoggedInUser() {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        console.log('Passageiro logado:', loggedInUser);
        return loggedInUser;
    }

    // Exibir os detalhes do passageiro
    function displayPassengerDetails(passageiro) {
        profileImage.src = passageiro.fotoPerfil ? passageiro.fotoPerfil : '../img/Rectangle 1582.png';
        document.getElementById('nome').value = passageiro.nome;
        document.getElementById('email').value = passageiro.email;
        document.getElementById('senha').value = passageiro.senha;
        document.getElementById('repetir-senha').value = passageiro.senha;
        document.getElementById('telefone').value = passageiro.telefone;
    }

    // Máscara para telefone
    document.getElementById('telefone').addEventListener('input', function(event) {
        let phone = event.target.value.replace(/\D/g, '');
        if (phone.length > 11) {
            phone = phone.slice(0, 11);
        }
        phone = phone.replace(/(\d{2})(\d)/, '($1) $2');
        phone = phone.replace(/(\d{5})(\d)/, '$1-$2');
        event.target.value = phone;
    });

    // Salvar os dados do passageiro editados
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        const repetirSenha = document.getElementById('repetir-senha').value;
        const telefone = document.getElementById('telefone').value;

        if (!nome || !email || !senha || !repetirSenha || !telefone) {
            alert('Por favor, preencha todos os campos.');
            return false;
        }
        if (senha !== repetirSenha) {
            alert('As senhas não coincidem. Por favor, digite novamente.');
            return;
        }

        const loggedInUser = loadLoggedInUser();

        if (!loggedInUser) {
            alert('Usuário não está logado.');
            window.location.href = '../index.html';
            return;
        }

        // Convertendo a foto de perfil para base64, se um novo arquivo foi selecionado
        if (fileInput.files.length > 0) {
            const reader = new FileReader();
            reader.onloadend = function() {
                const passageiro = {
                    ...loggedInUser,
                    nome: nome,
                    email: email,
                    senha: senha,
                    telefone: telefone,
                    fotoPerfil: reader.result
                };
                savePassengerDetails(passageiro);
            };
            reader.readAsDataURL(fileInput.files[0]);
        } else {
            const passageiro = {
                ...loggedInUser,
                nome: nome,
                email: email,
                senha: senha,
                telefone: telefone,
                fotoPerfil: profileImage.src
            };
            savePassengerDetails(passageiro);
        }
    });

    // Função para salvar os detalhes do passageiro
    function savePassengerDetails(passageiro) {
        // Atualizar os dados do usuário no localStorage
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const loggedInUserIndex = usuarios.findIndex(user => user.id === passageiro.id);
        if (loggedInUserIndex > -1) {
            usuarios[loggedInUserIndex] = passageiro;
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
        }

        // Atualizar os dados do usuário logado no localStorage
        localStorage.setItem('loggedInUser', JSON.stringify(passageiro));

        alert('Dados atualizados com sucesso!');
        displayPassengerDetails(passageiro);
    }

    // Carregar e exibir os dados ao carregar a página
    const loggedInUser = loadLoggedInUser();
    if (loggedInUser) {
        displayPassengerDetails(loggedInUser);
    } else {
        alert('Usuário não está logado.');
        window.location.href = '../index.html';
    }

    document.getElementById('btnSair').addEventListener('click', function() {
        localStorage.removeItem('loggedInUser');
        window.location.href = '../index.html';
    });

    // Alterar a foto de perfil
    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function() {
            profileImage.src = reader.result;
        };

        reader.readAsDataURL(file);
    });
});
