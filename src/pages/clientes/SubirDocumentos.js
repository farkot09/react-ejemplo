import React, { useState } from "react";
import { Col, Container, Row, Spinner, Button, Form } from "react-bootstrap";
import TiempoRestante from "../../components/TiempoRestante";
import { obtenerAsignacionParaDocumentacion } from "../../utils/Clientes";
import FormularioCargaDeArchivos from "../../components/FormularioCargaDeArchivos";

function SubirDocumentos() {
  const [cargando, setCargando] = useState(false);
  const [fechaCierre, seFechaCierre] = useState(0);
  const [numeroReserva, senumeroReserva] = useState("Reserva");

  const [dataForm, setDataForm] = useState({
    id: "",
    nit: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    seFechaCierre(0);
    setCargando(true);
    obtenerAsignacionParaDocumentacion(dataForm)
      .then((data) => {
        seFechaCierre(data.id_reserva[0].fecha_cierre);
        senumeroReserva(data.id_reserva[0].numero_reserva);
        setCargando(false);
      })
      .catch((err) => {
        alert("Error en el Nit o el Codigo");
        setCargando(false);
      });
  };
  const handleChanges = (e) => {
    const newData = { ...dataForm };
    newData[e.target.id] = e.target.value;
    setDataForm(newData);
  };

  return (
    <Container className="">
      <Row>
        <Col>
          <Form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>Nit</Form.Label>
              <Form.Control
                type="text"
                id="nit"
                required
                onChange={(e) => handleChanges(e)}
                value={dataForm.nit}
                disabled={fechaCierre ? true : false}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Codigo de Asignacion</Form.Label>
              <Form.Control
                type="text"
                id="id"
                required
                onChange={(e) => handleChanges(e)}
                value={dataForm.id}
                disabled={fechaCierre ? true : false}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Buscar
            </Button>
          </Form>
        </Col>
        <Col>
          {cargando ? <Spinner animation="border" variant="primary" /> : ""}
          {fechaCierre ? (
            <TiempoRestante
              cierre={fechaCierre}
              numeroReserva={numeroReserva}
            />
          ) : (
            ""
          )}
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          {fechaCierre !== 0 ? (
            <FormularioCargaDeArchivos datax={dataForm} />
          ) : (
            ""
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default SubirDocumentos;
