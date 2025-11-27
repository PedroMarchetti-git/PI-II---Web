const form = document.querySelector(".form-cadastro");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const ra = document.querySelector("#ra").value.trim();
    const id_livro = document.querySelector("#isbn").value.trim();

    if (!ra || !id_livro) {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        const resp = await fetch("http://localhost:3000/emprestimos/devolucao", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ra, id_livro })
        });

        const result = await resp.json();
        alert(result.mensagem);

        if (resp.ok) {
            location.href = "acao.html";
        }

    } catch (err) {
        console.error(err);
        alert("Erro ao enviar devolução");
    }
});

document.addEventListener("DOMContentLoaded", async () => {

    const select = document.getElementById("isbn");

    try {
        const response = await fetch("http://localhost:3000/emprestimos/ativos");
        const livros = await response.json();

        select.innerHTML = ""; // limpar opções

        if (livros.length === 0) {
            select.innerHTML = `<option value="">Nenhum livro emprestado</option>`;
            return;
        }

        livros.forEach(livro => {
            const option = document.createElement("option");
            option.value = livro.id_livro;
            option.textContent = `${livro.titulo} — ${livro.autor}`;
            select.appendChild(option);
        });

    } catch (err) {
        console.error(err);
        select.innerHTML = `<option value="">Erro ao carregar</option>`;
    }

});