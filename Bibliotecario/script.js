const capaInput = document.getElementById('capa');
const previewImage = document.querySelector('.preview .preview-image');
const previewText = document.querySelector('.preview .preview-text');

capaInput.addEventListener('change', function() {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader(); 

        reader.onload = function(e) {
            previewImage.src = e.target.result; 
            previewImage.style.display = 'block'; 
            previewText.style.display = 'none'; 
        }

        reader.readAsDataURL(file); 
    } else {
        previewImage.src = "";
        previewImage.style.display = 'none'; 
        previewText.style.display = 'block'; 
    }
});


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
