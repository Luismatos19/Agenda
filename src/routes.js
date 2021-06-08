const express = require("express");
const routes = express.Router();
const HomeController = require("./controllers/HomeController");
const ContactController = require("./controllers/ContactController");
const LoginController = require("./controllers/LoginController");

const { loginRequired } = require("./middlewares/middleware");

//Rotas home
routes.get("/", HomeController.index);
routes.get("/modal/:id", ContactController.modal);
routes.get("/find/:name", ContactController.find);

//Rotas login
routes.get("/login/index", LoginController.index);
routes.post("/login/register", LoginController.create);
routes.post("/login/auth", LoginController.auth);
routes.get("/login/logout", LoginController.logout);

//Rotas contato
routes.get("/contact/index", ContactController.index);
routes.post("/contact/register", ContactController.register);
routes.get("/contact/index/:id", ContactController.editIndex);
routes.post("/contact/edit/:id", ContactController.edit);
routes.get("/contact/delete/:id", loginRequired, ContactController.delete);

module.exports = routes;
