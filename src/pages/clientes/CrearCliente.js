import React, {  useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Spinner,
  Alert,
} from "react-bootstrap";
import { crearCliente } from "../../utils/Clientes";

function CrearCliente() {
    const [cargando, setCargando] = useState(false);
    const [dataForm, setDataForm] = useState({
        nit: "",
        razon_social: "",
        correo: "",
        telefono: 0,
        nombre_contacto: "",        
        activo: true,
      });
      const [alerta, setAlerta] = useState({
        estado: false,
        mensaje: "",
        variante:""
      });

      const handleChanges = (e) => {
        const newData = { ...dataForm };
        newData[e.target.id] = e.target.value;
        setDataForm(newData);
      };

      const handleSubmit = (e) => {
        setCargando(true)
        e.preventDefault();
        
        crearCliente(dataForm).then(data => {
            console.log(data);
            setAlerta({
                estado: true,
                mensaje: "Cliente creado con exito",    
                variante:"success"        
              });
            setCargando(false)
        }).catch(err => {
            console.log(err);
            setCargando(false)
            setAlerta({
                estado: true,
                mensaje: "no se pudo crear el cliente",    
                variante:"danger"        
              });
        })
    
    }

    
  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nit</Form.Label>
              <Form.Control type="text" id="nit" required onChange={(e) => handleChanges(e)} value={dataForm.nit} />
              <Form.Label>Razon Social</Form.Label>
              <Form.Control type="text" id="razon_social" required onChange={(e) => handleChanges(e)} value={dataForm.razon_social} />
              <Form.Label>Correo</Form.Label>
              <Form.Control type="email" id="correo" required onChange={(e) => handleChanges(e)} value={dataForm.correo} />
              <Form.Label>Telefono</Form.Label>
              <Form.Control type="number" id="telefono" required onChange={(e) => handleChanges(e)} value={dataForm.telefono} />
              <Form.Label>Nombre de Contacto</Form.Label>
              <Form.Control type="text" id="nombre_contacto" required onChange={(e) => handleChanges(e)} value={dataForm.nombre_contacto} />
            </Form.Group>

            <Button variant="primary" type="submit">
              Crear
            </Button>
          </Form>
        </Col>
        <Col>{alerta.estado ? <Alert variant={alerta.variante}> {alerta.mensaje}!</Alert> : ""}</Col>
      </Row>
    </Container>
  );
}

export default CrearCliente;
