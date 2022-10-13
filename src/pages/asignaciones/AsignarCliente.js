import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { obtenerClientePorNit } from "../../utils/Clientes";
import { crearAsignacion } from "../../utils/Asignaciones";
import { animateScroll as scroll} from "react-scroll";

function AsignarCliente() {
  let { id, reserva } = useParams();
  const [nit, setNit] = useState("");
  const [estadoBoton, setEstadoBoton] = useState(false);
  const [dataCLiente, setdataCLiente] = useState("");
  const [cargando, setCargando] = useState(false);
  const [alerta, setAlerta] = useState({
    estado: false,
    mensaje: "",
    variante:""
  });
  const [dataForm, setDataForm] = useState({
    id_reserva: id,
    id_cliente: undefined,
    documentacion: [],
    roe: "",
    booking: "",
    modalidad: "",
    cantidad: undefined,
    tipo_empaque: "",
    peso: undefined,
    cubicaje: undefined,
    producto: "",
    destino_final: "",
    medidas: "",
    agencia_aduanas: "",
    fecha_creacion: new Date(),
    activo: true,
  });

  const traerCliente = (e) => {
    setNit(e.target.value);
  };

  const handleChanges = (e) => {
    const newData = { ...dataForm };
    newData[e.target.id] = e.target.value;
    setDataForm(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlerta({
        estado: false,
        mensaje: "",
        variante:""
      });
      setCargando(true)
    if (dataForm.id_cliente === undefined) {
      obtenerClientePorNit(nit)
        .then((data) => {
          const newData = { ...dataForm };
          newData["id_cliente"] = data[0].id;
          setDataForm(newData);
          setdataCLiente(data[0]);
          setEstadoBoton(!estadoBoton);
          setCargando(false)
        })
        .catch((err) => {
            setCargando(false)
          setAlerta({
            estado: true,
            mensaje: "no se encontro el cliente",    
            variante:"danger"        
          });
          setdataCLiente({});
          setCargando(false)
        });
    } else {
        scroll.scrollToTop()
      crearAsignacion(dataForm)
        .then((res) => {
            setAlerta({
                estado: true,
                mensaje: `Cliente ${dataCLiente.razon_social} asignado correctamente`,    
                variante:"success"        
              });
              setCargando(false)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Codigo de Reserva</Form.Label>
              <Form.Control
                id="id_reserva"
                type="text"
                placeholder={reserva}
                disabled
                value={id}
              />
              <Form.Text className="text-muted">{reserva}</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nit del Cliente</Form.Label>
              <Form.Control
                disabled={estadoBoton}
                id="nit"
                type="text"
                placeholder="Nit"
                value={nit}
                onChange={(e) => traerCliente(e)}
              />

              <Button
                disabled={!estadoBoton}
                variant="info"
                className="me-3 btn-sm"
                onClick={() => {
                  const newStatus = { ...dataForm };
                  newStatus["id_cliente"] = undefined;
                  setDataForm(newStatus);
                  setEstadoBoton(!estadoBoton);
                }}
              >
                Cambiar
              </Button>

              <Form.Text className="text-muted">
                {dataCLiente.razon_social} - {dataCLiente.nombre_contacto} -{" "}
                {dataCLiente.correo}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Agencia de aduanas</Form.Label>
              <Form.Control
                required={estadoBoton}
                id="agencia_aduanas"
                type="text"
                value={dataForm.agencia_aduanas}
                onChange={(e) => handleChanges(e)}
              />
              <Form.Label>ROE</Form.Label>
              <Form.Control
                required={estadoBoton}
                id="roe"
                type="text"
                value={dataForm.roe}
                onChange={(e) => handleChanges(e)}
              />

              <Form.Label>booking</Form.Label>
              <Form.Control
                required={estadoBoton}
                id="booking"
                type="text"
                value={dataForm.booking}
                onChange={(e) => handleChanges(e)}
              />
              <Form.Label>-</Form.Label>
              <Form.Select id="modalidad" onChange={(e) => handleChanges(e)}>
                <option value="ORIGEN">ORIGEN</option>
                <option value="ROE EXT">ROE EXT</option>
                <option value="ROE TRANSBORDO">ROE TRANSBORDO</option>
              </Form.Select>
              <Form.Label>cantidad (numero de unidades)</Form.Label>
              <Form.Control
                required={estadoBoton}
                id="cantidad"
                type="number"
                value={dataForm.cantidad}
                onChange={(e) => handleChanges(e)}
              />

              <Form.Label>Tipo de empaque</Form.Label>
              <Form.Control
                required={estadoBoton}
                id="tipo_empaque"
                type="text"
                value={dataForm.tipo_empaque}
                onChange={(e) => handleChanges(e)}
              />

              <Form.Label>peso (en kilogramos)</Form.Label>
              <Form.Control
                required={estadoBoton}
                id="peso"
                type="text"
                value={dataForm.peso}
                onChange={(e) => handleChanges(e)}
              />

              <Form.Label>cubicaje (en M3)</Form.Label>
              <Form.Control
                required={estadoBoton}
                id="cubicaje"
                type="text"
                value={dataForm.cubicaje}
                onChange={(e) => handleChanges(e)}
              />

              <Form.Label>producto</Form.Label>
              <Form.Control
                required={estadoBoton}
                id="producto"
                type="text"
                value={dataForm.producto}
                onChange={(e) => handleChanges(e)}
              />

              <Form.Label>destino final</Form.Label>
              <Form.Control
                required={estadoBoton}
                id="destino_final"
                type="text"
                value={dataForm.destino_final}
                onChange={(e) => handleChanges(e)}
              />

              <Form.Label>medidas</Form.Label>
              <Form.Control
                required={estadoBoton}
                id="medidas"
                type="text"
                value={dataForm.medidas}
                onChange={(e) => handleChanges(e)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Asignar
            </Button>
          </Form>
        </Col>
        <Col className="">
          <p className={!cargando ? "visually-hidden" : ""}>Cargando ...</p>
          <Spinner
            animation="border"
            variant="primary"
            className={!cargando ? "visually-hidden" : "ms-3"}
          />
          {alerta.estado ? <Alert variant={alerta.variante}> {alerta.mensaje}!</Alert> : ""}
        </Col>
      </Row>
    </Container>
  );
}

export default AsignarCliente;
