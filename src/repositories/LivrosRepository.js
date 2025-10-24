const { getConnection } = require('../db');

class AlunosRepository {
  async create(aluno) {
    const sql = `
      INSERT INTO Alunos (ra, cpf, nome)
      VALUES (:ra, :cpf, nome)
    `;
    const binds = {
      ra: aluno.ra,
      cpf: aluno.nome
    };

    const conn = await getConnection();
    try {
      await conn.execute(sql, binds, { autoCommit: true });
    } finally {
      await conn.close();
    }
  }

  async findAll() {
    const sql = `
      SELECT
        ra   AS "RA",
        cpf  AS "CPF",
        nome AS "Nome"
      FROM Alunos
      ORDER BY ra
    `;
    const conn = await getConnection();
    try {
      const result = await conn.execute(sql);
      return result.rows; // já vem como objetos
    } finally {
      await conn.close();
    }
  }

  async findById(ra) {
    const sql = `
      SELECT
        ra   AS "ra",
        cpf  AS "cpf",
        nome AS "Nome"
      FROM Veiculos
      WHERE ra = :ra
    `;
    const conn = await getConnection();
    try {
      const result = await conn.execute(sql, { ra });
      return result.rows[0] || null;
    } finally {
      await conn.close();
    }
  }
}

module.exports = AlunosRepository;
