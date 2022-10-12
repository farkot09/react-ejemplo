import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Asignaciones from "./pages/Asinaciones";
import Reservas from "./pages/Reservas";
import Inicio from "./pages/Inicio";
import NavbarComponent from "./components/NavbarComponent";
import Container from "react-bootstrap/Container";

function App() {
  return (
    <Router>
      <Container className="">
        <NavbarComponent />

        <Container className="fondo border py-4 px-4 shadow-lg p-3 mb-5 bg-white rounded">
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
