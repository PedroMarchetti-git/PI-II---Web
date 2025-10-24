const { getConnection } = require('./index');

// Cria tabela se não existir (idempotente via try/catch do erro "já existe")
async function bootstrapAluno() {
    const sql = `
    BEGIN
      EXECUTE IMMEDIATE '
        CREATE TABLE Alunos (
          ra   NUMBER(10)     PRIMARY KEY,
          cpf  NVARCHAR2(10)  NOT NULL,
          nome VARCHAR2(75)  NOT NULL
        )';
    EXCEPTION
      WHEN OTHERS THEN
        IF SQLCODE != -955 THEN -- ORA-00955: name is already used by an existing object
          RAISE;
        END IF;
    END;`;

    const conn = await getConnection();
    try {
        await conn.execute(sql);
    } finally {
        await conn.close();
    }
}

async function bootstrapLivro() {
    const sql = `
      BEGIN
        EXECUTE IMMEDIATE '
          CREATE TABLE Livro (
            isbn   NUMBER(10)     PRIMARY KEY,
            genero  VARCHAR2(50)  NOT NULL,
            nome VARCHAR2(75)  NOT NULL
          )';
      EXCEPTION
        WHEN OTHERS THEN
          IF SQLCODE != -955 THEN -- ORA-00955: name is already used by an existing object
            RAISE;
          END IF;
      END;`;

    const conn = await getConnection();
    try {
        await conn.execute(sql);
    } finally {
        await conn.close();
    }
}

module.exports = { bootstrapAluno, bootstrapLivro };
