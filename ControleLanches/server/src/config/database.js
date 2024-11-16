const Mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/alunos';

Mongoose.connect(url)
    .then(() => console.log("Conexão com MongoDB bem-sucedida"))
    .catch((error) => console.error("Erro ao conectar ao MongoDB:", error));
    
module.exports = Mongoose;