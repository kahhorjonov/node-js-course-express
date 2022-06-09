const { Customer, validate } = require("../models/customer");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// Get Customers

router.get("/", async (req, res) => {
  // Gets all courses from db

  res.send(await Customer.find());
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).send("Not found 404!");

  res.send(customer);
});

// Post Customers

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({
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
  const { error } = validate(req, body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
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
  const customer = Customer.findByIdAndRemove(req.params.id);
  if (!customer) return res.status(404).send("Not Found 404");

  res.send(customer);
});

module.exports = router;
