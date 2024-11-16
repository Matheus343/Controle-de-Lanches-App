const express = require("express");
const autorizacaoController = require("../controllers/autorizacaoController");
const router = express.Router();

router.post("/", autorizacaoController.createAutorizacao);
router.get("/", autorizacaoController.getAutorizacoesByDate);

module.exports = router;
