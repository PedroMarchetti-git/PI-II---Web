const AlunosRepository = require('../repositories/AlunosRepository');
const Aluno = require('../models/alunos');
// const { mapOracleErrorToHttp } = require('../utils/oracleHelpers');

const repo = new AlunosRepository();

async function create(req, res) {
  const { ra, cpf, nome } = req.body || {};

  if (!ra || !cpf) {
    // const erro = new Comunicado('DdI', 'Dados incompletos',
    //   'Não foram informados todos os dados do veículo');
    return res.status(422).json(erro);
  }

  const aluno = new Aluno(ra, cpf, nome);

  try {
    await repo.create(aluno);
    // const sucesso = new Comunicado('IBS', 'Inclusão bem sucedida',
    //   'O veículo foi incluído com sucesso');
    return res.status(201).json(sucesso);
  } catch (err) {
    console.error(err);
    // const mapped = mapOracleErrorToHttp(err);
    if (mapped) {
    // //   const body = new Comunicado(mapped.code, mapped.message,
    // //     'Já há veículo cadastrado com o código informado');
      return res.status(500).json(body);
    }
    // const body = new Comunicado('ERR', 'Erro ao incluir',
    //   'Não foi possível incluir o veículo');
    return res.status(500).json(body);
  }
}

async function findAll(req, res) {
  // recusar JSON desnecessário para GET
  if (req.body && Object.keys(req.body).length) {
    // const erro = new Comunicado('JSP', 'JSON sem propósito',
    //   'Foram disponibilizados dados em um JSON sem necessidade');
    return res.status(422).json(erro);
  }

  try {
    const itens = await repo.findAll();
    // já no formato { codigo, placa, dataentrada }
    return res.status(200).json(itens);
  } catch (err) {
    console.error(err);
    // const body = new Comunicado('ERR', 'Erro na recuperação',
    //   'Não foi possível recuperar os veículos');
    return res.status(500).json(body);
  }
}

async function findOne(req, res) {
  // recusar JSON desnecessário para GET
  if (req.body && Object.keys(req.body).length) {
    // const erro = new Comunicado('JSP', 'JSON sem propósito',
    //   'Foram disponibilizados dados em um JSON sem necessidade');
    return res.status(422).json(erro);
  }

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
