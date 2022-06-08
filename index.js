const mongoose = require("mongoose");
// const startupDebugger = require("debug")("app:startup");
// const dbDebugger = require("debug")("app:db");
const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const home = require("./routes/home");
const logger = require("./middleware/logger");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const authenticator = require("./authenticator");
const express = require("express");
const app = express();

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Connected to the Vidly db..."))
  .catch((err) => console.error("Couldn't connect to Vidly...", err));

app.set("view engine", "pug");

app.use(express.json());
app.use(helmet());
app.use("/", home);
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use(logger);
app.use(authenticator);

// Configuration

// console.log("Application name:", config.get("name"));
// console.log("Mail Server:", config.get("mail.host"));
// console.log("Mail Password:", config.get("mail.password"));

// Enabled only for development

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  // startupDebugger("Morgan enabled...");
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
