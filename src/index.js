import express from "express";
import cors from "cors";
import { alunos } from "./services/alunos.js";

const app = express();

app.use(cors({}));
app.use(express.json());

// Rota para obter todos os alunos
app.get("/", (req, res) => {
  return res.send(alunos);
});

// Rota para obter alunos de uma escola específica
app.get("/escola/:idEscola", (req, res) => {
  const idEscola = req.params.idEscola;

  // Filtra os alunos pelo ID da turma
  const alunosDaEscola = alunos.filter((aluno) => aluno["ID Escola"] === idEscola);

  // Verifica se foram encontrados alunos para o ID da turma fornecido
  if (alunosDaEscola.length === 0) {
    return res.status(404).send("Nenhum aluno encontrado para o ID da turma fornecido");
  }

  return res.send(alunosDaEscola);
});

app.listen(4000, () => {
  console.log("Servidor rodando na porta 4000");
});

export { app };
