const AlunosRepository = require('../repositories/AlunosRepository');
const Aluno = require('../models/alunos');

const repo = new AlunosRepository();

async function create(req, res) {
  const { ra, cpf, nome } = req.body || {};

  if (!ra || !cpf) {
    // const erro = new Comunicado('DdI', 'Dados incompletos',
    //   'Não foram informados todos os dados do veículo');
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
    return res.status(500).json(body);
  }
}

async function findOne(req, res) {
  const { ra } = req.params;

  try {
    const item = await repo.findById(ra);
    if (!item) {

      return res.status(404).json(erro);
    }
    return res.status(200).json(item);
  } catch (err) {
    console.error(err);

    return res.status(500).json(body);
  }
}

module.exports = { create, findAll, findOne };
