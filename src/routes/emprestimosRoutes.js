const express = require('express');
const { create, devolucao, emprestimosAtivos } = require('../controllers/emprestimoController');
const router = express.Router();

router.post('/', create);
router.post('/devolucao', devolucao);
router.get('/ativos', emprestimosAtivos)


module.exports = router;