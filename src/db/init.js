const Database = require("./config");

//inicia db com base nas consif
const initDb = {
  async init() {
    const db = await Database();

    //CRIAR TABLES USER
    await db.exec(` CREATE TABLE user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      password TEXT
    );`);

    //criar table contatos
    await db.exec(` CREATE TABLE contact (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      last_name TEXT,
      phone TEXT,
      email TEXT,
      cep TEXT,
      logradouto TEXT,
      bairro TEXT,
      nummero INTEGER,
      city TEXT,
      state_uf TEXT
      
    );`);

    await db.run(`
      INSERT INTO user (
        name,
        email,
        password

      ) VALUES (
        "Luis",
        "luis123@gmail.com",
        "12345678"

    );`);

    await db.run(`
      INSERT INTO contact (
        name,
        last_name,
        phone

      ) VALUES (
        "Andre",
        "Matos",
        "123456789"

   ); `);

    await db.close();
  },
};

initDb.init();
