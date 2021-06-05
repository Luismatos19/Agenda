const express = require("express");
const routes = express.Router();
const HomeController = require("./controllers/HomeController");
const ContactController = require("./controllers/ContactController");
const LoginController = require("./controllers/LoginController");

//Home Routes
routes.get("/", HomeController.index);

//Login Routes
routes.get("/login/index", LoginController.index);
routes.post("/login/register", LoginController.create);
routes.post("/login/auth", LoginController.auth);
routes.get("/login/logout", LoginController.logout);

//Contact Routes
routes.get("/contact", ContactController.create);

module.exports = routes;
