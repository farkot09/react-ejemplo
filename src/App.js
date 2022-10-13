import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Asignaciones from "./pages/asignaciones/Asinaciones";
import Reservas from "./pages/reservas/Reservas";
import CrearReserva from "./pages/reservas/CrearReserva";
import Inicio from "./pages/Inicio";
import NavbarComponent from "./components/NavbarComponent";
import Container from "react-bootstrap/Container";
import AsignarCliente from "./pages/asignaciones/AsignarCliente";

function App() {
  return (
    <Router>
      <Container className="">
        <NavbarComponent />

        <Container className="fondo border py-4 px-4 shadow-lg p-3 mb-5 bg-white rounded">
          <Routes>
            <Route exact path="/" element={<Inicio />} />
            <Route exact path="/asignaciones" element={<Asignaciones />} />
            <Route exact path="/asignarcliente/:id/:reserva" element={<AsignarCliente />} />
            <Route exact path="/reservas" element={<Reservas />} />
            <Route exact path="/crearreserva" element={<CrearReserva />} />
          </Routes>
        </Container>
      </Container>
    </Router>
  );
}

export default App;
