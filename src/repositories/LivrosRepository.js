const { getConnection } = require('../db');

class LivrosRepository {
  async create(livro) {
    const sql = `
      INSERT INTO Livros (titulo, autor, genero, editora)
      VALUES (?, ?, ?, ?)
    `;
    const values = [livro.titulo, livro.autor, livro.genero, livro.editora];

    const conn = await getConnection();
    try {
      await conn.query(sql, values);
    } finally {
      conn.release();
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

module.exports = LivrosRepository;
