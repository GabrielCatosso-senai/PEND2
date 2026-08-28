const tabuleiroEl = document.getElementById('tabuleiro');
const vezEl = document.getElementById('vez');
const mensagemEl = document.getElementById('mensagem');
const btnReiniciar = document.getElementById('btn-reiniciar');

const pecasInfo = {
    '♔': { tipo: 'rei',   cor: 'branca' },
    '♕': { tipo: 'rainha',cor: 'branca' },
    '♖': { tipo: 'torre', cor: 'branca' },
    '♗': { tipo: 'bispo', cor: 'branca' },
    '♘': { tipo: 'cavalo',cor: 'branca' },
    '♙': { tipo: 'peao',  cor: 'branca' },
    '♚': { tipo: 'rei',   cor: 'preta' },
    '♛': { tipo: 'rainha',cor: 'preta' },
    '♜': { tipo: 'torre', cor: 'preta' },
    '♝': { tipo: 'bispo', cor: 'preta' },
    '♞': { tipo: 'cavalo',cor: 'preta' },
    '♟': { tipo: 'peao',  cor: 'preta' }
};

const posicaoInicial = [
    ['♜','♞','♝','♛','♚','♝','♞','♜'],
    ['♟','♟','♟','♟','♟','♟','♟','♟'],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null,null],
    ['♙','♙','♙','♙','♙','♙','♙','♙'],
    ['♖','♘','♗','♕','♔','♗','♘','♖']
];

let board = [];
let vez = 'branca';
let casaOrigem = null;
let pecaArrastada = null;

function criarTabuleiro() {
    board = posicaoInicial.map(linha => [...linha]);
    vez = 'branca';
    vezEl.textContent = 'Brancas';
    mensagemEl.textContent = '';
    renderizar();
}

function renderizar() {
    tabuleiroEl.innerHTML = '';

    for (let l = 0; l < 8; l++) {
        for (let c = 0; c < 8; c++) {
            const casa = document.createElement('div');
            casa.classList.add('casa');
            casa.classList.add((l + c) % 2 === 0 ? 'clara' : 'escura');
            casa.dataset.linha = l;
            casa.dataset.coluna = c;

            const simbolo = board[l][c];
            if (simbolo) {
                const peca = document.createElement('div');
                peca.className = 'peca';
                peca.draggable = true;
                peca.textContent = simbolo;
                peca.dataset.simbolo = simbolo;

                peca.addEventListener('dragstart', dragStart);
                peca.addEventListener('dragend', dragEnd);

                casa.appendChild(peca);
            }

            casa.addEventListener('dragover', e => e.preventDefault());
            casa.addEventListener('dragenter', dragEnter);
            casa.addEventListener('dragleave', dragLeave);
            casa.addEventListener('drop', drop);

            tabuleiroEl.appendChild(casa);
        }
    }
}

function dragStart(e) {
    const simbolo = e.target.dataset.simbolo;
    const info = pecasInfo[simbolo];

    if (info.cor !== vez) {
        e.preventDefault();
        mensagemEl.textContent = 'Não é a sua vez';
        return;
    }

    casaOrigem = e.target.parentElement;
    pecaArrastada = simbolo;
    e.dataTransfer.setData('text/plain', simbolo);
    e.target.classList.add('dragging');
    mensagemEl.textContent = '';
}

function dragEnd(e) {
    e.target.classList.remove('dragging');
    document.querySelectorAll('.casa.destacada').forEach(c => c.classList.remove('destacada'));
}

function dragEnter(e) {
    e.preventDefault();
    if (e.currentTarget.classList.contains('casa')) {
        e.currentTarget.classList.add('destacada');
    }
}

function dragLeave(e) {
    e.currentTarget.classList.remove('destacada');
}

