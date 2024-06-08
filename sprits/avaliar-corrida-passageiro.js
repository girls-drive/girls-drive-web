
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('avaliarForm');
    const urlParams = new URLSearchParams(window.location.search);
    const corridaId = urlParams.get('corridaId');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const rating = document.querySelector('input[name="rating"]:checked').value;
        const comentario = document.getElementById('comentario').value;

        let corridas = localStorage.getItem('corridas');
        if (corridas) {
            corridas = JSON.parse(corridas);
            const corrida = corridas.find(c => c.id.toString() === corridaId);
            if (corrida) {
                corrida.avaliacao = {
                    nota: rating,
                    comentario: comentario
                };
                localStorage.setItem('corridas', JSON.stringify(corridas));
                alert('Avaliação enviada com sucesso!');
                window.location.href = '../PerfilPassageira/index.html'; 
            } else {
                alert('Corrida não encontrada.');
            }
        } else {
            alert('Nenhuma corrida encontrada.');
        }
    });
});