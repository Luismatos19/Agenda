const mongoose = require("mongoose");
const Validator = require("validator");

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  last_name: { type: String, required: false, default: "" },
  email: { type: String, required: false, default: "" },
  category: { type: String, required: false, default: "" },
  phone: { type: Array, required: false, default: "" },
  adress: { type: Array, required: false, default: "" },
});

const contactModel = mongoose.model("Contato", contactSchema);

function Contact(body) {
  this.body = body;
  this.errors = [];
  this.contact = null;

  //registra o contato
  Contact.prototype.register = async function () {
    this.valid();

    if (this.errors.length > 0) return;

    this.contact = await contactModel.create(this.body);
  };
  //metodo para validar usuario
  Contact.prototype.valid = function () {
    this.clean();

    // usa biblioteca validator para varicar se ha um email  e validar ele
    if (this.body.email && !Validator.isEmail(this.body.email))
      this.errors.push("Por favor digite um email válido.");

    if (!this.body.name) this.errors.push("Nome é um campo obrigatório");

    //checa se o suario digitou pelo menos o telefone ou o email
    if (!this.body.email && !this.body.phone)
      this.errors.push(
        "Por favor digite pelo menos um contato (Telefone ou email)."
      );
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
      last: this.body.last_name,
      email: this.body.email,
      category: this.body.category,
      phone: this.body.phone,
      //adress: this.body.adress,
      adress: [
        {
          street: this.body.street,
          local: this.body.local,
          zipcode: this.body.zipcode,
          district: this.body.district,
          city: this.body.city,
          state: this.body.state,
        },
      ],
      password: this.body.password,
    };
  };

  Contact.prototype.edit = async function (id) {
    if (typeof id !== "string") return;

    this.valid();

    if (this.errors.length > 0) return;

    //busca pelo id e da um update
    this.contact = await contactModel.findByIdAndUpdate(id, this.body, {
      new: true,
    }); // new retorna novo dado atualizado
  };
}

//busca pelo id
Contact.findById = async function (id) {
  if (typeof id !== "string") return;
  const contact = await contactModel.findById(id);
  return contact;
};

//busca todos os contatos
Contact.findContacts = async function () {
  const contacts = await contactModel.find();
  return contacts;
};

//deleta contatos

Contact.delete = async function (id) {
  if (typeof id !== "string") return;

  const contact = await contactModel.findOneAndDelete({ _id: id });
  return contact;
};

module.exports = Contact;
