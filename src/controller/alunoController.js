const Aluno = require("../models/aluno");

exports.createAluno = async (req, res) => {
    try {
        const aluno = new Aluno(req.body);
        await aluno.save();
        res.status(201).send(aluno);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getAlunos = async (req, res) => {
    try {
        const alunos = await Aluno.find();
        res.status(200).send(alunos);
    } catch (error) {
        res.status(500).send(error);
    }
};
