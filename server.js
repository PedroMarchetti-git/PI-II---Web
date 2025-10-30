const app = require('./src/app');
const { initPool } = require('./src/db');
const { bootstrapAluno, bootstrapLivro } = require('./src/db/bootstrap');

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await initPool();
    await bootstrapAluno();
    await bootstrapLivro();

    app.listen(PORT, () => {
      console.log(`Servidor ativo na porta ${PORT}...`);
    });
  } catch (err) {
    console.error('Falha ao iniciar o servidor:', err);
    process.exit(1);
  }
})();
