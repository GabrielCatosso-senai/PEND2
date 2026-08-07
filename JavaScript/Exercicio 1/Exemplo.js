class Bicicleta {
    constructor(tipo, marca, modelo, ano) {
        this.tipo = tipo;
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
    }

    pedalar() {
        console.log(`A ${this.tipo} ${this.marca} ${this.modelo} está pedalando.`);
    }

    acelerar() {
        console.log(`A ${this.tipo} ${this.marca} ${this.modelo} está acelerando.`);
    }

    frear() {
        console.log(`A ${this.tipo} ${this.marca} ${this.modelo} está freando.`);
    }
}

const bike1 = new Bicicleta("MTB", "Caloi", "Vulcan", 2021);
console.log("Bike 1:", bike1);
console.log("Nome: " + bike1.marca + " " + bike1.modelo);

const bike2 = new Bicicleta("BMX", "Mongoose", "Legion L100", 2025);
console.log("Bike 2:", bike2);
console.log("Nome: " + bike2.marca + " " + bike2.modelo);

const bike3 = new Bicicleta("Speed", "Caloi", "Strada", 2020);
console.log("Bike 3:", bike3);
console.log("Nome: " + bike3.marca + " " + bike3.modelo);


console.log("-------------------------------------");
console.log("Atributos da bike 1:");
console.log("- Nome:", bike1.marca + " " + bike1.modelo);
console.log("- Tipo:", bike1.tipo);
console.log("- Marca:", bike1.marca);
console.log("- Modelo:", bike1.modelo);
console.log("- Ano:", bike1.ano);
console.log("-------------------------------------");


console.log("-------------------------------------");
console.log("Atributos da bike 2:");
console.log("- Nome:", bike2.marca + " " + bike2.modelo);
console.log("- Tipo:", bike2.tipo);
console.log("- Marca:", bike2.marca);
console.log("- Modelo:", bike2.modelo);
console.log("- Ano:", bike2.ano);
console.log("-------------------------------------");


console.log("-------------------------------------");
console.log("Atributos da bike 3:");
console.log("- Nome:", bike3.marca + " " + bike3.modelo);
console.log("- Tipo:", bike3.tipo);
console.log("- Marca:", bike3.marca);
console.log("- Modelo:", bike3.modelo);
console.log("- Ano:", bike3.ano);
console.log("-------------------------------------");


bike1.pedalar();
bike1.acelerar();
bike1.frear();

console.log("-------------------------------------");

bike2.pedalar();
bike2.acelerar();
bike2.frear();

console.log("-------------------------------------");

bike3.pedalar();
bike3.acelerar();
bike3.frear();