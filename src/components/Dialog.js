import React, {useState} from 'react';
import {useNavigate} from "react-router-dom"
import Axios from "axios";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog(props) {
   let navigate = useNavigate()
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

  

  const handleClose = () => {
    props.setOpen(false);
  };

  const hanleChangeValues = (value) => {
     setEditValue((prevValue) => ({
        ...prevValue,
        [value.target.id]: value.target.value,
     }));
   };

  const handleSaveChange = () => {
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
      props.setContato(
         props.contato.map((value) => {
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
            onChange={hanleChangeValues}
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
            onChange={hanleChangeValues}
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
            onChange={hanleChangeValues}
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
            onChange={hanleChangeValues}
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
            onChange={hanleChangeValues}
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
            onChange={hanleChangeValues}
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="id_cont_social"
            defaultValue={props.id_cont_social}
            onChange={hanleChangeValues}
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
            onChange={hanleChangeValues}
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
            onChange={hanleChangeValues}
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
            handleEditGame()
          }}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
