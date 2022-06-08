const mongoose = require("mongoose");
const express = require("express");
const Joi = require("joi");
const router = express.Router();

const Customers = mongoose.model(
  "Customers",
  new mongoose.Schema({
    isGold: Boolean,
    name: String,
    __v: Number,
    phone: {
      type: String,
      minlength: 7,
      maxlength: 7,
    },
  })
);

// Get Customers

router.get("/", async (req, res) => {
  // Gets all courses from db

  res.send(await Customers.find());
});

router.get("/:id", async (req, res) => {
  const customer = await Customers.findById(req.params.id);
  if (!customer) return res.status(404).send("Not found 404!");

  res.send(customer);
});

// Post Customers

router.post("/", async (req, res) => {
  const { error } = validateCustomers(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customers({
    name: req.body.name,
    isGold: req.body.name,
    phone: req.body.phone,
    __v: req.body.__v,
  });

  customer = await customer.save();
  res.send(customer);
});

// Customers Put method

router.put("/:id", async (req, res) => {
  const { error } = validateCustomers(req, body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customers.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone,
      __v: req.body.__v,
    },
    { new: true }
  );

  if (!customer) return res.status(404).send("Not Found 404!");
  res.send(customer);
});

// Customer Delete method

router.delete("/:id", async (req, res) => {
  const customer = Customers.findByIdAndRemove(req.params.id);
  if (!customer) return res.status(404).send("Not Found 404");

  res.send(customer);
});

// Validation

function validateCustomers(customer) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    isGold: Joi.string().required(),
    __v: Joi.number().required(),
    phone: Joi.string().required(),
  });
  return schema.validate(customer);
}

module.exports = router;
