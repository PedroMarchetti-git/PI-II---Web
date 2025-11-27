const express = require('express');
const { create, findAll, findOne, classificacaoEmprestimos } = require('../controllers/alunosController');

const router = express.Router();

router.post('/', create);
router.get('/', findAll);
router.get('/classificacao/emprestimos', classificacaoEmprestimos);
router.get('/:ra', findOne);

module.exports = router;
