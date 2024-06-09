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

   
    function loadLoggedInUser() {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        console.log('Motorista logado:', loggedInUser);
        return loggedInUser;
    }

  
    function displayPassengerDetails( motorista) {
        profileImage.src =  motorista.fotoPerfil ? motorista.fotoPerfil : '../img/Rectangle 1582.png';
        document.getElementById('nome').value =  motorista.nome;
        document.getElementById('email').value =  motorista.email;
        document.getElementById('senha').value =  motorista.senha;
        document.getElementById('repetir-senha').value =  motorista.senha;
        document.getElementById('telefone').value =  motorista.telefone;
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

   
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;
        const repetirSenha = document.getElementById('repetir-senha').value;
        const telefone = document.getElementById('telefone').value;

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

       
        if (fileInput.files.length > 0) {
            const reader = new FileReader();
            reader.onloadend = function() {
                const  motorista = {
                    ...loggedInUser,
                    nome: nome,
                    email: email,
                    senha: senha,
                    telefone: telefone,
                    fotoPerfil: reader.result
                };
                savePassengerDetails( motorista);
            };
            reader.readAsDataURL(fileInput.files[0]);
        } else {
            const  motorista = {
                ...loggedInUser,
                nome: nome,
                email: email,
                senha: senha,
                telefone: telefone,
                fotoPerfil: profileImage.src
            };
            savePassengerDetails( motorista);
        }
    });

    
    function savePassengerDetails( motorista) {

        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const loggedInUserIndex = usuarios.findIndex(user => user.id ===  motorista.id);
        if (loggedInUserIndex > -1) {
            usuarios[loggedInUserIndex] =  motorista;
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
        }

      
        localStorage.setItem('loggedInUser', JSON.stringify( motorista));

        alert('Dados atualizados com sucesso!');
        displayPassengerDetails( motorista);
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
