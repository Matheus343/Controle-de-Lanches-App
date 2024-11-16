const Autorizacao = require("../models/autorizacao");

exports.createAutorizacao = async (req, res) => {
    try {
        const autorizacao = new Autorizacao(req.body);
        await autorizacao.save();
        res.status(201).send(autorizacao);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getAutorizacoesByDate = async (req, res) => {
    const { date } = req.query;
    try {
        const autorizacoes = await Autorizacao.find({ data: date }).populate("aluno");
        res.status(200).send(autorizacoes);
    } catch (error) {
        res.status(500).send(error);
    }
};
