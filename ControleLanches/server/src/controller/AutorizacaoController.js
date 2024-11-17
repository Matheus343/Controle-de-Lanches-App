const AutorizacaoModel = require('../models/AutorizacaoModel');

// Busca todas as autorizações
exports.getAll = async (req, res) => {
    try {
        const autorizacoes = await AutorizacaoModel.find();
        res.status(200).json(autorizacoes);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar autorizações' });
    }
};

// Cria uma nova autorização
exports.create = async (req, res) => {
    const { data, alunoId, qtdeLanches } = req.body;

    // Valida se os campos estão preenchidos
    if (!data || !alunoId || !qtdeLanches) {
        return res.status(400).json({ error: 'Preencha todos os campos' });
    }

    if (qtdeLanches > 3) {
        return res.status(400).json({ error: 'A quantidade máxima de lanches é 3' });
    }

    try {
        // Evita duplicados (mesmo aluno na mesma data)
        const existeAutorizacao = await AutorizacaoModel.findOne({ data, alunoId });
        if (existeAutorizacao) {
            return res.status(400).json({ error: 'Já existe uma autorização para este aluno nesta data' });
        }

        const novaAutorizacao = await AutorizacaoModel.create({ data, alunoId, qtdeLanches });
        res.status(201).json(novaAutorizacao);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar autorização' });
    }
};

// Atualiza uma autorização existente
exports.update = async (req, res) => {
    const { id } = req.params;
    const { data, alunoId, qtdeLanches } = req.body;

    if (!data || !alunoId || !qtdeLanches) {
        return res.status(400).json({ error: 'Preencha todos os campos' });
    }

    if (qtdeLanches > 3) {
        return res.status(400).json({ error: 'A quantidade máxima de lanches é 3' });
    }

    try {
        const autorizacao = await AutorizacaoModel.findByIdAndUpdate(
            id,
            { data, alunoId, qtdeLanches },
            { new: true } // Retorna o documento atualizado
        );
        if (!autorizacao) {
            return res.status(404).json({ error: 'Autorização não encontrada' });
        }
        res.status(200).json(autorizacao);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar autorização' });
    }
};

// Exclui uma autorização
exports.delete = async (req, res) => {
    const { id } = req.params;

    try {
        const autorizacao = await AutorizacaoModel.findByIdAndDelete(id);
        if (!autorizacao) {
            return res.status(404).json({ error: 'Autorização não encontrada' });
        }
        res.status(200).json({ message: 'Autorização excluída com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir autorização' });
    }
};
