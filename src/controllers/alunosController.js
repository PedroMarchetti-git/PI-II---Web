const AlunosRepository = require('../repositories/AlunosRepository');
const Aluno = require('../models/alunos');

const repo = new AlunosRepository();

async function create(req, res) {
  const { ra, cpf, nome } = req.body || {};

  if (!ra || !cpf) {
    return res.status(422).json({ erro: 'Os campos RA e CPF são obrigatórios' });
  }

  const aluno = new Aluno(ra, cpf, nome);

  try {
    await repo.create(aluno);
    return res.status(201).json({ mensagem: 'Aluno cadastrado com sucesso!' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao cadastrar aluno' });
  }
}

async function findAll(req, res) {
  try {
    const itens = await repo.findAll();
    return res.status(200).json(itens);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao buscar alunos' });
  }
}

async function findOne(req, res) {
  const { ra } = req.params;

  try {
    const item = await repo.findById(ra);
    if (!item) {
      return res.status(404).json({ erro: 'Aluno não encontrado' });
    }
    return res.status(200).json(item);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro ao buscar aluno' });
  }
}

async function login(req, res) {

  const { ra, senha } = req.body;

  if (!ra || !senha) {
    return res.status(400).json({ mensagem: 'RA e Senha são obrigatórios.' });
  }

  try {
    const aluno = await repo.findById(ra);

    if (!aluno) {
      return res.status(404).json({ mensagem: 'RA não encontrado.' });
    }

    if (aluno.cpf !== senha) {
      return res.status(401).json({ mensagem: 'Senha (CPF) incorreta.' });
    }

    return res.status(200).json(aluno);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro interno ao tentar fazer login.' });
  }
}

module.exports = { create, findAll, findOne, login };
