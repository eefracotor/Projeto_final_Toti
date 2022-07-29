import "bootstrap/dist/css/bootstrap.min.css";
import App from '../App.css'; 
import Axios from "axios"
import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Button from "./buttoms";
import Contacto from "./contact";
import { FilterAltRounded } from '@mui/icons-material';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faSearch } from '@fortawesome/free-solid-svg-icons';
//import SearchIcon from '@mui/icons-material/Search';

//import SearchContact from "./Search";
//import SearchIcon from '@mui/icons-material/Search';

export default function Home() { 
    const [contato, setContact] = useState([]);
    const URL = "http://localhost:3001/list";
    console.log(URL)
    const [formContacts, setFormContacts] = useState([]); 
    const [pesquisar, setPesquisar] = useState("");

    const getContact = async()=>{
      await Axios.get(URL)
      .then(response=>{
        setContact(response.data);
        setFormContacts(response.data);
      }).catch(error=>{
        console.log(error);
      })  
    }
    
    
    const handleChange=e=>{
       setPesquisar(e.target.value);
       filtrar(e.target.value); 
    }


    const filtrar=(terminaPesquisa)=>{
      var resultadosBusca = formContacts.filter((elemento)=>{
        if(elemento.name.toString().toLowerCase().includes(terminaPesquisa.toLowerCase())
        || elemento.phone.toString().toLowerCase().includes(terminaPesquisa.toLowerCase())    
        ){
          return elemento;  
        }
      });  
      setContact(resultadosBusca);
    } 


    useEffect(()=>{
    getContact();    
    },[])

    
    let navigate = useNavigate()
    console.log(contato);
    useEffect(() => {
        Axios.get(URL)
        .then((response) => {
            console.log(response);
            const listOrd = response.data;
            listOrd.sort((a,b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0 ))
            setContact(listOrd);
        });
    }, []);
    
    
    return (
        <div className="home">
            
            <div className="containerInput">
                {/*<form onSubmit = {SearchContact}>*/}
                    {/*<h4>Pesquise o nome de um contato</h4>*/}
                    <input
                        className="form-control inputPesquisar"
                        type={"text"}
                        placeholder = "Pesquise um contato..."
                        //name = "name"
                        value={pesquisar}
                        onChange = {handleChange}
                    />
                    <Button Icon="search" />
                        {/*<FontAwesomeIcon icon={faSearch} />*/}
                                
                {/*</form>*/}
            </div>
            
            <h1> Lista de Contatos</h1>
            <Button icon="person_add" onClick={() => { navigate("/addcontact") }} />
            {/*<SearchIcon icon="search_icon" onClick={() => { navigate("/searchcontact")}} />*/} 

            {/* <Link to="/addcontact">
                <p>AddContact</p>
            </Link>
            <Link to="/contact/">
                <p>EditContact</p>
            </Link> */}
            <div className="lista--contact">
                {typeof contato !== "undefined" && contato.map((contact) => {
                    return (
                        <Link to={`/contact/${contact.id}`} >
                            <Contacto
                                key={contact.id}
                                name={contact.name}
                                phone={contact.phone}
                                email={contact.email}
                            ></Contacto>
                        </Link>
                    )
                })}
            </div>
                
        </div>
    
    )
}
