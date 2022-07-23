const express = require("express");
const app = express();
const sqlite3 = require("sqlite3");
const cors = require("cors");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded());


const db = new sqlite3.Database('./BD.db', (err) => {
    if (err) {
        console.log("Erro ao abrir base de dados " + err.message);
    } else {
        console.log("Conectado com o Banco de Dados")
    }
});

// const db = sqlite3.createPool({
//     host: "localhost",
//     database: "BD.db"
// });

// Consultanto a lista de contatos 
app.get("/list", (req,res) => {
    let SQL = "SELECT * FROM contato";
    db.get(SQL, (err, result) => {
        if (err) console.log(err);
        else {
            console.log(result);
            res.send(result);
        }
    })
})

app.post("/addcontact", (req,res) => {
    const {name} = req.body;
    const {phone} = req.body;
    const {email} = req.body;
    const {adress} = req.body;
    
    let SQL ="INSERT INTO contato (name, phone, email, adress, pic, id_cont_social, id_contact_group, id_work) VALUES ( ?,?,?,?,?,?,?,? )";

    db.run(SQL,[name,phone,email,adress],(err, result) => {
        console.log(err);
    })
    // console.log(name)
})

app.listen(3001, () => {
    console.log("Inicializando servidor")
});