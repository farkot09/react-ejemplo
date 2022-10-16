import React, { useEffect, useState } from "react";
import {
  Button,
  ProgressBar,
  Form,
  Container,
  Table,
  Row,
  Col,
} from "react-bootstrap";
import { subirDocumentacionAsignacion } from "../utils/Asignaciones";
import { obtenerAsignacionParaDocumentacion } from "../utils/Clientes";
import MostrarDocumentacion from "./MostrarDocumentacion";

function FormularioCargaDeArchivos({ datax }) {
  const [listaDocs, setListaDocs] = useState(0);
  const [now, setNow] = useState(0);
  const [cargaDocs, setCargaDocs] = useState({
    tipo_documento: "",
    estado: 0,
  });
  useEffect(() => {
    obtenerAsignacionParaDocumentacion(datax).then((d) => {
      setListaDocs(d.documentacion);
    });
  }, [listaDocs]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setNow(40);
    subirDocumentacionAsignacion(datax.id, cargaDocs)
      .then((d) => {
        setListaDocs(listaDocs);
        setNow(100);
        setTimeout(() => {
          setNow(0);
        }, 5000);
      })
      .catch((err) => {
        setNow(0);
        console.log(err);
      });
  };

  const handleChanges = (e) => {
    const newData = { ...cargaDocs };
    newData[e.target.id] = e.target.value;
    setCargaDocs(newData);
  };

  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-center">
          <Form onSubmit={handleSubmit}>
            <div>
              <label className="input-group-text" for="tipo_documento">
                Tipo de Documento
              </label>
              <select
                className="form-select"
                id="tipo_documento"
                onChange={(e) => handleChanges(e)}
              >
                <option className="text-danger" selected="">
                  Documentos Ordinarios del Cierre...
                </option>
                <option value="SAE">SAE</option>
                <option value="SELECTIVIDAD">SELECTIVIDAD</option>
                <option value="CONSECUTIVO_VUCE">CONSECUTIVO VUCE</option>
                <option value="CONSISTENTE_VUCE">CONSISTENTE VUCE</option>
                <option value="GATE_PAS">GATE PAS(TIQUETE DE BASCULA)</option>

                <option className="text-danger">
                  Documentos Tramite Manual...
                </option>
                <option value="FORMULARIO_DE_MOVIMIENTO_DE_MERCANCIA">
                  FORMULARIO DE MOVIMIENTO DE MERCANCIA (FMM)
                </option>
                <option value="PERFILACION_ANTINARCOTICOS">
                  PERFILACION ANTINARCOTICOS
                </option>
                <option className="text-danger">
                  Documentos Adicionales a las SAE...
                </option>
                <option value="_">CAMBIO TRNASPORTE</option>
                <option value="1175">1175</option>
                <option value="1298">1298</option>
                <option value="ACTA_DE_INSPECCION">ACTA DE INSPECCION</option>
                <option value="1154">1154</option>
                <option value="1416">1416</option>
                <option className="text-danger">
                  Documentos Transbordo...
                </option>
                <option value="1166">1166</option>
                <option value="1178">1178</option>
                <option value="1207">1207</option>
                <option value="RADICADO_DIAN">RADICADO DIAN</option>
              </select>
              <input type="file" class="form-control" id="inputGroupFile02" />
              <Button className="btn btn-primary btn-cargar" type="submit">
                Cargar
              </Button>

              <ProgressBar striped variant="success" now={now} />
            </div>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table bordered={true} striped hover>
            <thead>
              <tr>
                <td>#</td>
                <td>Tipo de Documento</td>
                <td>Descarga</td>
                <td>Estado</td>
                <td>Observacion</td>
                <td>-</td>
                <td>-</td>
              </tr>
            </thead>
            <tbody>
              {listaDocs !== 0
                ? listaDocs.map((item, index) => (
                    <MostrarDocumentacion
                      item={item}
                      indice={index + 1}
                      key={index}
                      tipo="cliente"
                    />
                  ))
                : ""}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default FormularioCargaDeArchivos;
