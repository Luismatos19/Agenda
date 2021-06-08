import validator from "validator";

export default class Contact {
  constructor(formClass) {
    this.form = document.querySelector(formClass);
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
    //Campos do Form
    const nameInput = el.querySelector('input[name="name"]');
    const phoneInput = el.querySelector('input[name="phone"]');
    const emailInput = el.querySelector('input[name="email"]');

    let error = false;

    //valida campo nome
    if (nameInput.value.length < 2) {
      this.alertError(nameInput, "Insira um nome.");
      error = true;
    }

    //valida campo telefone
    if (phoneInput.value.length === 0 && emailInput.value.length === 0) {
      this.alertError(phoneInput, "Informe um telefone ou email válido.");
      this.alertError(emailInput, "Informe um telefone ou email válido.");
      error = true;
    }

    //valida campo email
    if (emailInput.value.length > 0) {
      if (!validator.isEmail(emailInput.value)) {
        this.alertError(emailInput, "Email Inválido!");
        error = true;
      }
    }

    if (!error) el.submit(); //se nao houver erros o formulario é enviado
  }

  alertError(campo, msg) {
    const divError = document.createElement("div");
    divError.innerHTML = msg;
    divError.classList.add("alert-danger");
    campo.insertAdjacentElement("afterEnd", divError);
  }
}
