const Database = require("../db/config");
const Validator = require("validator");

function Contact(body) {
  this.body = body;
  this.errors = [];
  this.contact = null;

  Contact.prototype.register = function () {
    this.valid();

    //metodo para validar usuario
    Contact.prototype.valid = function () {
      this.clean();

      // usa biblioteca validator para varicar o email
      if (!Validator.isEmail(this.body.email))
        this.errors.push("Por favor digite um email válido.");
    };

    // metodo se tiver algo dieferente de string converte para string vazia
    Contact.prototype.clean = function () {
      for (const key in this.body) {
        if (typeof this.body[key] !== "string") {
          this.body[key] = "";
        }
      }
      this.body = {
        name: this.body.name,
        sobrename: this.body.name,
        email: this.body.email,
        password: this.body.password,
      };
    };
  };
}

module.exports = Contact;
