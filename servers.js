const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const db = new sqlite3.Database(":memory:");

// Criar tabela
db.run("CREATE TABLE agendamentos (id INTEGER PRIMARY KEY, nome TEXT, telefone TEXT, email TEXT, dataHorario TEXT)");

app.use(cors());
app.use(express.json());

// Rota para salvar agendamento
app.post("/agendar", (req, res) => {
    const { nome, telefone, email, dataHorario } = req.body;

    db.get("SELECT * FROM agendamentos WHERE dataHorario = ?", [dataHorario], (err, row) => {
        if (row) {
            res.status(400).json({ message: "Horário ocupado!" });
        } else {
            db.run("INSERT INTO agendamentos (nome, telefone, email, dataHorario) VALUES (?, ?, ?, ?)", 
                [nome, telefone, email, dataHorario], () => {
                    res.json({ message: "Agendado! Aguardamos você." });
                }
            );
        }
    });
});

// Iniciar servidor
app.listen(3000, () => console.log("Servidor rodando na porta 3000"));