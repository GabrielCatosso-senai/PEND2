const formulario = document.getElementById("formulario");
const mensagem = document.getElementById("mensagem");

formulario.addEventListener("submit", function(event){

    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();

    if(nome === "" || email === ""){

        mensagem.innerHTML = "Preencha todos os campos!";
        mensagem.style.color = "red";
        return;

    }

    mensagem.innerHTML = `Bem-vindo, ${nome}! Sua mensagem foi enviada com sucesso.`;
    mensagem.style.color = "#a855f7";

    formulario.reset();

});