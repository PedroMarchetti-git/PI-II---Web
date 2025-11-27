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

  async classificacaoPorRA(ra) {
    const sql = `
    SELECT s.ra,
           s.nome,
           COALESCE(s.total_lidos, 0) AS quantidade_lidos,
           s.ultimo_emprestimo,
           l.titulo AS titulo_ultimo_livro,
           s.classificacao
    FROM (
      SELECT a.ra,
             a.nome,
             counts.total_lidos,
             counts.ultimo_emprestimo,
             RANK() OVER (ORDER BY COALESCE(counts.total_lidos,0) DESC) AS classificacao
      FROM Alunos a
      LEFT JOIN (
        SELECT e.ra,
               COUNT(CASE WHEN e.data_devolucao IS NOT NULL THEN 1 END) AS total_lidos,
               MAX(e.data_emprestimo) AS ultimo_emprestimo
        FROM Emprestimos e
        GROUP BY e.ra
      ) counts ON counts.ra = a.ra
    ) s
    LEFT JOIN Emprestimos e ON e.ra = s.ra AND e.data_emprestimo = s.ultimo_emprestimo
    LEFT JOIN Livros l ON l.id = e.id_livro
    WHERE s.ra = ?;
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
