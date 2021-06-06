const Contact = require("../models/ContactModel");

module.exports = {
  async index(req, res) {
    const contacts = await Contact.findContacts();

    return res.render("index", { contacts });
  },
  async find(req, res) {
    const contacts = await Contact.findContacts();

    console.log(req.params.id);

    return contacts[req.params.id];
  },
};