function drop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('destacada');

    if (!casaOrigem || !pecaArrastada) return;

    const origemL = +casaOrigem.dataset.linha;
    const origemC = +casaOrigem.dataset.coluna;
    const destL = +e.currentTarget.dataset.linha;
    const destC = +e.currentTarget.dataset.coluna;

    if (origemL === destL && origemC === destC) return;

    // guarda o que estava na casa de destino (pra saber se capturou rainha)
    const capturada = board[destL][destC];

    // testa o movimento
    if (!movimentoValido(origemL, origemC, destL, destC, pecaArrastada)) {
        mensagemEl.textContent = 'Movimento inválido';
        return;
    }

    // simula o movimento
    const backupOrigem = board[origemL][origemC];
    const backupDestino = board[destL][destC];

    board[destL][destC] = pecaArrastada;
    board[origemL][origemC] = null;

    // não pode deixar o próprio rei em xeque
    if (estaEmXeque(vez)) {
        // desfaz
        board[origemL][origemC] = backupOrigem;
        board[destL][destC] = backupDestino;
        mensagemEl.textContent = 'Movimento inválido (deixaria o rei em xeque)';
        return;
    }

    // movimento aceito → mensagens
    let msg = '';

    if (capturada && (capturada === '♕' || capturada === '♛')) {
        msg = 'Rainha capturada! ';
    }

    // troca a vez
    const corAnterior = vez;
    vez = vez === 'branca' ? 'preta' : 'branca';
    vezEl.textContent = vez === 'branca' ? 'Brancas' : 'Pretas';

    // verifica se o adversário ficou em xeque
    if (estaEmXeque(vez)) {
        msg += 'Xeque!';
    }

    mensagemEl.textContent = msg;

    casaOrigem = null;
    pecaArrastada = null;
    renderizar();
}

function movimentoValido(ol, oc, dl, dc, simbolo) {
    const info = pecasInfo[simbolo];
    const alvo = board[dl][dc];

    // não pode capturar peça da mesma cor
    if (alvo && pecasInfo[alvo].cor === info.cor) return false;

    const dL = dl - ol;
    const dC = dc - oc;
    const absL = Math.abs(dL);
    const absC = Math.abs(dC);

    switch (info.tipo) {
        case 'peao':
            return movimentoPeao(ol, oc, dl, dc, info.cor, alvo);
        case 'torre':
            if (dL !== 0 && dC !== 0) return false;
            return caminhoLivre(ol, oc, dl, dc);
        case 'bispo':
            if (absL !== absC) return false;
            return caminhoLivre(ol, oc, dl, dc);
        case 'rainha':
            if (dL !== 0 && dC !== 0 && absL !== absC) return false;
            return caminhoLivre(ol, oc, dl, dc);
        case 'rei':
            return absL <= 1 && absC <= 1;
        case 'cavalo':
            return (absL === 2 && absC === 1) || (absL === 1 && absC === 2);
        default:
            return false;
    }
}

function movimentoPeao(ol, oc, dl, dc, cor, alvo) {
    const direcao = cor === 'branca' ? -1 : 1;
    const linhaInicial = cor === 'branca' ? 6 : 1;
    const dL = dl - ol;
    const dC = dc - oc;

    // avanço
    if (dC === 0 && !alvo) {
        if (dL === direcao) return true;
        if (ol === linhaInicial && dL === 2 * direcao && !board[ol + direcao][oc]) {
            return true;
        }
    }

    // captura
    if (Math.abs(dC) === 1 && dL === direcao && alvo) {
        return true;
    }

    return false;
}

function caminhoLivre(ol, oc, dl, dc) {
    const passoL = Math.sign(dl - ol);
    const passoC = Math.sign(dc - oc);
    let l = ol + passoL;
    let c = oc + passoC;

    while (l !== dl || c !== dc) {
        if (board[l][c] !== null) return false;
        l += passoL;
        c += passoC;
    }
    return true;
}

// encontra a posição do rei de uma cor
function acharRei(cor) {
    const rei = cor === 'branca' ? '♔' : '♚';
    for (let l = 0; l < 8; l++) {
        for (let c = 0; c < 8; c++) {
            if (board[l][c] === rei) return { l, c };
        }
    }
    return null;
}

// verifica se o rei de uma determinada cor está em xeque
function estaEmXeque(cor) {
    const reiPos = acharRei(cor);
    if (!reiPos) return false;

    const corInimiga = cor === 'branca' ? 'preta' : 'branca';

    for (let l = 0; l < 8; l++) {
        for (let c = 0; c < 8; c++) {
            const simbolo = board[l][c];
            if (!simbolo) continue;

            const info = pecasInfo[simbolo];
            if (info.cor !== corInimiga) continue;

            // testa se essa peça inimiga consegue atacar o rei
            if (movimentoValido(l, c, reiPos.l, reiPos.c, simbolo)) {
                return true;
            }
        }
    }
    return false;
}

btnReiniciar.addEventListener('click', criarTabuleiro);

criarTabuleiro();