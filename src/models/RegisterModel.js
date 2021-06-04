const Database = require("../db/config");
const Validator = require("validator");
const bcryptjs = require("bcryptjs");

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

    await this.userExist();

    if (this.errors.length > 0) return;

    try {
      // criptografa a senha usando bcryptjs (hash)
      const salt = bcryptjs.genSaltSync();
      this.body.password = bcryptjs.hashSync(this.body.password);

      this.user = await this.create(this.body);
    } catch (err) {
      console.log(err);
    }
  }

  //metodo para validar usuario
  valid() {
    this.clean();

    if (this.body.name.length < 4 || this.body.name.length > 30) {
      this.errors.push("O campo nome precisa ter entre 4  e 30 caracteres.");
    }

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
      name: this.body.name,
      email: this.body.email,
      password: this.body.password,
    };
  }

  //metodo checa se  o email do  usuario ja existe no banco de dados
  async userExist() {
    const db = await Database();
    const user = await db.get(`
      SELECT email FROM user WHERE email = "${this.body.email}"
    `);

    if (user) this.errors.push("Email ultilizado ja existe.");

    await db.close();
  }

  //metodo criar usuario no banco de dados
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
