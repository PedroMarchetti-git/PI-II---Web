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

  async findEmprestimos() {
    const sql = `
    SELECT 
      l.titulo,
      l.autor,
      l.genero,
      l.editora,
      a.nome AS aluno_nome,
      e.data_emprestimo
    FROM Emprestimos e
    INNER JOIN Livros l ON e.id_livro = l.id
    LEFT JOIN Alunos a ON e.ra = a.ra
    WHERE e.data_devolucao IS NULL
    ORDER BY e.data_emprestimo DESC
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

async function findDisponiveis() {
  const sql = `
    SELECT 
    l.id AS livro_id, 
    l.genero,         
    l.titulo, 
    l.autor, 
    l.editora,        
    'Disponível' AS status  -- Campo de status criado dinamicamente
    FROM 
      Livros l
    WHERE
    NOT EXISTS (
      SELECT 1
      FROM Emprestimos e
      WHERE 
      e.id_livro = l.id AND e.data_devolucao IS NULL
    )
    `;

    try {
        const [resultados] = await db.query(sql);
        
        return resultados;

    } catch (error) {
        console.error("Erro no Repository (findDisponiveis - NOT EXISTS):", error);
        throw error; 
    }
}

module.exports = LivrosRepository;
