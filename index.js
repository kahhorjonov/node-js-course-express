const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

let genres = [
  { id: 1, name: "genre1" },
  { id: 2, name: "genre2" },
  { id: 3, name: "genre3" },
  { id: 4, name: "genre4" },
  { id: 5, name: "genre5" },
  { id: 6, name: "genre6" },
];

// vidly GET genres

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Not Found 404");

  res.send(genre);
});

// vidly POST genres

app.post("/api/genres", (req, res) => {
  const { error } = validateGenres(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(genre);
  res.send(genre);
});

// vidly PUT genres

app.put("/api/genres/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Not Found 404");

  const { error } = validateGenres(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.name = req.body.name;
  res.send(genre);
});

// vidly Delete genres

app.delete("/api/genres/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Not Found 404");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

// Validation

function validateGenres(genre) {
  const schema = Joi.object({ name: Joi.string().min(3).required() });
  return schema.validate(genre);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
