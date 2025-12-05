async function carregarRanking() {
    const tbody = document.getElementById("lista-leitores");

    tbody.innerHTML = "<tr><td colspan='5'>Carregando...</td></tr>";

    try {
        const resposta = await fetch("http://localhost:3000/emprestimos/classificacao");
        const dados = await resposta.json();

        tbody.innerHTML = ""; // limpa a tabela

        if (!Array.isArray(dados) || dados.length === 0) {
            tbody.innerHTML = "<tr><td colspan='5'>Nenhum leitor encontrado</td></tr>";
            return;
        }

        dados.forEach(item => {
            const data = new Date(item.ultimo_emprestimo);
            const dataSimples = data.toLocaleDateString("pt-BR");

            // Classificação
            let classificacao = "";
            const total = item.total_emprestimos;

            if (total <= 5) classificacao = "Leitor Iniciante";
            else if (total <= 10) classificacao = "Leitor Regular";
            else if (total <= 20) classificacao = "Leitor Ativo";
            else classificacao = "Leitor Extremo";

            // Linha da tabela
            const tr = `
                <tr>
                    <td>${item.nome}</td>
                    <td>${item.ultimo_livro || "—"}</td>
                    <td>${item.total_emprestimos}</td>
                    <td>${dataSimples || "—"}</td>
                    <td>${classificacao}</td>
                </tr>
            `;

            tbody.innerHTML += tr;
        });

    } catch (erro) {
        console.error(erro);
        tbody.innerHTML = "<tr><td colspan='5'>Erro ao carregar dados</td></tr>";
    }
}

carregarRanking();
