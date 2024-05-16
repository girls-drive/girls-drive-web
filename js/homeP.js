document.getElementById("cadastro-btn").addEventListener("click", function() {
    var optionsDiv = document.getElementById("cadastro-options");
    if (optionsDiv.style.display === "none") {
        optionsDiv.style.display = "block";
    } else {
        optionsDiv.style.display = "none";
    }
});

document.getElementById("cadastro-passageiro").addEventListener("click", function() {
    alert("Você selecionou cadastrar como passageiro!");

});

document.getElementById("cadastro-motorista").addEventListener("click", function() {
    alert("Você selecionou cadastrar como motorista!");
  
});
