import validator from "validator";

export default class Login {
  constructor(formClass) {
    this.form = document.querySelector(formClass);
    this.errors = [];
  }

  init() {
    this.events();
  }

  events() {
    if (!this.form) return;
    //Monitora se um submit está sendo enviado, previne o resultado padrão, e chama a validação
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.validate(e);
    });
  }

  validate(event) {
    const el = event.target;
    const emailInput = el.querySelector('input[name="email"]');
    const passwordInput = el.querySelector('input[name="password"]');

    let error = false;

    //valida campo email
    if (!validator.isEmail(emailInput.value)) {
      this.alertError(emailInput, "Email Inválido!");
      error = true;
    }
    //valida campo senha
    if (passwordInput.value.length < 3 || passwordInput.value.length > 20) {
      this.alertError(
        passwordInput,
        "Senha deve conter entre 3 e 20 caracteres."
      );
      error = true;
    }

    if (!error) el.submit(); //se nao houver erros o formulario é enviado
  }

  //função cria campo embaixo do input com a menssagem setada
  alertError(field, msg) {
    const divErro = document.createElement("div");
    divErro.innerHTML = msg;
    divErro.classList.add("alert-danger");
    field.insertAdjacentElement("afterEnd", divErro); //cria messagem embaixo do input
  }
}
