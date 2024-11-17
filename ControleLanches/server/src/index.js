const express = require('express');
const cors = require('cors');

const server = express();

// Middlewares
server.use(express.json());
server.use(cors());

// Teste de Operação
server.get('/teste', (req, res) => {
  res.send('<h1>Servidor Operante</h1>');
});

// Rotas de Aluno
const AlunoRoutes = require('./routes/AlunoRoutes');
server.use('/aluno', AlunoRoutes);


// Inicializar o Servidor
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor Online em http://localhost:${PORT}`);
});
