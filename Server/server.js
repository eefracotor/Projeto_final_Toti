const express = require("express");
const app = express();
const sqlite3 = require("sqlite3");
const cors = require("cors");
const multer = require('multer');
const path = require("path");
const bodyParser = require('body-parser');
// const { diskStorage } = require("multer");
// const upload = multer({ dest: 'uploads/'});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static("Images"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static(path.join(__dirname,'app/Images')));

// Configuração de armazenamento
const diskStorage = multer.diskStorage({
    // destination:  (req, file, cb) => {
    //     cb(null, path.join(__dirname,'../Images'))
    // },
    destination: path.join(__dirname,'Images'),
    filename:  (req, file, cb) => {
        cb(null, file.filename + '-' + Date.now() + path.extname(file.originalname))
        // cb(null, file.filename + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ 
    storage : diskStorage 
});

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

//seleccionar un contacto
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

//Crear un contacto
app.post("/addcontact", upload.single('image'), (req,res) => {
    console.log("File: "+ req.file)
    const file = req.file.filename
    console.log(file)
    // const {name} = req.body;
    // const {phone} = req.body;
    // const {email} = req.body;
    // const {adress} = req.body;
    // const {pic} = req.file;
    
    // res.send("pronto");
    // res.json({name,site})
    // res.json({name, phone, email, adress, pic})
    // let SQL ="INSERT INTO contato (name, phone, email, adress, pic, id_cont_social, id_contact_group, id_work) VALUES ( ?,?,?,?,?,?,?,? )";

    // db.run(SQL,[name,phone,email,adress,pic],(err, result) => {
    //     if(err) console.log(err);
    //     else console.log(result)
    // })
    // console.log(name)
})

// app.post("/addcontact", upload.single('foto'), (req,res) => {
//     const {name} = req.body;
//     const {phone} = req.body;
//     const {email} = req.body;
//     const {adress} = req.body;
    
//     let SQL ="INSERT INTO contato (name, phone, email, adress, pic, id_cont_social, id_contact_group, id_work) VALUES ( ?,?,?,?,?,?,?,? )";

//     db.run(SQL,[name,phone,email,adress],(err, result) => {
//         if(err) console.log(err);
//         else console.log(result)
//     })
//     // console.log(name)
// })


//Actualizar un contacto
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

//Elominar un contacto
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