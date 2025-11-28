const express = require('express');
const { create, findAll, findEmprestimos, findDisponiveis} = require('../controllers/livrosController');

const router = express.Router();

router.post('/', create);
router.get('/', findAll);
router.get('/emprestimos', findEmprestimos);
router.get('/disponiveis', findDisponiveis);

module.exports = router;
