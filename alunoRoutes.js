const express = require("express");
const alunoController = require("../controllers/alunoController");
const router = express.Router();

router.post("/", alunoController.createAluno);
router.get("/", alunoController.getAlunos);

module.exports = router;
