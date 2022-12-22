const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository)

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const updatedRepository = request.body;

  const repositoryFind = repositories.find(repository => repository.id === id);

  if (!repositoryFind) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositoryFind.url = updatedRepository.url;
  repositoryFind.title = updatedRepository.title;
  repositoryFind.techs = updatedRepository.techs;

  return response.json(repositoryFind);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryFind = repositories.find(repository => repository.id === id);

  if (!repositoryFind) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositories.splice(repositories.indexOf(repositoryFind), 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryFind = repositories.find(repository => repository.id === id);

  if (!repositoryFind) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositoryFind.likes++;

  return response.json({
    likes: repositoryFind.likes
  });
});

module.exports = app;
