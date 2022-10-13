import React, { useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { crearReserva } from "../../utils/Reservas";
import { useNavigate   } from "react-router-dom";

export default function CrearReserva() {
    let navigate = useNavigate();
  const [dataForm, setdDataForm] = useState({
    numero_reserva: "",
    destino: "",
    resumen: "",
    vassel: "",
    fecha_reserva: "",
    fecha_cierre: "",
    activo: true,
  });

  const [cargando, setCargando] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    setCargando(!cargando)
    crearReserva(dataForm)
      .then((res) => {
          setCargando(false)
        alert(`Reserva creada con exito, ${res.numero_reserva}`);
        navigate("/reservas")
        
      })
      .catch((err) => {
        console.log(err);
        setCargando(false)
        alert(`Error al Crear Reserva, ${err.message}`);
      });
  };

  const handleChanges = (e) => {
    const newData = { ...dataForm };
    newData[e.target.id] = e.target.value;
    setdDataForm(newData);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Reserva</Form.Label>
              <Form.Control
                id="numero_reserva"
                value={dataForm.numero_reserva}
                type="text"
                onChange={(e) => handleChanges(e)}
                required
              />

              <Form.Label>Destino</Form.Label>
              <Form.Control
                id="destino"
                value={dataForm.destino}
                type="text"
                onChange={(e) => handleChanges(e)}
                required
              />

              <Form.Label>Resumen</Form.Label>
              <Form.Control
                id="resumen"
                value={dataForm.resumen}
                type="text"
                onChange={(e) => handleChanges(e)}
                required
              />

              <Form.Label>Vassel</Form.Label>
              <Form.Control
                id="vassel"
                value={dataForm.vassel}
                type="text"
                onChange={(e) => handleChanges(e)}
                required
              />

              <Form.Label>Fecha de Reserva</Form.Label>
              <Form.Control
                id="fecha_reserva"
                value={dataForm.fecha_reserva}
                type="date"
                onChange={(e) => handleChanges(e)}
                required
              />

              <Form.Label>Fecha de Cierre</Form.Label>
              <Form.Control
                id="fecha_cierre"
                value={dataForm.fecha_cierre}
                type="date"
                onChange={(e) => handleChanges(e)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Crear
            </Button>
          </Form>
        </Col>
        <Col className="d-flex justify-content-center ">
          <p className={!cargando ? "visually-hidden" : ""}>Creando ...</p>
          <Spinner animation="border" variant="primary" className={!cargando ? "visually-hidden" : "ms-3"} />
        </Col>
      </Row>
    </Container>
  );
}
