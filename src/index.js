import express from "express";
import cors from "cors";

const server = express();
server.use(express.json());
server.use(cors());


server.get('/teste', (req,res) => {
    res.send('<h1> Servidor Operante </h1>');
});

server.listen(3000, ()=>{
    console.log("Servidor Online");
});

