const express = require('express');
const { create, findAll, findOne } = require('../controllers/livrosController');

const router = express.Router();

router.post('/', create);
router.get('/', findAll);
router.get('/:isbn', findOne);
router.get('/buscar/termo', findAvailableByTerm);

module.exports = router;
