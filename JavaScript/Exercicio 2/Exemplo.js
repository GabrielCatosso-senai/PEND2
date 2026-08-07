class Aluno {
    constructor(nome, curso, idade, matricula) {
        this.nome = nome;
        this.curso = curso;
        this.idade = idade;
        this.matricula = matricula;
    }

    aprender() {
        console.log(`${this.nome} está aprendendo novos conteúdos do curso de ${this.curso}.`);
    }

    estudar() {
        console.log(`${this.nome} está estudando para as provas.`);
    }

    apresentar() {
        console.log(`O aluno ${this.nome} está se apresentando.`);
    }
}

const aluno1 = new Aluno("Maria Silva", "Engenharia de Software", 17, "2026001");
console.log("Aluno 1:", aluno1);
console.log("Nome: " + aluno1.nome);

const aluno2 = new Aluno("João Santos", "Ciência da Computação", 18, "2026002");
console.log("Aluno 2:", aluno2);
console.log("Nome: " + aluno2.nome);

const aluno3 = new Aluno("Ana Oliveira", "Sistemas de Informação", 18, "2026003");
console.log("Aluno 3:", aluno3);
console.log("Nome: " + aluno3.nome);


console.log("-------------------------------------");
console.log("Atributos do aluno 1:");
console.log("- Nome:", aluno1.nome);
console.log("- Curso:", aluno1.curso);
console.log("- Idade:", aluno1.idade);
console.log("- Matrícula:", aluno1.matricula);
console.log("-------------------------------------");


console.log("-------------------------------------");
console.log("Atributos do aluno 2:");
console.log("- Nome:", aluno2.nome);
console.log("- Curso:", aluno2.curso);
console.log("- Idade:", aluno2.idade);
console.log("- Matrícula:", aluno2.matricula);
console.log("-------------------------------------");


console.log("-------------------------------------");
console.log("Atributos do aluno 3:");
console.log("- Nome:", aluno3.nome);
console.log("- Curso:", aluno3.curso);
console.log("- Idade:", aluno3.idade);
console.log("- Matrícula:", aluno3.matricula);
console.log("-------------------------------------");


aluno1.aprender();
aluno1.estudar();
aluno1.apresentar();

console.log("-------------------------------------");

aluno2.aprender();
aluno2.estudar();
aluno2.apresentar();

console.log("-------------------------------------");

aluno3.aprender();
aluno3.estudar();
aluno3.apresentar();