const Joi = require("joi");
const mongoose = require("mongoose");

const Customer = mongoose.model(
  "Customers",
  new mongoose.Schema({
    isGold: {
      type: Boolean,
      required: true,
    },
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    __v: {
      type: Number,
      required: true,
    },
    phone: {
      required: true,
      type: String,
      minlength: 7,
      maxlength: 7,
    },
  })
);

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

exports.Customer = Customer;
exports.validate = validateCustomers;
