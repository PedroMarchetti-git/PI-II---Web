const Emprestimo = require('../models/emprestimo');
const EmprestimosRepository = require('../repositories/EmprestimosRepository');

const repo = new EmprestimosRepository();

async function create(req, res) {
    const { ra, id_livro } = req.body || {};

    if (!ra || !id_livro) {
        return res.status(422).json({ erro: 'Os campos RA e Livro são obrigatórios' });
    }

    const emprestimo = new Emprestimo(ra, id_livro);

    try {
        await repo.create(emprestimo);
        return res.status(201).json({ mensagem: 'Empréstimo registrado com sucesso!' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ erro: 'Erro ao registrar empréstimo' });
    }
}

async function devolucao(req, res) {
    const { ra, id_livro } = req.body || {};

    const emprestimo = new Emprestimo(ra, id_livro);

    try {
        await repo.devolver(emprestimo);
        return res.status(200).json({ mensagem: 'Devolução registrada com sucesso!' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ erro: 'Erro ao realizar a devolução' });
    }
}

async function emprestimosAtivos(req, res) {
    try {
        const dados = await repo.findAtivos();
        return res.status(200).json(dados);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ erro: 'Erro ao buscar empréstimos ativos' });
    }
}

module.exports = { create, devolucao, emprestimosAtivos};
