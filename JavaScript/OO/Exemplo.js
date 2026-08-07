class carro{

    constructor(marca, modelo, ano, cor) {
    this.marca = marca;
    this.modelo = modelo;
    this.ano = ano;
    this.cor = cor;
    }


    ligar() {
        console.log("O carro está ligado");
    }

    acelerar() {
        console.log("O carro está acelerando");
    }

    frear() {
        console.log(`${this.modelo} está freando`);
    }
}
const carro1 = new carro("Volkswagen", "Gol", 2022, "Branco");
console.log("carro 1: ", carro1);

const carro2 = new carro("Toyota", "Corolla", 2025, "Preto");
console.log("carro 2: ", carro2);

const carro3 = new carro("Honda", "Civic", 2020, "Preto");
console.log("carro 3: ", carro3);

console.log("-------------------------------------");
console.log("Atributos do carro 1 :");
console.log("- ", carro1.marca);
console.log("- ", carro1.modelo);
console.log("- ", carro1.ano);
console.log("- ", carro1.cor);
console.log("-------------------------------------");

console.log("-------------------------------------");
console.log("Atributos do carro 2 :");
console.log("- ", carro2.marca);
console.log("- ", carro2.modelo);
console.log("- ", carro2.ano);
console.log("- ", carro2.cor);
console.log("-------------------------------------");

console.log("-------------------------------------");
console.log("Atributos do carro 3 :");
console.log("- ", carro3.marca);
console.log("- ", carro3.modelo);
console.log("- ", carro3.ano);
console.log("- ", carro3.cor);
console.log("-------------------------------------");   

carro1.ligar();
carro1.acelerar();
carro1.frear();