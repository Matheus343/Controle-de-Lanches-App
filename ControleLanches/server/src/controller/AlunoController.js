const AlunoModel = require('../model/AlunoModel');

class AlunoController {
    async create(req, res) {  // req = request  e res = response
        const aluno = new AlunoModel(req.body);
        await aluno
            .save()
            .then(response => {
                return res.status(200).json(response);
            })
            .catch(error => {
                return res.status(500).json(error);
            });
    }


    async getAll(req, res) {
        await AlunoModel.find().sort('id')
            .then(response => { return res.status(200).json(response) })
            .catch(error => { return res.status(500).json(error) });
    }


    async get(req, res) {
        await AlunoModel.findOne({ "id": req.params.id })
            .then(response => { return res.status(200).json(response) })
            .catch(error => { return res.status(500).json(error) });
    }

    async getNextId(req, res) {
        let resposta = await AlunoModel.findOne().select("id")
                       .sort({ "id": 'descending' }).limit(1);
        let id = 1;
        if (resposta != null)
        {
            console.log(resposta);
            id = Number.parseInt(resposta.id) +1;
        }

        return res.status(200).json(id);
    }


    async update(req, res) {

        await AlunoModel.findOneAndUpdate(
                { "id": Number.parseInt(req.params.id) }, 
                req.body, { new: true }
             )
            .then(response => { return res.status(200).json(response) })
            .catch(error => { return res.status(500).json(error) });
    }

    async delete(req, res) {
        await AlunoModel.findOneAndDelete({ "id": req.params.id })
            .then(response => { return res.status(200).json(response) })
            .catch(error => { return res.status(500).json(error) });
    }

}

module.exports = new AlunoController();

