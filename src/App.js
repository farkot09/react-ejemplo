import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Asignaciones from "./pages/Asinaciones";
import Reservas from "./pages/Reservas";
import Inicio from "./pages/Inicio";
import NavbarComponent from "./components/NavbarComponent";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";


function App() {
  return (
    <Router>
      <Container>
        <Row>
          <NavbarComponent />
        </Row>
        <Container className="fondo ">
          <Routes>
            <Route exact path="/" element={<Inicio />} />
            <Route exact path="/asignaciones" element={<Asignaciones />} />
            <Route exact path="/reservas" element={<Reservas />} />
          </Routes>
        </Container>
      </Container>
    </Router>
  );
}

export default App;
