const express = require('express');
const { create, findAll, findOne } = require('../controllers/livrosController');

const router = express.Router();

router.post('/livros', create);
router.get('/livros', findAll);
router.get('/livros/:isbn', findOne);

module.exports = router;
