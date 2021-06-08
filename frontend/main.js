import Login from "./validation/Login";
import Contact from "./validation/Contact";
import Register from "./validation/Register";

//Chama os metodos de validação de campos

//Página de Login de User
const login = new Login("#form-login");
login.init();
//Página de Cadastro de User
const register = new Register("#form-register");
register.init();
//Página de Cadastro de Contatos
const contact = new Contact("#form-contact");
contact.init();
