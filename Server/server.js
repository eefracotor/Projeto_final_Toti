const express = require("express");
const app = express();
const sqlite3 = require("sqlite3");



// app.use(express.json());
// app.use(express.urlencoded());


const db = new sqlite3.Database('./BD.db', (err) => {
    if (err) {
        console.log("Erro ao abrir base de dados " + err.message);
    } else {
        console.log("Conectado com o Banco de Dados")
    }
})

// const db = sqlite3.createPool({
//     host: "localhost",
//     database: "BD.db"
// });

app.get("/", (req, res) => {
    //res.send("Olá mundo desde o server!");
    let SQL ="INSERT INTO contato (name, phone, email, adress, pic, id_cont_social, id_contact_group, id_work) VALUES ('Vicmar','95176842369','seu@email.com','Jundiaí','extra','2','1','2' )";

    db.run(SQL,(err, result) => {
        console.log(err);
    })
});

app.listen(3001, () => {
    console.log("Inicializando servidor")
});