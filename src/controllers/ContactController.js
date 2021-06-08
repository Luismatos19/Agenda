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
    if (!req.params.id) return res.render("errorPage"); // manda para home se nao houver id na req

    const contact = await Contact.findById(req.params.id);

    if (!contact) return res.render("errorPage");

    res.render("contact", { contact });
  },

  async modal(req, res) {
    if (!req.params.id) return res.render("errorPage"); // manda para home se nao houver id na req

    const contact = await Contact.findById(req.params.id);

    if (!contact) return res.render("errorPage");

    res.render("modal", { contact });
  },

  async edit(req, res) {
    if (!req.params.id) return res.render("errorPage");
    try {
      const contact = new Contact(req.body);
      await contact.edit(req.params.id);

      if (contact.errors.length > 0) {
        req.flash("errors", contact.errors);
        req.session.save(() => res.redirect("back"));

        return;
      }
      req.flash("success", "Contato editado com sucesso");
      req.session.save(() =>
        res.redirect(`/contact/index/${contact.contact._id}`)
      ); //manda para home no caso de sucesso
      return;
    } catch (err) {
      console.log(err);
      return res.redirect("errorPage");
    }
  },

  async delete(req, res) {
    if (!req.params.id) return res.render("errorPage");

    const contact = await Contact.delete(req.params.id);
    if (!contact) return res.render("errorPage");

    req.flash("success", "Contato excluido com sucesso");
    req.session.save(() => res.redirect("back")); //manda para home no caso de sucesso
    return;
  },

  async find(req, res) {
    const contacts = await Contact.findName(req.params.name);

    return res.render("index", { contacts });
  },
};
