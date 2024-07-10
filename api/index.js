const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Para parsear JSON no corpo das requisições

// Importar as rotas de materiais
const materialsRouter = require('./routes/materials');
app.use('/materials', materialsRouter);

app.listen(port, () => {
    console.log(`API rodando em http://localhost:${port}`);
});
