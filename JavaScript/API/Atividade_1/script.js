document.addEventListener("DOMContentLoaded", function () {
    const img = document.getElementById("statusImg");
    const latEl = document.getElementById("latitude");
    const lonEl = document.getElementById("longitude");
    const precEl = document.getElementById("precisao");
    const video = document.getElementById("camera");
    const btnLocalizacao = document.getElementById("btnLocalizacao");
    const btnCamera = document.getElementById("btnCamera");
    const btnTirarFoto = document.getElementById("btnTirarFoto");
    const btnBaixarFoto = document.getElementById("btnBaixarFoto");
    const mensagem = document.getElementById("mensagem");
    const canvas = document.getElementById("canvasFoto");
    const fotoCapturada = document.getElementById("fotoCapturada");

    if (!btnLocalizacao || !btnCamera || !mensagem) {
        console.error("Elementos principais não encontrados. Verifique os IDs no HTML.");
        return;
    }

    btnLocalizacao.addEventListener("click", obterLocalizacao);
    btnCamera.addEventListener("click", abrirCamera);

    if (btnTirarFoto) {
        btnTirarFoto.addEventListener("click", tirarFoto);
    }
    if (btnBaixarFoto) {
        btnBaixarFoto.addEventListener("click", baixarFoto);
    }

    function obterLocalizacao() {
        mensagem.textContent = "Obtendo localização... aguarde";

        if (!navigator.geolocation) {
            mensagem.textContent = "Geolocalização não é suportada neste navegador.";
            return;
        }

        navigator.geolocation.getCurrentPosition(
            function (posicao) {
                console.log("Latitude:", posicao.coords.latitude);
                console.log("Longitude:", posicao.coords.longitude);
                console.log("Precisão:", posicao.coords.accuracy);

                if (latEl) latEl.textContent = posicao.coords.latitude.toFixed(6);
                if (lonEl) lonEl.textContent = posicao.coords.longitude.toFixed(6);
                if (precEl) precEl.textContent = posicao.coords.accuracy.toFixed(1) + " metros";

                if (img) {
                    img.src = "assets/ativada.png";
                    img.style.display = "inline-block";
                }

                mensagem.textContent = "Localização obtida com sucesso!";
            },
            function (error) {
                console.log("Erro na localização:", error);

                if (error.code === error.PERMISSION_DENIED) {
                    if (img) {
                        img.src = "assets/negado.png";
                        img.style.display = "inline-block";
                    }
                    mensagem.textContent = "Permissão de localização negada.";
                } else if (error.code === error.POSITION_UNAVAILABLE) {
                    mensagem.textContent = "Localização indisponível.";
                } else if (error.code === error.TIMEOUT) {
                    mensagem.textContent = "Tempo esgotado. Tente novamente.";
                } else {
                    mensagem.textContent = "Erro ao obter localização.";
                }
            },
            {
                enableHighAccuracy: false,
                timeout: 8000,
                maximumAge: 30000
            }
        );
    }

    function abrirCamera() {
        mensagem.textContent = "Solicitando câmera...";

        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            mensagem.textContent = "Câmera não é suportada neste navegador.";
            return;
        }

        if (!video) {
            mensagem.textContent = "Elemento de vídeo não encontrado (id=\"camera\").";
            return;
        }

        navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "environment" // prioriza câmera traseira no celular
            },
            audio: false
        })
        .then(function (stream) {
            video.srcObject = stream;
            video.play();

            mensagem.textContent = "Câmera ativada com sucesso!";
            btnCamera.textContent = "Câmera Ativa";
            btnCamera.disabled = true;

            // Habilita o botão de tirar foto
            if (btnTirarFoto) {
                btnTirarFoto.disabled = false;
            }
        })
        .catch(function (error) {
            console.error("Erro na câmera:", error);

            if (error.name === "NotAllowedError") {
                mensagem.textContent = "Permissão da câmera negada.";
            } else if (error.name === "NotFoundError") {
                mensagem.textContent = "Nenhuma câmera encontrada.";
            } else if (error.name === "NotReadableError") {
                mensagem.textContent = "Câmera já está sendo usada por outro aplicativo.";
            } else {
                mensagem.textContent = "Erro ao acessar a câmera: " + error.name;
            }
        });
    }

    function tirarFoto() {
        if (!video || !video.srcObject) {
            mensagem.textContent = "Ative a câmera primeiro!";
            return;
        }

        if (!canvas) {
            mensagem.textContent = "Canvas não encontrado (id=\"canvasFoto\").";
            return;
        }

        // Se o vídeo ainda não tem tamanho, espera um pouco e tenta de novo
        if (video.videoWidth === 0 || video.videoHeight === 0) {
            mensagem.textContent = "Aguarde a câmera carregar...";
            setTimeout(tirarFoto, 300);
            return;
        }

        // Define o tamanho do canvas igual ao do vídeo
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Gera a imagem
        const dataURL = canvas.toDataURL("image/png");

        // Mostra a foto
        if (fotoCapturada) {
            fotoCapturada.src = dataURL;
            fotoCapturada.style.display = "block";
        }

        // Habilita o botão de baixar
        if (btnBaixarFoto) {
            btnBaixarFoto.disabled = false;
            btnBaixarFoto.style.display = "inline-block";
        }

        mensagem.textContent = "Foto capturada com sucesso!";
        console.log("Foto capturada com sucesso:", canvas.width + "x" + canvas.height);
    }

    function baixarFoto() {
        if (!canvas || canvas.width === 0) {
            mensagem.textContent = "Nenhuma foto para baixar.";
            return;
        }

        const link = document.createElement("a");
        link.download = "foto_" + new Date().getTime() + ".png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    }
});