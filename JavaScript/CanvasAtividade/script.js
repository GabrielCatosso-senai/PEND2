const canvas = document.querySelector('#canvas');
const contexto = canvas.getContext('2d');

// CONFIGURAÇÕES DE LINHA
contexto.strokeStyle = '#222';
contexto.lineWidth = 6;
contexto.lineCap = 'round';
contexto.lineJoin = 'round';

// ===== BONECO DE PALITO - POSE DE LUTA =====

// Cabeça
contexto.beginPath();
contexto.arc(280, 90, 28, 0, 2 * Math.PI);
contexto.stroke();

// Corpo (ligeiramente inclinado)
contexto.beginPath();
contexto.moveTo(280, 118);   // pescoço
contexto.lineTo(270, 230);   // cintura
contexto.stroke();

// Braço esquerdo (punho perto do rosto)
contexto.beginPath();
contexto.moveTo(275, 140);   // ombro
contexto.lineTo(230, 160);   // cotovelo
contexto.lineTo(300, 200);   // punho (perto da cabeça)
contexto.stroke();

// Braço direito (punho levantado)
contexto.beginPath();
contexto.moveTo(280, 140);   // ombro
contexto.lineTo(320, 155);   // cotovelo
contexto.lineTo(360, 115);    // punho (alto)
contexto.stroke();

// Perna esquerda (à frente)
contexto.beginPath();
contexto.moveTo(270, 230);   // quadril
contexto.lineTo(230,250);   // joelho
contexto.lineTo(215, 350);   // pé
contexto.stroke();

// Perna direita 
contexto.beginPath();
contexto.moveTo(270, 230);   // quadril
contexto.lineTo(310, 250);   // joelho
contexto.lineTo(330, 360);   // pé
contexto.stroke();