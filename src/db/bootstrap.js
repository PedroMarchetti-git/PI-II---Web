const { getConnection } = require('./index');

async function bootstrapAluno() {
  const sql = `
        CREATE TABLE IF NOT EXISTS Alunos (
            ra INT(10) PRIMARY KEY,
            cpf VARCHAR(14) NOT NULL,
            nome VARCHAR(75) NOT NULL
        );
    `;

  const conn = await getConnection();
  try {
    await conn.execute(sql);
    console.log('Tabela Alunos verificada/criada com sucesso.');
  } finally {
    await conn.end();
  }
}

async function bootstrapLivro() {
  const sql = `
        CREATE TABLE IF NOT EXISTS Livro (
            isbn INT(10) PRIMARY KEY,
            genero VARCHAR(50) NOT NULL,
            nome VARCHAR(75) NOT NULL
        );
    `;

  const conn = await getConnection();
  try {
    await conn.execute(sql);
    console.log('Tabela Livro verificada/criada com sucesso.');
  } finally {
    await conn.end();
  }
}

module.exports = { bootstrapAluno, bootstrapLivro };
