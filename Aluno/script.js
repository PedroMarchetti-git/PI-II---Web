const form = document.getElementById('form-cadastro');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const aluno = {
        ra: document.getElementById('registro_aluno').value,
        cpf: document.getElementById('cpf_aluno').value,
        nome: document.getElementById('nome_aluno').value,
    };

    const response = await fetch('http://localhost:3000/alunos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aluno)
    });

    const result = await response.json();
    alert(result.mensagem || result.erro);
    
    setTimeout(() => {
        location.reload();
    }, 2000);
});
