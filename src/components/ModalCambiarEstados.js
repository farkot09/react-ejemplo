import React, { useState } from "react";
import { Modal, Button, Form, Spinner, Alert } from "react-bootstrap";
import { cambiarEstadoAsignacion, eliminarDocumento } from "../utils/Asignaciones";




function ModalCambiarEstados({ data, handleCambios, accion }) {
  const [dataChange, setDataChange] = useState(data);
  const [dataAlert, setDataAlert] = useState({
    message: "",
    variant: "",
  });
  const [dataAlertEliminar, setDataAlertEliminar] = useState({
    message: "¿Esta Seguro que desea eliminar?",
    variant: "warning",
  });
  const [cargandoS, setCargandoS] = useState(false);
  
  const handlesubmit = (e) => {
    e.preventDefault();
    setCargandoS(true);
    if(accion === "cambiar"){
      cambiarEstadoAsignacion(dataChange.id, dataChange)
      .then((res) => {
        setCargandoS(false);
        setDataAlert({
          message: "Cambios Realizados",
          variant: "success",
        });
      })
      .catch((err) => {
        setDataAlert({
          variant: "danger",
          message: `Error al cambiar estado, ${err.message}`,
        });
        setCargandoS(false);
      });
    }else{
      if (dataChange.estado === "1") {
        setCargandoS(false);
        return setDataAlertEliminar({
          variant:"danger",
          message:"No se puede eliminar porque el estado del Documento es Aceptado"
        }) 
               
      }
      
      eliminarDocumento(dataChange.id,dataChange.tipo_documento).then(res=>{
        setDataAlertEliminar({
          message: "Documento Eliminado",
          variant: "success",
        })
        setCargandoS(false);
      }).catch(err => {
        setDataAlertEliminar({
          message: "Error al Eliminar documento",
          variant: "danger",
        })
        setCargandoS(false);
      })


    }
    
  };

  const handleChanges = (e) => {
    const newData = { ...dataChange };
    newData[e.target.id] = e.target.value;
    setDataChange(newData);
  };

  return (
    <Modal show={true} className="d-flex justify-content-center">
      <Form onSubmit={(e) => handlesubmit(e)}>
        <Modal.Header closeButton>
          <Modal.Title>{accion} Documento</Modal.Title>
        </Modal.Header>
       
        {accion === "cambiar" ? (
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                id="tipo_documento"
                disabled
                value={dataChange.tipo_documento}
              />

              <Form.Select
                required
                aria-label="Default select example"
                type="text"
                id="estado"
                value={dataChange.estado}
                onChange={(e) => handleChanges(e)}
              >
                <option></option>
                <option value="0">Pendiente</option>
                <option value="1">Aceptado</option>
                <option value="2">Rechazado</option>
              </Form.Select>

              <Form.Control
                required
                type="text"
                id="observacion"
                value={dataChange.observacion}
                onChange={(e) => handleChanges(e)}
              />
            </Form.Group>
            <div className="text-center">
              {cargandoS ? (
                <Spinner animation="border" variant="primary" />
              ) : (
                ""
              )}
              {!cargandoS ? (
                <Alert variant={dataAlert.variant}>{dataAlert.message}</Alert>
              ) : (
                ""
              )}
            </div>
          </Modal.Body>
        ) : (
          //MOSTRAR SI ACCION ES ELIMINAR
          
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                id="tipo_documento"
                disabled
                value={dataChange.tipo_documento}
              />

             <Alert variant={dataAlertEliminar.variant}>{dataAlertEliminar.message}</Alert>
             </Form.Group>
             <div className="text-center">
              {cargandoS ? (
                <Spinner animation="border" variant="primary" />
              ) : (
                ""
              )}              
            </div>
          </Modal.Body>
          
          // FIN MOSTRAR SI ACCION ES ELIMINAR
        )}

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCambios}>
            Close
          </Button>
          <Button type="submit" variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ModalCambiarEstados;
