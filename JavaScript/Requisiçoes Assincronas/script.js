// botao.addEventListener('click', async () => {
//     try {
//         const resposta = await fetch(
//             "https://jsonplaceholder.typicode.com/users"
//         );

//         const dados = await resposta.json();

//         resultado.innerHTML = "";

//         dados.forEach((usuario) => {

//             resultado.innerHTML += `
//             <p>
//                 <strong>${usuario.name}</strong>  
//                 ${usuario.email}
//             </p>
//             <hr>
//             `;
//         });
//     } catch (error) {
//         resultado.innerHTML = 'Ocorreu um erro ao buscar os dados.';
//         console.log(error);
//     }
// });

// //butao
// const botao = document.getElementById("buscarUsuarios");
// const resultado = document.getElementById("resultado");

// //funcao botao
// botao.addEventListener("click", () => {

// //fetch + then + catchaw
// fetch("https://jsonplaceholder.typicode.com/users")
//     .then(response => response.json())
//     .then(dados => {
//         console.log(dados);
// // exibir os dados no elemento resultado
//         resultado.innerHTML = "";
//         dados.forEach(usuario => {
            
//             resultado.innerHTML += `
//             <p>
//                 <strong>${usuario.name}</strong> <br>
//                 ${usuario.email} <br>
//             </p>
//             <hr>
//     `;
//         });
//     })
//     .catch(error => {
//         console.log("erro:", error);
//     });
// });
botao.addEventListener("click", async () => {
    const id = idUsuario.value;

    if (id === "") {
        resultado.innerHTML = "Digite um ID";
        return;
    }

    try {
        const resposta = await fetch(
            `https://jsonplaceholder.typicode.com/users/${id}`
        );

        const dados = await resposta.json();

        resultado.innerHTML = `
        <p>
            <strong>${dados.name}</strong> <br>
            Email: ${dados.email} <br>
            Telefone: ${dados.phone} <br>
            Cidade: ${dados.address.city} <br>
        </p>
        <hr>
        `;
    }
    catch (error) {
        resultado.innerHTML = "Ocorreu um erro ao buscar os dados.";
        console.log("erro:", error);
    }
});    