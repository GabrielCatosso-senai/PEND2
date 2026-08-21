class Produto {
    constructor(nome, preco, categoria, desconto) {
        this.nome = nome;
        this.preco = preco;
        this.categoria = categoria;
        this.desconto = desconto;
    }

    aplicarDesconto() {
        const valorDesconto = this.preco * (this.desconto / 100);
        return this.preco - valorDesconto;
    }

    exibir(indice) {
        const precoFinal = this.aplicarDesconto();

        return `
            <div class="produto">
                <p><strong>Nome:</strong> ${this.nome}</p>
                <p><strong>Categoria:</strong> ${this.categoria}</p>
                <p><strong>Preço original:</strong> R$ ${this.preco.toFixed(2)}</p>
                <p><strong>Desconto:</strong> ${this.desconto}%</p>
                <p><strong>Preço com desconto:</strong> R$ ${precoFinal.toFixed(2)}</p>
                <button class="btn-excluir" data-indice="${indice}">Excluir</button>
            </div>
        `;
    }
}

const produtos = [];

const formulario = document.getElementById("formProduto");
const produtosCadastrados = document.getElementById("produtosCadastrados");

function atualizarLista() {
    produtosCadastrados.innerHTML = "";

    produtos.forEach(function(produto, indice) {
        produtosCadastrados.innerHTML += produto.exibir(indice);
    });
}

function excluirProduto(indice) {
    produtos.splice(indice, 1);
    atualizarLista();
}

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const preco = Number(document.getElementById("preco").value);
    const categoria = document.getElementById("categoria").value;
    const desconto = Number(document.getElementById("desconto").value);

    const produto = new Produto(nome, preco, categoria, desconto);
    produtos.push(produto);

    atualizarLista();
    formulario.reset();
});

produtosCadastrados.addEventListener("click", function(event) {
    if (event.target.classList.contains("btn-excluir")) {
        const indice = Number(event.target.getAttribute("data-indice"));
        excluirProduto(indice);
    }
});