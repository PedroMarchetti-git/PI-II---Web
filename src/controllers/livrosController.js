const LivrosRepository = require('../repositories/LivrosRepository');
const Livro = require('../models/livros');

const repo = new LivrosRepository();

async function create(req, res) {
    const { titulo, autor, genero, editora } = req.body || {};

    if (!titulo || !autor || !genero || !editora) {
        return res.status(422).json({ erro: 'Todos os campos são obrigatórios' });
    }

    const livro = new Livro(titulo, autor, genero, editora);

    try {
        await repo.create(livro);
        return res.status(201).json({ mensagem: 'Livro cadastrado com sucesso!' });
    } catch (err) {
        console.error('Erro ao cadastrar livro:', err);
        return res.status(500).json({ erro: 'Erro ao cadastrar livro' });
    }
}

async function findAll(req, res) {
    try {
        const itens = await repo.findAll();
        return res.status(200).json(itens);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ erro: 'Erro ao buscar livros' });
    }
}

async function findOne(req, res) {
    const { id } = req.params;
    try {
        const item = await repo.findById(id);
        if (!item) {
            return res.status(404).json({ erro: 'Livro não encontrado' });
        }
        return res.status(200).json(item);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ erro: 'Erro ao buscar livro' });
    }
}

async function findAvailableByTerm(req, res) {
    const { termo } = req.query;

    if (!termo) {
        return res.status(400).json({ erro: 'O termo de busca é obrigatório' });
    }

    try {
        const itens = await repo.findAvailableByTerm(termo);
        return res.status(200).json(itens);

    } catch (err) {
        console.error('Erro ao buscar livros:', err);
        return res.status(500).json({ erro: 'Erro ao buscar livros' });
    }
}


module.exports = { create, findAll, findOne, findAvailableByTerm };
