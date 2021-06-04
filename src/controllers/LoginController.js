const Register = require("../models/RegisterModel");

module.exports = {
  index(req, res) {
    return res.render("login");
  },

  async create(req, res) {
    try {
      const newRegister = new Register(req.body);

      await newRegister.register();

      // checar se ha erros se houver manda o usuario de volta para pagina de register
      if (newRegister.errors.length > 0) {
        req.flash("errors", newRegister.errors);
        req.session.save(function () {
          return res.redirect("back");
        });

        return;
      }

      res.send(newRegister.body);
    } catch (err) {
      console.log(err);
      return res.render("errorPage");
    }
  },
};
