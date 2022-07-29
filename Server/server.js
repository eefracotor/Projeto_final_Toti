const express = require("express");
const app = express();
const sqlite3 = require("sqlite3");
const { Sequelize, DataTypes, where } = require('sequelize');
const cors = require("cors");
const { useParams } = require("react-router-dom");


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

// lista de contatos 
app.all("/list", (req,res) => {
    let SQL = "SELECT * FROM contato";
    db.all(SQL, (err, result) => {
        if (err) console.log(err);
        else {
            const teste =JSON.stringify(result)
            console.log(teste);
            res.send(teste);
        }
    })
})

app.get('/contact/:id', (req,res) => {
    const {id} =req.params;
    let SQL = 'SELECT * FROM contato WHERE id = ?';
    db.get(SQL, [id], (err, result) => {
        if (err) console.log(err);
        else {
            const teste =JSON.stringify(result)
            console.log(teste);
            res.send(teste);
        }
    })
})


app.get('/searchcontact/:name', (req,res) => {
    const {name} =req.params;
    let SQL = 'SELECT * FROM contato WHERE name = ?';
    db.get(SQL, [name], (err, result) => {
        if (err) console.log(err);
        else {
            const teste =JSON.stringify(result)
            console.log(teste);
            res.send(teste);
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
        if(err) console.log(err);
        else console.log(result)
    })
    // console.log(name)
})

app.put('/edit/', (req,res) => {
    // const {id} =req.params;
    const {id} = req.body
    const {name} = req.body
    const {phone} = req.body
    const {email} = req.body
    const {adress} = req.body
    const {pic} = req.body
    const {id_cont_social} = req.body
    const {id_contact_group} = req.body
    const {id_work} = req.body
    
    let SQL ="UPDATE contato SET name = ?, phone = ?, email = ?, adress = ?, pic = ?, id_cont_social = ?, id_contact_group = ?, id_work = ? WHERE id = ?";
    // console.log(req)
    db.run(SQL,[name, phone, email, adress, pic, id_cont_social, id_contact_group, id_work, id],(err, result) => {
        if(err) console.log(err);
        else console.log(result)
    })
    console.log(id)
    console.log(req.body)
})


app.delete("/delete/:id", (req, res) => {
    const {id} = req.params;
    let SQL = "DELETE FROM contato WHERE id = ?";
    db.run(SQL, [id], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

app.listen(3001, () => {
    console.log("Inicializando servidor")
});