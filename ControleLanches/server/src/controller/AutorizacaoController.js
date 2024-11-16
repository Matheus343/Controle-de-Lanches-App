const AutorizacaoLanche = require('../model/AutorizacaoModel');
const AlunoModel = require('../model/AlunoModel');

// Função para conceder permissões de lanche
exports.concederPermissao = async (req, res) => {
  const { alunos, data } = req.body; // Dados enviados na requisição

  try {
    // Verificar se já existe uma permissão para a mesma data
    let permissaoExistente = await AutorizacaoLanche.findOne({ data });

    if (permissaoExistente) {
      // Se já existir, adiciona os alunos à permissão existente
      permissaoExistente.lanches.push(...alunos.map(aluno => ({
        alunoId: aluno.id,
        quantidade: 3, // Quantidade de lanches
      })));
      permissaoExistente = await permissaoExistente.save();
    } else {
      // Se não houver permissão, cria uma nova
      permissaoExistente = new AutorizacaoLanche({
        data,
        lanches: alunos.map(aluno => ({
          alunoId: aluno.id,
          quantidade: 3, // A quantidade de lanches é 3 para cada aluno
        })),
      });
      await permissaoExistente.save();
    }

    return res.status(201).json({ message: 'Permissões de lanche concedidas com sucesso!' });
  } catch (erro) {
    console.error('Erro ao conceder permissões:', erro);
    return res.status(500).json({ message: 'Erro ao conceder permissões.' });
  }
};
