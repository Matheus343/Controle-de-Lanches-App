const mongoose = require("mongoose");

const alunoSchema = new mongoose.Schema({
    ra: { type: String, required: true, unique: true },
    nome: { type: String, required: true },
    foto: { type: String },
});

module.exports = mongoose.model("Aluno", alunoSchema);
