document.addEventListener("DOMContentLoaded", carregarLivros);


const nomeDoAluno = sessionStorage.getItem('nomeDoAluno');

if (nomeDoAluno) {

    const header = document.getElementById('header-boas-vindas');

    if (header) {
        header.innerText = `Olá, ${nomeDoAluno}`;
    }
} else {
}

async function carregarLivros() {
    const select = document.getElementById("isbn");

    try {
        const resposta = await fetch("http://localhost:3000/livros"); // rota GET /
        const livros = await resposta.json();

        select.innerHTML = "<option value=''>Selecione um livro</option>";

        livros.forEach(livro => {
            const option = document.createElement("option");
            option.value = livro.id;        // id vai no value
            option.textContent = `${livro.titulo} - ${livro.autor}`;
            select.appendChild(option);
        });

    } catch (err) {
        console.error("Erro ao carregar livros:", err);
    }
}

const form = document.querySelector(".form-cadastro");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const isbn = document.querySelector("#isbn").value.trim();
    const ra = document.querySelector("#ra").value.trim();

    if (!isbn || !ra) {
        alert("Preencha todos os campos!");
        return;
    }

    const dados = {
        ra: ra,
        id_livro: isbn
    };

    try {
        const response = await fetch("http://localhost:3000/emprestimos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        const result = await response.json();

        if (!response.ok) {
            alert("Erro: " + result.erro);
            return;
        }

        alert(result.mensagem);

        // limpa os campos
        window.location.href = "index.html";

    } catch (erro) {
        console.error(erro);
        alert("Erro ao enviar requisição");
    }
});
