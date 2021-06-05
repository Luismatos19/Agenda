const Contact = require("../models/ContactModel");

module.exports = {
  index(req, res) {
    return res.render("contact");
  },

  async register(req, res) {
    try {
      const contact = new Contact(req.body);
      await contact.register();

      if (contact.errors.length > 0) {
        req.flash("errors", contact.errors);
        req.session.save(() => res.redirect("back"));
        return;
      }
      req.flash("success", "Contato registrado com sucesso");
      req.session.save(() => res.render("index")); //manda para home no caso de sucesso
      return;
    } catch (err) {
      console.log(err);
      return res.render("index");
    }
  },

  edit(req, res) {
    if (!res.params.id) return res.render("index"); // manda para home se nao houver id na req
    res.render("contact");
  },
};
