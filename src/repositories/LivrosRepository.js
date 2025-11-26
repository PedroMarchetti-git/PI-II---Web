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
      SELECT l.*
      FROM Livros l
      LEFT JOIN Emprestimos e
        ON l.id = e.id_livro
        AND e.data_devolucao IS NULL
      WHERE e.id_livro IS NULL
    `;
    const conn = await getConnection();
    try {
      const [rows] = await conn.query(sql);
      return rows;
    } finally {
      conn.release();
    }
  }

  async findById(id) {
    const sql = `
      SELECT * FROM Livros
      WHERE id = ?
    `;
    const conn = await getConnection();
    try {
      const [rows] = await conn.query(sql, [id]);
      return rows[0] || null;
    } finally {
      conn.release();
    }
  }
  async findAvailableByTerm(termo) {
    const sql = `
      SELECT * FROM Livros
      WHERE (titulo LIKE ? OR autor LIKE ?) 
      AND status = 'disponivel'
      ORDER BY titulo
    `;
    const searchTerm = `%${termo}%`;
    const values = [searchTerm, searchTerm];

    const conn = await getConnection();
    try {
      const [rows] = await conn.query(sql, values);
      return rows;
    } finally {
      conn.release();
    }
  }
}

module.exports = LivrosRepository;
