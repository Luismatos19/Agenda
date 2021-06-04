const express = require("express");
const server = express();
const routes = require("./routes");
const path = require("path");
const cors = require("cors");
const BodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const helmet = require("helmet");
const csrf = require("csurf");
const { middlewareGlobal } = require("./middlewares/middleware");

//usando template engine (ejs)
server.set("view engine", "ejs");

server.use(
  session({
    cookie: { maxAge: 60000 },
    secret: "woot",
    resave: false,
    saveUninitialized: false,
  })
);

server.use(flash());

server.use(middlewareGlobal);

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
