const express = require('express');
const router = express.Router();
const AutorizacaoController = require('../controller/AutorizacaoController');

// Rotas de Autorizações de Lanche
router.get('/', AutorizacaoController.getAll); // Rota para buscar todas as autorizações
router.post('/', AutorizacaoController.create); // Rota para criar uma nova autorização
router.put('/:id', AutorizacaoController.update); // Rota para atualizar uma autorização existente
router.delete('/:id', AutorizacaoController.delete); // Rota para excluir uma autorização

module.exports = router;
