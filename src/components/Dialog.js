import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom"
import Axios from "axios";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog(props) {
   let navigate = useNavigate();
   const [fomr, setForm] = useState([]);
   const [db, setDb] = useState(null);
   let URL = `http://localhost:3000/contatos/${props.id}` 

   // const [contact, setContac] = useState([]);
   //  useEffect(() => {
   //      const getData = async () => {
   //      const response = await Axios.get(URL);
   //      const contacto = response.data
   //      console.log("data: "+ {contacto})
   //      setContac(contacto);
   //      };
   //      getData();
   //  }, [props.id]);
//   console.log("db: "+ {contacto);

   const handleClose = () => {
      props.setOpen(false);
   };


   const [editValue, setEditValue]=useState({
      id:props.id,
      name:props.name,
      phone:props.phone,
      email:props.email,
      adress:props.adress,
      pic:props.pic,
      id_cont_social:props.id_cont_social,
      id_contact_group:props.id_contact_group,
      id_work:props.id_work
   });

  const handleChangeValues = (value) => {
     setEditValue((prevValue) => ({
        ...prevValue,
        [value.target.name]: value.target.value,
     }));
   };

  const handleSaveChange = () => {
   Axios.put(`http://localhost:3001/edit`, {
      id:props.id,
      name: editValue.name,
      phone: editValue.phone,
      email: editValue.email,
      adress: editValue.adress,
      pic: editValue.pic,
      id_cont_social: editValue.id_cont_social,
      id_contact_group: editValue.id_contact_group,
      id_work: editValue.id_work,
   }).then(() => {
      props.setContato(
         props.contato.map((value) => {
           return value.id == props.id
             ? {
                 id: editValue.id,
                 name: editValue.name,
                 phone: editValue.phone,
                 email: editValue.email,
                 adress: editValue.adress,
                 pic: editValue.pic,
                 id_cont_social: editValue.id_cont_social,
                 id_contact_group: editValue.id_contact_group,
                 id_work: editValue.id_work
               }
             : value
         })
       );
     });
   // });
   handleClose();
};

const handleEditGame = () => {
   Axios.put("http://localhost:3001/edit", {
      id:editValue.id,
      name: editValue.name,
      phone: editValue.phone,
      email: editValue.email,
      adress: editValue.adress,
      pic: editValue.pic,
      id_cont_social: editValue.id_cont_social,
      id_contact_group: editValue.id_contact_group,
      id_work: editValue.id_work,
   }).then(() => {
     props.setListCard(
       props.listCard.map((value) => {
         return value.id == editValue.id
           ? {
            id: editValue.id,
            name: editValue.name,
            phone: editValue.phone,
            email: editValue.email,
            adress: editValue.adress,
            pic: editValue.pic,
            id_cont_social: editValue.id_cont_social,
            id_contact_group: editValue.id_contact_group,
            id_work: editValue.id_work
             }
           : value;
       })
     );
   });
   handleClose();
 };

const handleDelete = () => {
   Axios.delete(`http://localhost:3001/delete/${editValue.id}`)
   handleClose();
}
  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>Editar</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="id"
            label="ID"
            defaultValue={props.id}
            onChange={handleChangeValues}
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nome"
            defaultValue={props.name}
            onChange={handleChangeValues}
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            label="Telefone"
            defaultValue={props.phone}
            onChange={handleChangeValues}
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            defaultValue={props.email}
            onChange={handleChangeValues}
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="adress"
            label="Endereço"
            defaultValue={props.adress}
            onChange={handleChangeValues}
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="pic"
            label="Imagem"
            defaultValue={props.pic}
            onChange={handleChangeValues}
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="id_cont_social"
            defaultValue={props.id_cont_social}
            onChange={handleChangeValues}
            label="Redes"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="id_contact_group"
            label="Grupo"
            defaultValue={props.id_contact_group}
            onChange={handleChangeValues}
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="id_work"
            label="Trabalho"
            defaultValue={props.id_work}
            onChange={handleChangeValues}
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={()=>{
            handleDelete()
          }}>Excluir</Button>
          <Button onClick={() => {
            handleSaveChange()
          }}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
