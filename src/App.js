import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Listado from "./components/Listado"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Detalle from "./components/Detalle"
import Resultados from "./components/Resultados"

import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

function App() {
  

  
  return (
    
      <Router>
        <div className="container mt-3">
        <Header/>
        
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="listado" element={<Listado />} />
          <Route path="detalle" element={<Detalle />} />
          <Route path="contacto" element={<Listado />} />
          <Route path="resultados" element={<Resultados />} />

        </Routes>
        <Footer />
        </div>
      </Router>
    
      
  );
}

export default App;
