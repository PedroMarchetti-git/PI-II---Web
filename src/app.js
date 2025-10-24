const express = require('express');
const cors = require('cors');
const alunosRoutes = require('./routes/alunosRoutes');
const livrosRoutes = require('./routes/livrosRoutes');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/alunos', alunosRoutes);
app.use('/livros', livrosRoutes);

module.exports = app;
