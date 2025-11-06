const form = document.getElementById('form-login');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const ra = document.getElementById('ra_login').value;
    const senha = document.getElementById('senha_login').value;

    try {
        const response = await fetch('http://localhost:3000/alunos/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ra: ra, senha: senha }) 
        });

        if (response.ok) {
            const aluno = await response.json(); 

            sessionStorage.setItem('nomeDoAluno', aluno.nome);

            alert(`Bem-vindo(a), ${aluno.nome}!`);
            window.location.href = '../Totem/acao.html'; 
            
        } else {
            const erro = await response.json();
            alert(erro.mensagem || 'RA ou Senha incorretos.');
        }

    } catch (error) {
        console.error('Erro ao fazer login:', error);
        alert('Não foi possível conectar ao servidor. Verifique se ele está rodando.');
    }
});
