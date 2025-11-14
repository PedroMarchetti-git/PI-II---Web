const express = require('express');
const { create, findAll, findOne } = require('../controllers/alunosController');

const router = express.Router();

router.post('/', create);
router.get('/', findAll);
router.get('/:ra', findOne);

module.exports = router;
