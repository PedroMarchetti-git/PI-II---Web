const { getConnection } = require('../db'); // sua função que retorna pool ou connection

class AlunosRepository {
  async create(aluno) {
    const sql = `
      INSERT INTO Alunos (ra, cpf, nome)
      VALUES (?, ?, ?)
    `;
    const values = [aluno.ra, aluno.cpf, aluno.nome];

    const conn = await getConnection();
    try {
      await conn.execute(sql, values);
    } finally {
      await conn.release(); // se for pool, libera a conexão
    }
  }

  async findAll() {
    const sql = `
      SELECT
        ra   AS RA,
        cpf  AS CPF,
        nome AS Nome
      FROM Alunos
      ORDER BY ra
    `;
    const conn = await getConnection();
    try {
      const [rows] = await conn.execute(sql);
      return rows; // já vem como array de objetos
    } finally {
      await conn.release();
    }
  }

  async findById(ra) {
    const sql = `
      SELECT
        ra   AS ra,
        cpf  AS cpf,
        nome AS Nome
      FROM Alunos
      WHERE ra = ?
    `;
    const conn = await getConnection();
    try {
      const [rows] = await conn.execute(sql, [ra]);
      return rows[0] || null;
    } finally {
      await conn.release();
    }
  }
}

module.exports = AlunosRepository;
