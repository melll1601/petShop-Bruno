import express from "express";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const app = express();
app.use(express.json());

const DB_CONFIG = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
};

async function startServer() {
    let connection;
    try {
        connection = await mysql.createConnection(DB_CONFIG);
        console.log("Conectadp ao banco de dados com sucesso.");

        app.post("/cadastrar", async (req, res) => {
            const { nome, email, senha } = req.body;

            if (!nome || !email || !senha) {
                return res.status(400).json({ error: "Todos os campos são obrigatórios." });
            }

            try {
                const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
                const hashedPassword = await bcrypt.hash(senha, saltRounds);

                const sql = "INSERT INTO Usuario (nome, email, senha) VALUES (?, ?, ?)";
                await connection.execute(sql, [nome, email, hashedPassword]);

                return res.status(201).json({ message: "Usuário cadastrado com sucesso!" });

            } catch (error) {

                console.error("Erro ao salvar usuário:", error);

                if (error.code === 'falta definir endpoint de response aq ainda') {
                    return res.status(409).json({ error: "Este email já está cadastrado." });
                
                return res.status(500).json({ error: "Erro interno do servidor ao salvar usuário" });
            }
        }});

        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`Servidor rodando em http://localhost:${PORT}`);
        });

    } catch (error) {

        console.log("Falha ao conectar ao banco de dados ou inicializar o servidor.");
        console.error(error);
        process.exit(1);
    }
}

startServer();