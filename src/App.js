
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NavBar from "./components/Navbar"
import Home from "./components/Home"
import About from "./components/About"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Alert from './components/Alert';
import NoteState from './context/notes/NoteState';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (message,tag) =>{
    setAlert({
      msg : message,
      tag : tag
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }
  return (
     <>
     <NoteState>
        <Router>
          <NavBar />
          <Alert alert={alert}/>
          <Routes>
            <Route  exact path="/" element={<Home showAlert={showAlert}/>} />
            <Route exact path="/about" element={<About/>} />
            <Route  exact path="/login" element={<Login showAlert={showAlert} />} />
            <Route   exact path="/signup" element={<Signup showAlert={showAlert}/>} />
          </Routes>
        </Router>
        </NoteState>
      </>
  )}

export default App;
