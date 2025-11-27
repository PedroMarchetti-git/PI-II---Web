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

  async getClassificacaoEmprestimos() {
    const sql = `
              SELECT 
          a.ra,
          a.nome,
          COUNT(e.id) AS total_emprestimos,
          l.titulo AS ultimo_livro,
          e2.data_emprestimo AS ultimo_emprestimo
      FROM Alunos a
      LEFT JOIN Emprestimos e ON e.ra = a.ra
      LEFT JOIN (
          SELECT 
              em.ra,
              em.id_livro,
              em.data_emprestimo
          FROM Emprestimos em
          INNER JOIN (
              SELECT 
                  ra,
                  MAX(data_emprestimo) AS ultima_data
              FROM Emprestimos
              GROUP BY ra
          ) AS ult
          ON ult.ra = em.ra AND ult.ultima_data = em.data_emprestimo
      ) e2 ON e2.ra = a.ra
      LEFT JOIN Livros l ON l.id = e2.id_livro

      GROUP BY 
          a.ra,
          a.nome,
          l.titulo,
          e2.data_emprestimo

      ORDER BY total_emprestimos DESC;
  `;

    const conn = await getConnection();
    try {
      const [rows] = await conn.execute(sql);
      return rows;
    } finally {
      await conn.release();
    }
  }
}

module.exports = AlunosRepository;
