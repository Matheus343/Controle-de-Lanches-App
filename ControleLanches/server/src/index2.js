const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const server = express();

server.use(cors());
server.use(express.json());

mongoose.connect('mongodb://localhost:27017/SeuBancoDeDados', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Conectado ao MongoDB'))
    .catch((error) => console.error('Erro ao conectar ao MongoDB:', error));

const AutorizacaoRoutes = require('./routes/AutorizacaoRoutes'); 
server.use('/lanche', AutorizacaoRoutes); 

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
