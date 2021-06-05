const express = require("express");
const routes = express.Router();
const HomeController = require("./controllers/HomeController");
const ContactController = require("./controllers/ContactController");
const LoginController = require("./controllers/LoginController");

const { loginRequired } = require("./middlewares/middleware");

//Rotas home
routes.get("/", loginRequired, HomeController.index);

//Rotas login
routes.get("/login/index", LoginController.index);
routes.post("/login/register", LoginController.create);
routes.post("/login/auth", LoginController.auth);
routes.get("/login/logout", LoginController.logout);

//Rotas contato
routes.get("/contact/index", loginRequired, ContactController.index);
routes.post("/contact/register", loginRequired, ContactController.register);
routes.get("/contact/index/:id", loginRequired, ContactController.editIndex);
routes.post("/contact/edit/:id", loginRequired, ContactController.edit);

module.exports = routes;
