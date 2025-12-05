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

  async getClassificacaoLeitores() {
    const sql = `
        SELECT
            a.nome,
            COUNT(e.id_livro) AS total_emprestimos,
            MAX(e.data_emprestimo) AS ultimo_emprestimo,
            -- Subconsulta para obter o título do último livro emprestado
            (
                SELECT l.titulo
                FROM Emprestimos sub_e
                INNER JOIN Livros l ON sub_e.id_livro = l.id
                WHERE sub_e.ra = a.ra
                ORDER BY sub_e.data_emprestimo DESC
                LIMIT 1
            ) AS ultimo_livro
        FROM Alunos a
        INNER JOIN Emprestimos e ON a.ra = e.ra
        GROUP BY a.ra, a.nome
        ORDER BY total_emprestimos DESC, ultimo_emprestimo DESC
    `;

    const conn = await getConnection();
    try {
      const [rows] = await conn.query(sql);
      return rows;
    } catch (err) {
      console.error('Erro ao buscar classificação de leitores:', err);
      throw err;
    } finally {
      conn.release();
    }
  }
}

module.exports = EmprestimosRepository;

