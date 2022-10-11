import React, { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import { GrDocumentPdf } from "react-icons/gr";
import {
  FaRegWindowClose,
  FaRegEye,
  FaPlus,
  FaFolderOpen,
} from "react-icons/fa";

import { obtenerReservas } from "../utils/Reservas";
import { obtenerAsignaciones } from "../utils/Asignaciones";
import Table from "react-bootstrap/Table";

function Reservas() {
  const [reservas, setReservas] = useState([]);
  const [reservaDetalle, setReservaDetalle] = useState([]);
  const [asignaciones, setAsignaciones] = useState([]);
  const [mostrarDetalles, setMostrarDetalles] = useState(false);
  const [mostrarDocumentacion, setMostrarDocumentacion] = useState(false);
  const [idParamostrarDocumentacion, setIdParaMostrarDocumentacion] =
    useState("");
  const [listadoDocumentacion, setListadoDocumentacion] = useState([]);

  useEffect(() => {
    obtenerReservas().then((data) => {
      setReservas(data);
    });
  }, []);

  return (
    <div className="d-flex text-muted">
      <Table bordered={true} striped hover>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>No. de BL/SWB</th>
            <th>Destino</th>
            <th>Vessel</th>
            <th>Fecha de Cierre</th>
            <th>Clientes</th>
            <th>-</th>
          </tr>
        </thead>
        <tbody>
          {mostrarDetalles
            ? reservaDetalle.map((item) => (
                <tr>
                  <td>
                    {" "}
                    <Badge
                      onClick={() => {
                        setMostrarDetalles(!mostrarDetalles);
                      }}
                      bg="warning"
                    >
                      <FaRegWindowClose />
                    </Badge>{" "}
                  </td>
                  <td>{item.numero_reserva}</td>
                  <td>{item.destino}</td>
                  <td>{item.vassel}</td>
                  <td>{new Date(item.fecha_cierre).toLocaleDateString()}</td>
                  <td>
                    <Badge bg="success">
                      <FaPlus />
                    </Badge>{" "}
                  </td>
                  <td>-</td>
                </tr>
              ))
            : reservas.map((item) => (
                <tr>
                  <td>
                    {" "}
                    <Badge
                      onClick={() => {
                        obtenerAsignaciones()
                          .then((data) => {
                            setAsignaciones(
                              data.filter((a) => a.id_reserva[0] === item.id)
                            );
                            setReservaDetalle(
                              reservas.filter((r) => r.id === item.id)
                            );
                            setMostrarDetalles(!mostrarDetalles);
                          })
                          .catch((err) => {
                            alert("Error al obtener los detalles", err);
                          });
                      }}
                      bg="info"
                    >
                      <FaRegEye />
                    </Badge>{" "}
                  </td>
                  <td>{item.numero_reserva}</td>
                  <td>{item.destino}</td>
                  <td>{item.vassel}</td>
                  <td>{new Date(item.fecha_cierre).toLocaleDateString()}</td>
                  <td>
                    <Badge bg="success">
                      <FaPlus />
                    </Badge>{" "}
                  </td>
                  <td>-</td>
                </tr>
              ))}

          {mostrarDetalles ? (
            <tr className="fw-bold fst-italic">
              <td>#</td>
              <td>Cliente</td>
              <td>Peso</td>
              <td>Cantidad</td>
              <td>Cubicaje</td>
              <td>-</td>
              <td>-</td>
            </tr>
          ) : (
            ""
          )}

          {mostrarDetalles && !mostrarDocumentacion
            ? asignaciones.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.id_cliente[0].razon_social}</td>
                  <td>{item.peso} Kilos</td>
                  <td>
                    {item.cantidad} {item.tipo_empaque}
                  </td>
                  <td>{item.cubicaje} CBM</td>
                  <td>
                    <Badge
                      onClick={() => {
                        setMostrarDocumentacion(!mostrarDocumentacion);
                        setIdParaMostrarDocumentacion(item.id);
                        setListadoDocumentacion(item.documentacion);
                      }}
                    >
                      <FaFolderOpen />
                    </Badge>{" "}
                  </td>
                  <td>-</td>
                </tr>
              ))
            : ""}

          {mostrarDocumentacion
            ? asignaciones
                .filter((item) => item.id === idParamostrarDocumentacion)
                .map((data, index) => (
                  <tr>
                    <td></td>
                    <td>{data.id_cliente[0].razon_social}</td>
                    <td>{data.peso} Kilos</td>
                    <td>
                      {data.cantidad} {data.tipo_empaque}
                    </td>
                    <td>{data.cubicaje} CBM</td>
                    <td>
                      <Badge
                        bg="warning"
                        onClick={() => {
                          setMostrarDocumentacion(!mostrarDocumentacion);
                          setIdParaMostrarDocumentacion(data.id);
                        }}
                      >
                        <FaRegWindowClose />
                      </Badge>{" "}
                    </td>
                    <td>-</td>
                  </tr>
                ))
            : ""}

          {mostrarDocumentacion
            ? listadoDocumentacion.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    {" "}
                    <small>{item.tipo_documento}</small>{" "}
                  </td>
                  <td>
                    <Badge bg="danger">
                      <GrDocumentPdf size={20} />
                      Descargar
                    </Badge>{" "}
                  </td>
                  <td>
                    {parseInt(item.estado) === 0 ? (
                      <Badge bg="warning">Pendiente</Badge>
                    ) : (
                      ""
                    )}
                    {parseInt(item.estado) === 1 ? (
                      <Badge bg="success">Aprobado</Badge>
                    ) : (
                      ""
                    )}
                    {parseInt(item.estado) === 2 ? (
                      <Badge bg="danger">Rechazado</Badge>
                    ) : (
                      ""
                    )}
                  </td>
                  <td>{item.observacion}</td>

                  <td>-</td>
                  <td>-</td>
                </tr>
              ))
            : "false"}
        </tbody>
      </Table>
    </div>
  );
}

export default Reservas;
