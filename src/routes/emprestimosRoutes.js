const express = require('express');
const { create, devolucao } = require('../controllers/emprestimoController');
const router = express.Router();

router.post('/', create);
router.post('/devolucao', devolucao);

module.exports = router;