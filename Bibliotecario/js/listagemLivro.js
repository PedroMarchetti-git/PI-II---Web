async function carregarLivrosEmprestados() {
    try {
        const response = await fetch("http://localhost:3000/livros/emprestimos");

        if (!response.ok) {
            throw new Error("Erro ao buscar livros emprestados");
        }

        const dados = await response.json();
        const tabela = document.getElementById("tabelaLivros");
        tabela.innerHTML = "";

        dados.forEach(item => {
            const data = new Date(item.data_emprestimo);
            const dataSimples = data.toLocaleDateString("pt-BR");

            const linha = `
                <tr>
                    <td>${item.titulo}</td>
                    <td>${item.autor}</td>
                    <td>${item.genero}</td>
                    <td>${item.editora}</td>
                    <td>${item.aluno_nome}</td>
                    <td>${dataSimples}</td>
                </tr>
            `;

            tabela.innerHTML += linha;
        });

    } catch (erro) {
        console.error("Erro ao carregar livros:", erro);
        alert("Ocorreu um erro ao carregar os livros emprestados.");
    }
}

carregarLivrosEmprestados();
