require("dotenv").config();
const app = require("./app");
const connectToDatabase = require("./database");

connectToDatabase();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
