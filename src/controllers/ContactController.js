const Contact = require("../models/ContactModel");

module.exports = {
  index(req, res) {
    return res.render("contact", { contact: {} });
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
      req.session.save(() => res.redirect("/")); //manda para home no caso de sucesso
      return;
    } catch (err) {
      console.log(err);
      return res.redirect("back");
    }
  },

  // busca pelo contato para mostrar as informaçoes
  async editIndex(req, res) {
    if (!res.params.id) return res.render("index"); // manda para home se nao houver id na req

    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.render("errorPage");

    res.render("contact", { contact });
  },

  async edit(req, res) {
    try {
      if (!req.params.id) return res.render("errorPage");
      const contact = new Contact(req.body);
      await contact.edit(req.params.id);

      if (contact.errors.length > 0) {
        req.flash("errors", contact.errors);
        req.session.save(() => res.redirect("back"));
        return;
      }
      req.flash("success", "Contato editado com sucesso");
      req.session.save(() => res.render("index")); //manda para home no caso de sucesso
      return;
    } catch (err) {
      console.log(err);
      return res.redirect("back");
    }
  },
};
