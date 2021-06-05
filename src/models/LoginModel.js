const mongoose = require("mongoose");
const Validator = require("validator");
const bcryptjs = require("bcryptjs");

//login schema
const loginSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const loginModel = mongoose.model("Login", loginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = []; //flag de erros
    this.user = null;
  }

  //metodo para atutenticar
  async auth() {
    this.valid();
    if (this.errors.length > 0) return;

    //checa se o email  consta no db
    this.user = await loginModel.findOne({ email: this.body.email });

    if (!this.user) {
      this.errors.push("Usuário inválido.");
      return;
    }

    //compara a senha digitada com a senha criptografada no banco de dados
    if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
      this.errors.push("Senha inválida.");
      this.user = null;
      return;
    }
    return;
  }

  //metodo registro q vai ser chamado no controller
  async register() {
    this.valid();

    //verifica se contem algum erro
    if (this.errors.length > 0) return;

    await this.userExist();

    if (this.errors.length > 0) return;

    // criptografa a senha usando bcryptjs (hash)
    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);

    this.user = await loginModel.create(this.body);
  }

  //metodo para validar usuario
  valid() {
    this.clean();

    // usa biblioteca validator para varicar o email
    if (!Validator.isEmail(this.body.email))
      this.errors.push("Por favor digite um email válido.");

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
    const userExist = await loginModel.findOne({ email: this.body.email });
    if (userExist) this.errors.push("Este email ja esta cadastrado.");
  }
}

module.exports = Login;
