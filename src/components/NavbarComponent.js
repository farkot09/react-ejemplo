import { useEffect, useState } from "react";
import { Row, Container, Navbar, Col } from "react-bootstrap";
import {useLocation } from "react-router-dom";


function NavbarComponent() {
  const location = useLocation();
  const [tituloConvertido, settituloConvertido] = useState(location.pathname)
  const convertirTitulo = (titulo) =>{
    const newTitulo = titulo.slice(1)
    settituloConvertido(newTitulo.toUpperCase())
  }
  useEffect(() => {
    convertirTitulo(tituloConvertido)
  }, [])
  
  return (
    <Container fluid>
      <Row>
        <Navbar>
          <Container>
            <Navbar.Brand href="#home">MSL Corporate</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>NEXUS</Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Row>
      <Row>
        <Col></Col>
        <Col>
          {" "}
          <div className="d-flex justify-content-end">
            <small>
              Esta registrado como: viktorgrajales | Notificaciones(3) | Salir
            </small>
          </div>
        </Col>
      </Row>
      <Row >
        <div className="menu colorFondo"><p>{tituloConvertido || "INICIO"}</p></div>
      </Row>
    </Container>
  );
}

export default NavbarComponent;
