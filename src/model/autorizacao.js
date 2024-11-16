const mongoose = require("mongoose");

const autorizacaoSchema = new mongoose.Schema({
    dataLiberacao: { type: Date, required: true },
    codigoAluno: { type: mongoose.Schema.Types.ObjectId, ref: "Aluno", required: true },
    quantidadeLanches: { type: Number, max: 3 },
    entregue: { type: Boolean, default: false },
});

module.exports = mongoose.model("Autorizacao", autorizacaoSchema);
