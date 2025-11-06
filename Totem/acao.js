document.addEventListener('DOMContentLoaded', () => {
    
    const nomeDoAluno = sessionStorage.getItem('nomeDoAluno');

    if (nomeDoAluno) {
    
        const header = document.getElementById('header-boas-vindas');
        
        if (header) {
            header.innerText = `Olá, ${nomeDoAluno}`;
        }
    } else {
    }
});
