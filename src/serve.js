const express = require("express");
const server = express();
const routes = require("./routes");
const path = require("path");
const cors = require("cors");
const BodyParser = require("body-parser");

//usando template engine (ejs)
server.set("view engine", "ejs");

//habilitar arquivos statics
server.use(express.static("public"));

//localização da pasta views
server.set("views", path.join(__dirname, "views"));

//usar red body

server.use(express.urlencoded({ extended: true }));

//server.use(cors());
//let urlencodedParser = bodyParser.urlencoded({ extended: false });

//
server.use(routes);

server.listen(3000, () => console.log("rodando"));
