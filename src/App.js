import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import './App.css';
import Search from './components/Search';
import AddContact from './components/AddContact';
import EditContact from "./components/EditContact";
import AddGroup from "./components/AddGroup";
import EditGroup from "./components/EditGroup";
import ContactGroup from "./components/ContactGroup";
import AddContactGroup from "./components/AddContactGroup";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path ="/" element = {<Home />} />
          <Route path ="/search" element = {<Search />} />
          <Route path ='/addcontact' element = {<AddContact />} />
          <Route path ='/contact/:id' element = {<EditContact />} />
          <Route path ="/addgroup" element = {<AddGroup />} />
          <Route path ="/editgroup" element = {<EditGroup />} />
          <Route path ="/contactgroup" element = {<ContactGroup />} />
          <Route path ="/addcontactgroup" element = {<AddContactGroup />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
