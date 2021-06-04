const Register = require("../models/RegisterModel");

module.exports = {
  index(req, res) {
    return res.render("login");
  },

  async register(req, res) {
    const register = new Register(req.body);

    await register.register();

    // checar se ha erros se houver manda o usuario de volta para pagina de register
    if (register.errors.length > 0) {
      req.flash("errors", register.errors);
      req.session.save(() => {
        res.redirect("back");
      });

      return;
    }

    res.send(register.body);
  },
};
