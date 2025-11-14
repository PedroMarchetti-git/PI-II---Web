const Emprestimo = require('../models/emprestimo');
const EmprestimosRepository = require('../repositories/EmprestimosRepository');

const repo = new EmprestimosRepository();

async function create(req, res) {
    const { id_user, id_livro } = req.body || {};

    if (!id_user || !id_livro) {
        return res.status(422).json({ erro: 'Os campos RA e Livro são obrigatórios' });
    }

    const emprestimo = new Emprestimo(id_user, id_livro);

    try {
        await repo.create(emprestimo);
        return res.status(201).json({ mensagem: 'Emprestimo registrado com sucesso!' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ erro: 'Erro ao registrar empréstimo' });
    }
}

async function devolucao(req, res) {
    try {
        const { id_user, id_livro } = req.body || {};

        const emprestimo = new Emprestimo(id_user, id_livro);

        await repo.devolver(emprestimo);
        return res.status(200).json({ mensagem: 'Devolução registrada com sucesso!' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ erro: 'Erro ao realizar a devolução do livro' });
    }
}

module.exports = { create, devolucao };
