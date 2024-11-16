const express = require('express');
const cors= require('cors');
const server = express();
server.use(express.json());
server.use(cors());


server.get('/teste', (req,res) => {
    res.send('<h1> Servidor Operante </h1>');
});

const AlunoRoutes = require('./routes/AlunoRoutes');
server.use('/aluno', AlunoRoutes);


server.listen(3000, ()=>{
    console.log("Servidor Online");
});
