document.getElementById("cadastro-btn").addEventListener("click", function() {
    var optionsDiv = document.getElementById("cadastro-options");
    if (optionsDiv.style.display === "none") {
        optionsDiv.style.display = "block";
    } else {
        optionsDiv.style.display = "none";
    }
});

document.getElementById("cadastro-passageiro").addEventListener("click", function() {
    

});

document.getElementById("cadastro-motorista").addEventListener("click", function() {
    alert("Você selecionou cadastrar como motorista!");
  
});
function menuOnClick() {
    document.getElementById("menu-bar").classList.toggle("change");
    document.getElementById("nav").classList.toggle("change");
    document.getElementById("menu-bg").classList.toggle("change-bg");
  }
