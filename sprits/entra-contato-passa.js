document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const corridaId = urlParams.get('corridaId');
    
    if (!corridaId) {
        console.error('ID da corrida não fornecido na URL');
        document.getElementById('status-message').innerHTML = `
            <p>ID da corrida não fornecido na URL. <a href="../homeMotorista/index.html">Voltar para a página inicial</a></p>
        `;
        return;
    }
    console.log('ID da corrida:', corridaId);

    function loadCorridas() {
        const corridas = localStorage.getItem('corridas');
        return corridas ? JSON.parse(corridas) : [];
    }

    function loadUsuarios() {
        const usuarios = localStorage.getItem('usuarios');
        return usuarios ? JSON.parse(usuarios) : [];
    }

    function loadLoggedInUser() {
        return JSON.parse(localStorage.getItem('loggedInUser'));
    }

    const corridas = loadCorridas();
    console.log('Corridas após parse:', corridas);

    const corrida = corridas.find(c => c.id === corridaId);
    console.log('Corrida encontrada:', corrida);

    if (!corrida) {
        console.error('Corrida não encontrada');
        document.getElementById('corrida-details').innerHTML = `
            <p>Corrida não encontrada. <a href="../homeMotorista/index.html">Voltar para a página inicial</a></p>
        `;
        return;
    }

    const usuarios = loadUsuarios();
    console.log('Usuários após parse:', usuarios);

    const loggedInUser = loadLoggedInUser();
    console.log('Usuário logado:', loggedInUser);

    if (!loggedInUser) {
        console.error('Usuário não está logado');
        document.getElementById('corrida-details').innerHTML = `
            <p>Usuário não está logado. <a href="../homeMotorista/index.html">Voltar para a página inicial</a></p>
        `;
        return;
    }

    const passageiro = usuarios.find(u => u.id === corrida.passageiro_id);
    console.log('Passageiro encontrado:', passageiro);

    if (!passageiro) {
        console.error('Passageiro não encontrado');
        document.getElementById('corrida-details').innerHTML = `
            <p>Passageiro não encontrado. <a href="../homeMotorista/index.html">Voltar para a página inicial</a></p>
        `;
        return;
    }

    function displayCorridaDetails(corrida, passageiro) {
        const corridaDetailsContainer = document.getElementById('corrida-details');
        if (!corridaDetailsContainer) {
            console.error('Elemento corrida-details não encontrado no DOM');
            return;
        }
        console.log('Exibindo detalhes da corrida e do passageiro:', corrida, passageiro);
        corridaDetailsContainer.innerHTML = `
            <div class="user-details">
                <img src="${passageiro.fotoPerfil ? passageiro.fotoPerfil : '../img/Rectangle 1582.png'}" alt="Foto do Passageiro" class="profile-picture">
                <p class="nomeP">${passageiro.nome}</p>
            </div>
            <div class="corrida-info">
                <p><strong>Origem</strong></p>
                <p>${corrida.origem}</p>
                <p><strong>Destino</strong></p>
                <p>${corrida.destino}</p>
                <p><strong>Data</strong></p>
                <p>${corrida.data}</p>
                <p><strong>Horário</strong></p>
                <p>${corrida.hora}</p>
            </div>
            <div class="contato-info">
                <p><strong>Telefone do Passageiro:</strong> ${passageiro.telefone || 'Telefone não disponível'}</p>
            </div>
            <button id="contact-motorista">Entrar em contato com o passageiro</button>
        `;
    }

    displayCorridaDetails(corrida, passageiro);

    document.getElementById('corrida-details').addEventListener('click', function(event) {
        if (event.target && event.target.id === 'contact-motorista') {
            console.log('Botão Contatar Passageiro clicado');
            showContactAlert(passageiro.telefone);
        }
    });

    function clearNumber(x) {
        return x.replace(/[()\s-]/g, '');
    }

    function showContactAlert(telefone) {
        if (!telefone) {
            alert('Telefone não disponível para contato via WhatsApp');
            return;
        }

        let timerInterval;
        Swal.fire({
            title: "Aguarde um momento!",
            html: "Iniciando contato em <b></b> milissegundos.",
            timer: 5000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getHtmlContainer().querySelector('b');
                timerInterval = setInterval(() => {
                    timer.textContent = `${Swal.getTimerLeft()}`;
                }, 100);
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                contatarWhatsApp(telefone);
            }
        });
    }

    function contatarWhatsApp(telefone) {
        const whatsappUrl = `https://wa.me/+55${clearNumber(telefone)}`;
        window.open(whatsappUrl, '_blank');
    }
});
