const canvas = document.querySelector('#canvas');
const contexto = canvas.getContext('2d');
//desenhado uma linha
contexto.beginPath();
contexto.moveTo(10, 0);
contexto.lineTo(64, 200);
contexto.lineTo(200, 150);
contexto.stroke();
contexto.stroke();
//desenhado um retangulo
contexto.fillRect(50, 50, 150, 100);

contexto.strokeRect(250, 50, 150, 100);
//desenhado um circulo
contexto.beginPath();
contexto.arc(250, 250, 50, 0, 2 * Math.PI*2);
contexto.stroke();