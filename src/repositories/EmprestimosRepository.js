const { getConnection } = require('../db');

class EmprestimosRepository {
  async create(emprestimo) {
    const sql = `
      INSERT INTO Emprestimos (ra, id_livro)
      VALUES (?, ?)
    `;
    const values = [emprestimo.ra, emprestimo.id_livro];

    const conn = await getConnection();
    try {
      await conn.query(sql, values);
    } finally {
      conn.release();
    }
  }

  async devolver(emprestimo) {
    const sql = `
      UPDATE Emprestimos
      SET data_devolucao = CURRENT_TIMESTAMP
      WHERE id_livro = ? AND ra = ? AND data_devolucao IS NULL
    `;

    const conn = await getConnection();
    try {
      await conn.query(sql, [emprestimo.id_livro, emprestimo.ra]);
    } finally {
      conn.release();
    }
  }

  async findAtivos() {
    const sql = `
      SELECT 
        Emprestimos.id AS id_emprestimo,
        Livros.id AS id_livro,
        Livros.titulo,
        Livros.autor
      FROM Emprestimos
      JOIN Livros ON Livros.id = Emprestimos.id_livro
      WHERE Emprestimos.data_devolucao IS NULL
    `;

    const conn = await getConnection();
    try {
      const [rows] = await conn.query(sql);
      return rows;
    } finally {
      conn.release();
    }
  }
}

module.exports = EmprestimosRepository;

