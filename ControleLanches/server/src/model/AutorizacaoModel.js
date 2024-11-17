const mongoose = require('mongoose');

const AutorizacaoSchema = new mongoose.Schema({
    data: {
        type: String,
        required: true,
    },
    alunoId: {
        type: String,
        required: true,
    },
    qtdeLanches: {
        type: Number,
        required: true,
        max: 3, // Garantir que o máximo de lanches seja 3
    },
});

module.exports = mongoose.model('Autorizacao', AutorizacaoSchema);
