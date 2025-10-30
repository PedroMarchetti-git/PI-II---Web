const form = document.getElementById('form-livro');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const livro = {
        titulo: document.getElementById('titulo').value,
        autor: document.getElementById('autor').value,
        genero: document.getElementById('genero').value,
        editora: document.getElementById('editora').value
    };

    const response = await fetch('http://localhost:3000/livros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(livro)
    });

    const result = await response.json();
    alert(result.mensagem || result.erro);
    
    setTimeout(() => {
        location.reload();
    }, 2000);
});