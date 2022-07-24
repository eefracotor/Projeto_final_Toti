import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import './App.css';
import Search from './components/Search';
import AddContact from './components/AddContact';
import EditContact from "./components/EditContact";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path ="/" element = {<Home />} />
          <Route path ="/search" element = {<Search />} />
          <Route path='/addcontact' element ={<AddContact />} />
          <Route path='/contact/:id' element={<EditContact />} />
          <Route />
          <Route />
          <Route />
          <Route />
        </Routes>
      </Router>
    </>
  );
}

export default App;
