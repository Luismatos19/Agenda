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
      password TEXT,
      contact_id INT,
      FOREIGN KEY(contact_id) REFERENCES contact(id)
    );`);

    //criar table contatos
    await db.exec(` CREATE TABLE contact (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      last_name TEXT,
      category TEXT,
      email TEXT,
      phone_id INT,
      adress_id INT,
      FOREIGN KEY(phone_id) REFERENCES phone(id),
      FOREIGN KEY(adress_id) REFERENCES adress(id)
      
    );`);

    await db.exec(` CREATE TABLE phone (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      area_code TEXT,
      phone_number TEXT
    );`);

    await db.exec(` CREATE TABLE adress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cep TEXT,
      postal_code TEXT,
      district TEXT,
      number INTEGER,
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
        email

      ) VALUES (
        "Andre",
        "Matos",
        "luis@gmail.com"

   ); `);

    await db.close();
  },
};

initDb.init();
