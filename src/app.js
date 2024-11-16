const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const alunoRoutes = require("./routes/alunoRoutes");
const autorizacaoRoutes = require("./routes/autorizacaoRoutes");

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Conectado ao MongoDB"))
  .catch((error) => console.error("Erro ao conectar ao MongoDB:", error));

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use("/api/alunos", alunoRoutes);
app.use("/api/autorizacoes", autorizacaoRoutes);

module.exports = app;
