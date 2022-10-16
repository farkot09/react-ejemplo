import React, { useEffect, useState } from "react";
import { Badge, Spinner } from "react-bootstrap";
import {
  FaRegWindowClose,
  FaRegEye,
  FaPlus,
  FaFolderOpen,
} from "react-icons/fa";
import { obtenerReservas } from "../../utils/Reservas";
import { obtenerAsignaciones } from "../../utils/Asignaciones";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import MostrarDocumentacion from "../../components/MostrarDocumentacion";

function Reservas() {
  const [reservas, setReservas] = useState([]);
  const [reservaDetalle, setReservaDetalle] = useState([]);
  const [asignaciones, setAsignaciones] = useState([]);
  const [mostrarDetalles, setMostrarDetalles] = useState(false);
  const [mostrarDocumentacion, setMostrarDocumentacion] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [idParamostrarDocumentacion, setIdParaMostrarDocumentacion] =
    useState("");
  const [listadoDocumentacion, setListadoDocumentacion] = useState([]);

  useEffect(() => {
    obtenerReservas().then((data) => {
      setReservas(data);
      setCargando(false);
    });
  }, []);

  return (
    <div className="d-flex justify-content-center">
      <Spinner
        animation="border"
        variant="primary"
        className={!cargando ? "visually-hidden" : ""}
      />
      <Table
        bordered={true}
        striped
        hover
        className={cargando ? "visually-hidden" : ""}
      >
        <thead>
          <tr>
            <td colSpan={7}>
              {" "}
              <Link to="/crearreserva"> Nueva reserva+ </Link>{" "}
            </td>
          </tr>
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
                        setMostrarDocumentacion(false);
                      }}
                      bg="warning"
                    >
                      <FaRegWindowClose />
                    </Badge>{" "}
                  </td>
                  <td>{item.numero_reserva}</td>
                  <td>{item.destino}</td>
                  <td>{item.vassel}</td>
                  <td>{item.fecha_cierre}</td>
                  <td>
                    <Link
                      to={`/asignarcliente/${item.id}/${item.numero_reserva}`}
                    >
                      <Badge bg="success">
                        <FaPlus />
                      </Badge>
                    </Link>
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
                  <td>{item.fecha_cierre.slice(0, 10)}</td>
                  <td>
                    <Link
                      to={`/asignarcliente/${item.id}/${item.numero_reserva}`}
                    >
                      <Badge bg="success">
                        <FaPlus />
                      </Badge>{" "}
                    </Link>
                  </td>
                  <td></td>
                </tr>
              ))}
          {mostrarDetalles ? (
            <tr>
              <td colSpan={7}>
                <hr class="solid" />
              </td>
            </tr>
          ) : (
            ""
          )}

          {mostrarDetalles ? (
            <tr className="fw-bold fst-italic">
              <td>#</td>
              <td>Cliente</td>
              <td>Codigo</td>
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
                  <td>{item.id_cliente[0].razon_social} </td>
                  <td>
                    <small>{item.id}</small>{" "}
                  </td>
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
                    </Badge>
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
                    <td>
                      <td>
                        <small>{data.id}</small>{" "}
                      </td>
                    </td>
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
          {mostrarDocumentacion ? (
            <tr>
              <td colSpan={7}>
                <hr class="solid" />
              </td>
            </tr>
          ) : (
            ""
          )}
          {mostrarDocumentacion ? (
            <tr className="fw-bold fst-italic">
              <td>#</td>
              <td>Tipo de Documento</td>
              <td>Descarga</td>
              <td>Estado</td>
              <td>Observacion</td>
              <td>Acciones</td>
              <td>-</td>
            </tr>
          ) : (
            ""
          )}

          {mostrarDocumentacion
            ? listadoDocumentacion.map((item, index) => (
                <MostrarDocumentacion
                  item={item}
                  indice={index}
                  key={index}
                  tipo="usuario"
                />
              ))
            : "falses"}
        </tbody>
      </Table>
    </div>
  );
}

export default Reservas;
