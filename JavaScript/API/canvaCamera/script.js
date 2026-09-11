const video = document.querySelector("#camera");
const canvas = document.querySelector("#canvas");   // ← faltava isso
const foto = document.querySelector("#foto");       // ← faltava isso
const botao = document.querySelector("#botao");

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false          // melhor deixar false
})
.then(function(stream) {
    video.srcObject = stream;
    video.play();         // importante
})
.catch(function(error) {
    console.error("Erro ao acessar a câmera: ", error);
});

botao.addEventListener("click", function() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const contexto = canvas.getContext("2d");

    contexto.drawImage(
        video,
        0,
        0,
        canvas.width,
        canvas.height
    );

    foto.src = canvas.toDataURL("image/png");
});