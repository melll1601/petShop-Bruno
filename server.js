import express from "express";
import mysql from "mysql2/promise";

const app = express();
app.use(express.json());

const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "mysqlPW",
    database: "provami77",
});

console.log("Conectado");

app.post("/cadastrar", async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const sql = "INSERT INTO Usuario (nome, email, senha) VALUES (?, ?, ?)";
        await connection.execute(sql, [nome, email, senha]);

        return res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao salvar usuário" });
    }
});

app.listen(3000, () => {
    console.log("rodando em http://localhost:3000");
});
