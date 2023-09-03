import './App.css';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom'
import Navbar from './component/Navbar';
import Home from './component/Home';
import About from './component/About';
import Notestate from './context/Notestate';
import Login from './component/Login';
import Register from './component/Register';

function App() {
  return (
      <>
      <Notestate>
      <Router>
      <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/About" element={<About />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/Register" element={<Register />} />
      </Routes>
      </Router>
      </Notestate>
       
      </>
  );
}

export default App;
