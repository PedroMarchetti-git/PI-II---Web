document.addEventListener("DOMContentLoaded", () => {
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
            id_user: ra,
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
            form.reset();

        } catch (erro) {
            console.error(erro);
            alert("Erro ao enviar requisição");
        }
    });
});
