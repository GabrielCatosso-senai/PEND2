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

// Array de produtos
let produtos = [];

// Elementos do HTML
const formulario = document.getElementById("formProduto");
const produtosCadastrados = document.getElementById("produtosCadastrados");

// Função para salvar no localStorage
function salvarNoLocalStorage() {
    localStorage.setItem("produtos", JSON.stringify(produtos));
}

// Função para carregar do localStorage
function carregarDoLocalStorage() {
    const produtosSalvos = localStorage.getItem("produtos");

    if (produtosSalvos) {
        // Transforma o JSON de volta em objetos da classe Produto
        const produtosParseados = JSON.parse(produtosSalvos);

        produtos = produtosParseados.map(function(item) {
            return new Produto(item.nome, item.preco, item.categoria, item.desconto);
        });
    }
}

// Função que atualiza a lista na tela
function atualizarLista() {
    produtosCadastrados.innerHTML = "";

    produtos.forEach(function(produto, indice) {
        produtosCadastrados.innerHTML += produto.exibir(indice);
    });
}

// Função para excluir produto
function excluirProduto(indice) {
    produtos.splice(indice, 1);
    salvarNoLocalStorage(); // atualiza o localStorage
    atualizarLista();
}

// Evento de cadastrar
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const preco = Number(document.getElementById("preco").value);
    const categoria = document.getElementById("categoria").value;
    const desconto = Number(document.getElementById("desconto").value);

    const produto = new Produto(nome, preco, categoria, desconto);
    produtos.push(produto);

    salvarNoLocalStorage(); // salva no localStorage
    atualizarLista();
    formulario.reset();
});

// Evento de excluir
produtosCadastrados.addEventListener("click", function(event) {
    if (event.target.classList.contains("btn-excluir")) {
        const indice = Number(event.target.getAttribute("data-indice"));
        excluirProduto(indice);
    }
});

// Quando a página abrir, carrega os produtos salvos
carregarDoLocalStorage();
atualizarLista();