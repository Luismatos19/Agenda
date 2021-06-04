const Database = require("../db/config");
const Validator = require("validator");

class Register {
  constructor(body) {
    this.body = body;
    this.errors = []; //flag de erros
    this.user = null;
  }

  //metodo registro q vai ser chamado no controller
  async register() {
    this.valid();

    //verifica se contem algum erro
    if (this.errors.length > 0) return;

    try {
      this.user = await this.create(this.body);
    } catch (err) {
      console.log(err);
    }
  }

  //metodo para validar usuario
  valid() {
    this.clean();

    // usa biblioteca validator para varicar o email
    if (!Validator.isEmail(this.body.email))
      this.errors.push("Por favor digite um email válido");

    //valida senha
    if (this.body.password.length < 6 || this.body.password.length > 20) {
      this.errors.push("A senha precisa ter entre 6 e 20 caracteres.");
    }
  }

  // metodo //se tiver algo dieferente de string converte para string vazia
  clean() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }
    this.body = {
      email: this.body.email,
      password: this.body.password,
    };
  }

  async create(newUser) {
    const db = await Database();

    await db.run(` INSERT INTO user (
      name,
      email,
      password
    ) Values (
      "${newUser.name}",
      "${newUser.email}",
      "${newUser.password}"

    )`);
    await db.close();
  }
}

module.exports = Register;
