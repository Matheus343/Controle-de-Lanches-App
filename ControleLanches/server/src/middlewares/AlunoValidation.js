const AlunoModel = require('../model/AlunoModel');
const { isFuture } = require('date-fns');

//const AlunoValidation = async(req, res, next)
async function AlunoValidation(req, res, next) {
    console.log(req.body);
    const { id, nome, ra, foto } = req.body;

    let alteracaoRegistro = req.params.id != null;

    if (!nome || nome.length < 2)
        return res.status(400).json({ erro: 'Informe o nome com ao menos 2 dígitos' });

    
    if (!ra || ra.length < 9)
        return res.status(400).json({erro: "Informe o ra com ao menos 9 dígitos"});

    if (alteracaoRegistro) {
        if (id && Number.parseInt(req.params.id) != Number.parseInt(id))
            return res.status(400).json({ erro: 'Id informado no parâmetro está diferente do id informado no Json' });

        let qtde = (await AlunoModel.countDocuments({ "id": req.params.id }));
        let existe = qtde >= 1;

        if (!existe)
            return res.status(400).json({ erro: 'Não há registro para o Id informado' });
    }
    else {
        if (!id)
            return res.status(400).json({ erro: 'Informe o id' });

        let existe = (await AlunoModel.countDocuments({ "id": id })) >= 1;
        if (existe)
            return res.status(400).json({ erro: 'Já existe uma pessoa cadastrada com este id' });
    }

    return next();
}

module.exports = AlunoValidation;