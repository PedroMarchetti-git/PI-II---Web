document.addEventListener('DOMContentLoaded', () => {

    const formBusca = document.getElementById('form-busca');
    const inputBusca = document.getElementById('termo_busca');
    const listaResultados = document.getElementById('lista-resultados');
    const feedbackBusca = document.getElementById('feedback-busca');

    formBusca.addEventListener('submit', (e) => {
        e.preventDefault();
    });

    inputBusca.addEventListener('keyup', () => {
        const termo = inputBusca.value;

        if (termo.length < 3) {
            listaResultados.innerHTML = ''; 
            feedbackBusca.style.display = 'block'; 
            feedbackBusca.innerText = 'Digite pelo menos 3 letras...';
            return; 
        }
        buscarLivros(termo);
    });

});


async function buscarLivros(termo) {
    console.log(`Buscando por: ${termo}`);
    const feedbackBusca = document.getElementById('feedback-busca');
    
    try {

        const response = await fetch(`http://localhost:3000/livros/buscar/termo?termo=${termo}`);
        
        if (response.ok) {
            const livros = await response.json();
            exibirResultados(livros);
        } else {
            exibirResultados([]);
            feedbackBusca.innerText = 'Erro ao buscar livros.';
        }
        
    } catch (err) {
        console.error(err);
        exibirResultados([]);
        feedbackBusca.innerText = 'Não foi possível conectar ao servidor.';
    }
}


function exibirResultados(livros) {
    const listaResultados = document.getElementById('lista-resultados');
    const feedbackBusca = document.getElementById('feedback-busca');
    
    listaResultados.innerHTML = '';

    if (livros.length === 0) {
        feedbackBusca.style.display = 'block';
        feedbackBusca.innerText = 'Nenhum livro disponível encontrado.';
    } else {
        feedbackBusca.style.display = 'none';
        
        livros.forEach(livro => {
            const li = document.createElement('li');
            li.className = 'result-item';
            
            li.innerHTML = `
                <strong>${livro.titulo}</strong>
                <span>Autor: ${livro.autor}</span>
            `;
            
            listaResultados.appendChild(li);
        });
    }
}
