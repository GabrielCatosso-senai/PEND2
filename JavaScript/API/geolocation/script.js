navigator.geolocation.getCurrentPosition(
    function(posicao) { 
        console.log("Latitude:", posicao.coords.latitude);
        console.log("Longitude:", posicao.coords.longitude);
        console.log("Precisão:", posicao.coords.accuracy);

        img.src = "assets/ativada.png";
    },
    function(error) {
        console.log("Não foi possível obter a localização.", error);

    if (error.code === error.PERMISSION_DENIED) {
        img.src = "assets/negado.png";
    }
}
);
