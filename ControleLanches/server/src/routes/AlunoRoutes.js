const express = require('express');
const router = express.Router();
const AlunoController = require('../controller/AlunoController');
const AlunoValidation = require('../middlewares/AlunoValidation');

router.post('/', AlunoValidation,  AlunoController.create);
router.put('/:id', AlunoValidation,  AlunoController.update);
router.delete('/:id',  AlunoController.delete);
router.get('/:id',  AlunoController.get);
router.get('/filter/getAll',  AlunoController.getAll);
router.get('/filter/getNextId',  AlunoController.getNextId);

module.exports = router;