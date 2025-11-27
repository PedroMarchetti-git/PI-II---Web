async function buscarLeitores() {
    const ra = document.getElementById('pesquisa').value.trim();
    const tbody = document.getElementById('lista-leitor');
    const container = document.getElementById('ranking-container');

    tbody.innerHTML = '';

    if (!ra) {
        alert('Informe o RA para pesquisar.');
        return;
    }

    try {
        const resp = await fetch(`http://localhost:3000/alunos/classificacao/${ra}`);
        if (!resp.ok) {
            const err = await resp.json().catch(() => ({}));
            alert(err.erro || 'Erro ao buscar dados');
            return;
        }

        const data = await resp.json();

        const dataEmprestimo = new Date(data.ultimo_emprestimo);
        const UltimoEmprestimo = dataEmprestimo.toLocaleDateString("pt-BR");

        const titulo = data.titulo_ultimo_livro || '—';
        const quantidade = data.quantidade_lidos ?? 0;
        const classificacao = getClassificacao(quantidade);
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td class="col-20">${data.nome}</td>
        <td class="col-20">${titulo}</td>
        <td class="col-20">${quantidade}</td>
        <td class="col-20">${UltimoEmprestimo}</td>
        <td class="col-20">${classificacao}</td>
        `;

        tbody.appendChild(tr);

        container.style.display = "block";
    } catch (err) {
        console.error(err);
        alert('Erro de conexão ao tentar buscar os dados.');
    }
}

function getClassificacao(total) {
    if (total <= 5) return "Leitor Iniciante";
    if (total <= 10) return "Leitor Regular";
    if (total <= 20) return "Leitor Ativo";
    return "Leitor Extremo";
}