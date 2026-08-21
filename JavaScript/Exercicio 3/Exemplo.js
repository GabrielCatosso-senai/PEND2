class Produto {
    constructor(nome, preco, estoque) {
        this.nome = nome;
        this.preco = preco;
        this.estoque = estoque;
    }

    vender(quantidade) {
        if (quantidade <= 0) {
            console.log("Quantidade inválida para venda.");
            return;
        }

        if (this.estoque >= quantidade) {
            this.estoque -= quantidade;
            console.log(`Venda realizada: ${quantidade} unidade(s) de ${this.nome}.`);
            console.log(`Estoque atual: ${this.estoque}`);
        } else {
            console.log(`Estoque insuficiente! Só há ${this.estoque} unidade(s) de ${this.nome}.`);
        }
    }

    repor(quantidade) {
        if (quantidade <= 0) {
            console.log("Quantidade inválida para reposição.");
            return;
        }

        this.estoque += quantidade;
        console.log(`Reposição realizada: +${quantidade} unidade(s) de ${this.nome}.`);
        console.log(`Estoque atual: ${this.estoque}`);
    }

    alterarPreco(novoPreco) {
        if (novoPreco <= 0) {
            console.log("Preço inválido. O valor deve ser maior que zero.");
            return;
        }

        const precoAnterior = this.preco;
        this.preco = novoPreco;
        console.log(`Preço de ${this.nome} alterado de R$ ${precoAnterior.toFixed(2)} para R$ ${this.preco.toFixed(2)}.`);
    }
}

// ===== Exemplos de uso =====
const produto1 = new Produto("Notebook", 3500.00, 10);
const produto2 = new Produto("Mouse Gamer", 150.00, 25);
const produto3 = new Produto("Teclado Mecânico", 450.00, 15);

console.log("Produto 1:", produto1);
console.log("Produto 2:", produto2);
console.log("Produto 3:", produto3);

console.log("-------------------------------------");
console.log("Atributos do produto 1:");
console.log("- Nome:", produto1.nome);
console.log("- Preço: R$", produto1.preco.toFixed(2));
console.log("- Estoque:", produto1.estoque);
console.log("-------------------------------------");

// Testando os métodos
produto1.vender(3);
produto1.repor(5);
produto1.alterarPreco(3299.90);

console.log("-------------------------------------");

produto2.vender(10);
produto2.vender(20); // Vai dar estoque insuficiente
produto2.repor(15);
produto2.alterarPreco(129.90);