const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const server = express();

// Middlewares
server.use(cors());
server.use(express.json());

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/SeuBancoDeDados', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Conectado ao MongoDB'))
    .catch((error) => console.error('Erro ao conectar ao MongoDB:', error));

// Rotas
const AutorizacaoRoutes = require('./routes/AutorizacaoRoutes'); // Importe as rotas
server.use('/lanche', AutorizacaoRoutes); // Use o prefixo "/lanche" para essas rotas

// Inicializar o servidor
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
