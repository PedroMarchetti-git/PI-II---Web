const express = require('express');
const { create, findAll, findOne } = require('../controllers/alunosController');

const router = express.Router();

router.post('/alunos', create);
router.get('/alunos', findAll);
router.get('/alunos/:ra', findOne);

module.exports = router;
