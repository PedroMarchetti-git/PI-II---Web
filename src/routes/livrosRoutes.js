const express = require('express');
const { create, findAll, findEmprestimos} = require('../controllers/livrosController');

const router = express.Router();

router.post('/', create);
router.get('/', findAll);
router.get('/emprestimos', findEmprestimos)

module.exports = router;
