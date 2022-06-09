const Joi = require("joi");
const mongoose = require("mongoose");

const Genre = mongoose.model(
  "Genre",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      min: 5,
      max: 50,
    },
  })
);

// Validation

function validateGenres(genre) {
  const schema = Joi.object({ name: Joi.string().min(5).max(50).required() });
  return schema.validate(genre);
}

exports.Genre = Genre;
exports.validate = validateGenres;
