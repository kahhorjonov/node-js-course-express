const { Genre, validate } = require("../models/genre");
const mongoose = require("mongoose");
const express = require("express");
const Joi = require("joi");
const router = express.Router();

// vidly GET genres

router.get("/", async (req, res) => {
  // Get  all courses from db

  res.send(await Genre.find());
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send("Not Found 404");

  res.send(genre);
});

// vidly POST genres

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({
    name: req.body.name,
  });

  genre = await genre.save();
  res.send(genre);
});

// vidly PUT genres

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre) return res.status(404).send("Not Found 404");

  res.send(genre);
});

// vidly Delete genres

router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre) return res.status(404).send("Not Found 404");

  res.send(genre);
});

module.exports = router;
