document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('cpf').addEventListener('input', function(event) {
        let cpf = event.target.value.replace(/\D/g, '');
        if (cpf.length > 11) {
            cpf = cpf.slice(0, 11);
        }
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
        cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        event.target.value = cpf;
    });
    
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
    
    const form = document.getElementById('cadastroForm');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const inputs = form.querySelectorAll('input, select');
        let emptyField = false;
        inputs.forEach(input => {
            if (!input.value.trim()) {
                emptyField = true;
                return;
            }
        });

        if (emptyField) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const senha = document.getElementById('senha').value;
        const repetirSenha = document.getElementById('repetir-senha').value;

        if (senha.length < 6 || !/[A-Za-z]/.test(senha) || !/\d/.test(senha)) {
            alert('A senha deve ter no mínimo 6 caracteres, contendo letras e números.');
            return;
        }

        if (senha !== repetirSenha) {
            alert('As senhas não coincidem.');
            return;
        }

        const cpf = document.getElementById('cpf').value;
        const telefone = document.getElementById('telefone').value;
        const nome = document.getElementById('nome').value;
        const aniversario = document.getElementById('aniversario').value;
        const sexo = document.getElementById('sexo').value;
        const endereco = document.getElementById('endereco').value;
        const email = document.getElementById('email').value;
        const placa = document.getElementById('placa').value;
        const cor = document.getElementById('cor').value;

        if (!sexo || sexo === 'masculino') {
            alert('Somente o gênero feminino pode se cadastrar.');
            return;
        }

        const identidade = document.getElementById('anexo').files[0];
        const identidadeURL = identidade ? await uploadFileToServer(identidade) : '';

        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        const novoUsuario = {
            id: (usuarios.length + 1).toString(),
            cpf,
            telefone,
            nome,
            datadeNascimento: aniversario,
            genero: sexo,
            endereco,
            email,
            senha,
            identidade: identidadeURL,
            tipo: 'motorista',
            placa,
            cor
        };

        usuarios.push(novoUsuario);

        try {
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
            alert('Cadastro realizado com sucesso!');
            form.reset();
        } catch (e) {
            alert('Erro ao salvar os dados. O limite de armazenamento foi excedido.');
        }
    });

    function uploadFileToServer(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const simulatedURL = `https://example.com/uploads/${file.name}`;
                resolve(simulatedURL);
            };
            reader.onerror = error => reject(error);
        });
    }
});