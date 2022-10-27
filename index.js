const express = require("express");

const server = express();
server.use(express.json());

const cursos = ["Java Script", "NodeJs", "PHP"];
/* 
server.get("/cursos", (req, res) => {
  const nome = req.query.nome;
  return res.json({ curso: `Aprendendo ${nome}` });
});
 */
/* server.get("/curso/:id", (req, res) => {
  const id = req.params.id;
  return res.json({ curso: `Curso ${id}` });
});
 */

server.use((req, res, next) => {
  const url = req.url;
  console.log(`URL CHAMADA: ${url}`);
  return next();
});

function checkName(req, res, next) {
  if (!req.body.name)
    return res.status(404).json({
      error: "Nome é obrigatorio",
    });

  return next();
}

function checkIndexCurso(req, res, next) {
  const curso = cursos[req.params.index];

  if (!curso)
    res.status(404).json({
      error: "Curso não encontrado!!",
    });

  req.curso = curso;

  return next();
}

server.get("/cursos/:index", checkIndexCurso, (req, res) => {
  return res.json(req.curso);
});

/* CRUD */

server.get("/cursos", (req, res) => {
  return res.json(cursos);
});

//Adcionando Curso
server.post("/cursos", checkName, (req, res) => {
  const { name } = req.body;

  cursos.push(name);

  return res.send("Curso adcionado com sucesso!");
});

//Editando Curso
server.put("/cursos/:index", checkName, checkIndexCurso, (req, res) => {
  const { name } = req.body;
  const { index } = req.params;

  if (!cursos[index]) return res.send("Curso Não encontrado");

  cursos[index] = name;

  return res.send("Cursos editado com sucesso!!");
});

//Deletando Curso
server.delete("/cursos/:index", checkIndexCurso, (req, res) => {
  const { index } = req.params;

  if (!cursos[index]) return res.send("Curso Não encontrado");

  cursos.splice(index, 1);

  return res.send("Cursos apagadp com sucesso!!");
});

server.listen(3200);
