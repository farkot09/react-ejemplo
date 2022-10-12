import { Row, Container, Navbar, Col } from "react-bootstrap";

function NavbarComponent() {
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
              Esta registrado como: germanrojas | Notificaciones(3) | Salir
            </small>
          </div>
        </Col>
      </Row>
      <Row >
        <div className="menu colorFondo"><p>Reservas</p></div>
      </Row>
    </Container>
  );
}

export default NavbarComponent;
