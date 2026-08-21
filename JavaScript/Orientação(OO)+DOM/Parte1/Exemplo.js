// Classe Produto
class Produto {
    constructor(nome, preco, categoria, desconto) {
        this.nome = nome;
        this.preco = preco;
        this.categoria = categoria;
        this.desconto = desconto;
        this.precoFinal = preco; // será atualizado pelo método aplicarDesconto()
    }

    // Método que aplica o desconto
    aplicarDesconto() {
        const valorDesconto = this.preco * (this.desconto / 100);
        this.precoFinal = this.preco - valorDesconto;
    }

    // Método que exibe o produto (já com desconto aplicado)
    exibir() {
        const resultado = document.getElementById('resultado');
        resultado.style.display = 'block';
        resultado.innerHTML = `
            <h2>Produto Cadastrado</h2>
            <p><strong>Nome:</strong> ${this.nome}</p>
            <p><strong>Categoria:</strong> ${this.categoria}</p>
            <p><strong>Preço original:</strong> R$ ${this.preco.toFixed(2)}</p>
            <p><strong>Desconto:</strong> ${this.desconto}%</p>
            <p><strong>Preço com desconto:</strong> R$ ${this.precoFinal.toFixed(2)}</p>
        `;
    }
}

// Evento do formulário
document.getElementById('formProduto').addEventListener('submit', function(event) {
    event.preventDefault(); // impede o recarregamento da página

    // Captura os valores do formulário
    const nome = document.getElementById('nome').value;
    const preco = parseFloat(document.getElementById('preco').value);
    const categoria = document.getElementById('categoria').value;
    const desconto = parseFloat(document.getElementById('desconto').value);

    // Cria o objeto da classe Produto
    const produto = new Produto(nome, preco, categoria, desconto);

    // Aplica o desconto
    produto.aplicarDesconto();

    // Exibe o produto
    produto.exibir();

    // Limpa o formulário (opcional)
    this.reset();
});