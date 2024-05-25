document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const corridaId = urlParams.get('id');
    
    if (!corridaId) {
        console.error('ID da corrida não fornecido na URL');
        window.location.href = '/';
        return;
    }
    console.log('ID da corrida:', corridaId);

    function loadCorridas() {
        const corridas = localStorage.getItem('corridas');
        return corridas ? JSON.parse(corridas) : [];
    }

    const corridas = loadCorridas();
    console.log('Corridas após parse:', corridas);

    const corrida = corridas.find(c => c.id === corridaId);
    console.log('Corrida encontrada:', corrida);

    if (!corrida) {
        console.error('Corrida não encontrada');
        document.getElementById('corrida-details').innerHTML = `
            <p>Corrida não encontrada. <a href="/">Voltar para a página inicial</a></p>
        `;
        return;
    }

    function loadUsuarios() {
        const usuarios = localStorage.getItem('usuarios');
        return usuarios ? JSON.parse(usuarios) : [];
    }

    const usuarios = loadUsuarios();
    console.log('Usuários após parse:', usuarios);

    const passageiro = usuarios.find(u => u.id === corrida.passageiro_id);
    console.log('Passageiro encontrado:', passageiro);

    if (!passageiro) {
        console.error('Passageiro não encontrado');
        document.getElementById('corrida-details').innerHTML = `
            <p>Passageiro não encontrado. <a href="/">Voltar para a página inicial</a></p>
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
                <img src="${passageiro.fotoPerfil ? passageiro.fotoPerfil: '../img/Rectangle 1582.png'}" alt="Foto do Usuário" class="profile-picture">
                <p class="nomeP">${passageiro.nome}</p>
            </div>
            <div class="corrida-info">
                <p><strong>Origem</strong> </p>
                <p>${corrida.origem}</p>
                <p><strong>Destino</strong></p>
                <p>${corrida.destino}</p>
                <p><strong>Data</strong></p>
                <p> ${corrida.data}</p>
                <p><strong>Horário</strong> 
                </p>${corrida.hora}</p>
            </div>
            <div class="contato-info">
              
                </strong></p>
                <p><strong>Telefone</strong></p>
                <p>${passageiro.telefone || 'Telefone não disponível'}</p>
               <br>
             
               
            </div>
            <button id="accept-corrida">Entrar em contato com passageiro</button>
            
        `;
    }

    displayCorridaDetails(corrida, passageiro);

    function saveCorridas(corridas) {
        localStorage.setItem('corridas', JSON.stringify(corridas));
    }

    document.getElementById('corrida-details').addEventListener('click', function(event) {
        if (event.target && event.target.id === 'accept-corrida') {
            console.log('Botão Aceitar Corrida clicado');
            aceitarCorrida(corridaId);
        } else if (event.target && event.target.id === 'whatsapp-contact') {
            console.log('Botão Contatar via WhatsApp clicado');
            contatarWhatsApp(passageiro.telefone);
        }
    });

    function aceitarCorrida(id) {
        const corridas = loadCorridas();
        const corridaIndex = corridas.findIndex(c => c.id === id);
        
        if (corridaIndex === -1) {
            console.error('Corrida não encontrada para aceitar');
            return;
        }

        const passInfo = usuarios.find(u => u.id === corridas[corridaIndex].passageiro_id);
        
        corridas[corridaIndex].status = 'aceita';
        corridas[corridaIndex].motorista_id = "2"; 
        saveCorridas(corridas);

        alert('Corrida aceita com sucesso!');

        let timerInterval;
        Swal.fire({
            title: "Aguarde um momento!",
            html: "Iniciando corrida em <b></b> milissegundos.",
            timer: 5000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector("b");
                timerInterval = setInterval(() => {
                    timer.textContent = `${Swal.getTimerLeft()}`;
                }, 100);
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
        }).then((result) => {
            contatarWhatsApp(passInfo.telefone);
        });
    }

    function clearNumber(x) {
        return x.replace(/[()\s-]/g, '');
    }

    function contatarWhatsApp(telefone) {
        if (!telefone) {
            alert('Telefone não disponível para contato via WhatsApp');
            return;
        }
        const whatsappUrl = `https://wa.me/+55${clearNumber(telefone)}`;
        window.open(whatsappUrl, '_blank');
    }
});
