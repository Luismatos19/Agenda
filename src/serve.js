require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const { middlewareGlobal } = require("./middlewares/middleware");
const routes = require("./routes");
const path = require("path");
const server = express();

//garante que o servidor so vai ser iniciado depois que se conctar a base de dados
mongoose
  .connect(process.env.CONECTIONSTRING, {
    //CONECTIONSTRING guardado no dotenv
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Conectado ao banco de dados MongoDB");
    server.emit("read"); // emite o sinal
  })
  .catch((err) => console.log(err));

//usando template engine (ejs)
server.set("view engine", "ejs");

server.use(
  session({
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true },
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

server.use(express.urlencoded({ extended: true }));

//
server.use(routes);

server.on("read", () => {
  //serve incia apos o sinal emitido

  server.listen(3000, () => console.log("rodando"));
});
