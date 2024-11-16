const mongoose = require('../config/database');
const AlunoSchema = new mongoose.Schema(
    {
        ra: { type: Number, required: true},
        nome: {type: String, required: true}
    }
)
module.exports = mongoose.model('Aluno', AlunoSchema)