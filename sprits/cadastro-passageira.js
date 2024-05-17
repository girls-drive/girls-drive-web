document.addEventListener('DOMContentLoaded', function() {
    // Máscara para CPF
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

        // Verifica se algum campo está vazio
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

        // Validação da senha
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

        // Verifica se o gênero é feminino
        const sexo = document.getElementById('sexo').value;
        if (sexo !== 'feminino') {
            alert('Somente o gênero feminino pode se cadastrar.');
            return;
        }

        // Obter os valores dos campos
        const cpf = document.getElementById('cpf').value;
        const telefone = document.getElementById('telefone').value;
        const nome = document.getElementById('nome').value;
        const aniversario = document.getElementById('aniversario').value;
        const endereco = document.getElementById('endereco').value;
        const email = document.getElementById('email').value;

        // Converter o arquivo de identidade em base64
        const identidade = document.getElementById('anexo').files[0];
        const identidadeBase64 = identidade ? await fileToBase64(identidade) : '';

        // Carregar usuários existentes do localStorage ou inicializar um array vazio
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Criar novo usuário
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
            identidade: identidadeBase64,
            tipo: 'passageiro'
        };

        // Adicionar novo usuário à lista
        usuarios.push(novoUsuario);

        // Salvar usuários no localStorage
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        alert('Cadastro realizado com sucesso!');
        form.reset();
    });

    function fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
});
