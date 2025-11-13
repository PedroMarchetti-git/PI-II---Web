const { getConnection } = require('../db');

class EmprestimosRepository {
  async create(emprestimo) {
    const sql = `
      INSERT INTO emprestimo (id_user, id_livro)
      VALUES (?, ?)
    `;
    const values = [emprestimo.id_user, emprestimo.id_livro];

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
      WHERE id_livro = ? and id_user = ?`;

      const conn = await getConnection();
      try {
        await conn.query(sql, [emprestimo.id_livro, emprestimo.id_user]);
      } finally {
        conn.release();
      }
  }

}

module.exports = EmprestimosRepository;
