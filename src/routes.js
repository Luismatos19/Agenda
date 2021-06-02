const express = require("express");
const routes = express.Router();
const HomeController = require("./controllers/HomeControllers");

routes.get("/", HomeController.index);

module.exports = routes;
