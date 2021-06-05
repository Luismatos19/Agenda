const Login = require("../models/LoginModel");

module.exports = {
  index(req, res) {
    if (req.session.user) return res.render("index");
    return res.render("login");
  },

  async create(req, res) {
    try {
      const newRegister = new Login(req.body);

      await newRegister.register();

      // checa se ha erros se houver manda o usuario de volta para pagina de register
      if (newRegister.errors.length > 0) {
        req.flash("errors", newRegister.errors);
        req.session.save(function () {
          return res.redirect("back");
        });

        return;
      }

      //caso não registre erros, informa mensagem de sucesso na tela e acessa a agenda
      req.flash("success", "Seu usuário foi criado com sucesso.");
      req.session.save(function () {
        return res.redirect("index");
      });

      //res.send(newRegister.body);
    } catch (err) {
      console.log(err);
      return res.render("errorPage");
    }
  },

  async auth(req, res) {
    try {
      const login = new Login(req.body);

      await login.auth();

      // checar se ha erros se houver manda o usuario de volta para pagina de register
      if (login.errors.length > 0) {
        req.flash("errors", login.errors);
        req.session.save(function () {
          return res.redirect("back");
        });

        return;
      }

      //caso não registre erros, informa mensagem de sucesso na tela e acessa a agenda
      req.flash("success", "Login efetuado com sucesso.");
      req.session.user = login.user; // guarda o usuario na sessão
      req.session.save(function () {
        return res.redirect("index");
      });
    } catch (err) {
      console.log(err);
      return res.render("errorPage");
    }
  },

  logout(req, res) {
    req.session.destroy();
    res.redirect("/");
  },
};
