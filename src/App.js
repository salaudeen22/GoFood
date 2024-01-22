import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './screen/Home';
import Login from './screen/Login';
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import"../node_modules/bootstrap/dist/js/bootstrap.bundle"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './screen/Signup';
import Cart from './screen/Cart';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path='/cart' element={<Cart/>}/>
        <Route path="/createuser" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
