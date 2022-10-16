import { useEffect, useState } from "react";
import { Row, Container, Navbar, Col,Dropdown  } from "react-bootstrap";
import {useLocation,Link } from "react-router-dom";



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
        <div className="menu colorFondo">
        <Dropdown>
      <Dropdown.Toggle variant="primary"  id="dropdown-basic">
        Menu
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item ><Link to="/reservas"> Reservas </Link></Dropdown.Item>
        <Dropdown.Item><Link to="/crearcliente"> Crear Cliente </Link></Dropdown.Item>        
        <Dropdown.Item><Link to="/subirdocumentos"> Subir Documentos </Link></Dropdown.Item>        
      </Dropdown.Menu>
    </Dropdown>

        </div>
      </Row>      
    </Container>
  );
}

export default NavbarComponent;
