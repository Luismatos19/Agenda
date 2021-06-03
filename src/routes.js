const express = require("express");
const routes = express.Router();
const HomeController = require("./controllers/HomeController");
const ContactController = require("./controllers/ContactController");

routes.get("/", HomeController.index);
routes.get("/contact", ContactController.create);

module.exports = routes;
