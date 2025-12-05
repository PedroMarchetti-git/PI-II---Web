const express = require('express');
const { create, devolucao, emprestimosAtivos, getClassificacaoLeitores} = require('../controllers/emprestimoController');
const router = express.Router();

router.post('/', create);
router.post('/devolucao', devolucao);
router.get('/ativos', emprestimosAtivos)
router.get('/classificacao', getClassificacaoLeitores);

module.exports = router;