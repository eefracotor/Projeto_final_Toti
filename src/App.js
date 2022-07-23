import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import './App.css';
import Search from './components/Search';
import AddContact from './components/AddContact';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path ="/" element = {<Home />} />
          <Route path ="/search" element = {<Search />} />
          <Route path='/addcontact' element ={<AddContact />} />
          <Route />
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
