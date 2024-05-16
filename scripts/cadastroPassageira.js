function cadastrar(e) {
    e.preventDefault()
    e.stopPropagation()

    var cpf = document.getElementById("cpf")
    var nome = document.getElementById("nome")
    var aniversario = document.getElementById("aniversario")
    var genero = document.getElementById("genero")
    var endereco = document.getElementById("endereco")
    var tel = document.getElementById("tel")
    var email = document.getElementById("email")
    var senha = document.getElementById("senha")
    var repitaSenha = document.getElementById("repitaSenha")

    if (cpf.value === "") {
        return
    }

    var passageira = {
        cpf: cpf.value,
        nome: nome.value,
        aniversario: aniversario.value,
        genero: genero.value,
        endereco: endereco.value,
        tel: tel.value,
        email: email.value,
        senha: senha.value,
    }

    var passageiras = JSON.parse(localStorage.getItem(LS_PASSAGEIRAS))
    if (!passageiras) {
        passageiras = []
    }

    passageiras.push(passageira)

    localStorage.setItem(LS_PASSAGEIRAS, JSON.stringify(passageiras))

    alert("Passageira cadastrada com sucesso!")

}