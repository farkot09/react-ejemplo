import React from "react";
import { Badge, Button, OverlayTrigger, Tooltip,Dropdown  } from "react-bootstrap";
import { GoAlert } from "react-icons/go";
import { SiAdblock } from "react-icons/si";
import { 
  FaSearch,
  FaCheckCircle,
  FaFilePdf
} from "react-icons/fa";

function MostrarDocumentacion({item,indice,tipo }) {    
    
  return (
    <tr>
    <td>{indice+1}</td>
    <td>      
      <small>{item.tipo_documento}</small>{" "}
    </td>
    <td>
      <FaFilePdf size={20} color={"#DC3545"} className="me-1" />

      <a
        className="letraPequena"
        href={`https://nexus-api-2022.herokuapp.com${item.url}`}
      >
        {item.tipo_documento}.pdf
      </a>
    </td>
    <td>
      {parseInt(item.estado) === 0 ? (
        <Badge bg="warning">
          <GoAlert /> Pendiente
        </Badge>
      ) : (
        ""
      )}
      {parseInt(item.estado) === 1 ? (
        <Badge bg="success">
          <FaCheckCircle /> Aprobado
        </Badge>
      ) : (
        ""
      )}
      {parseInt(item.estado) === 2 ? (
        <Badge bg="danger">
          <SiAdblock /> Rechazado
        </Badge>
      ) : (
        ""
      )}
    </td>
    <td>
      <OverlayTrigger
        placement="right"
        overlay={
          <Tooltip id={"tooltip-right"}>
            <strong>{item.observacion}</strong>.
          </Tooltip>
        }
      >
        <Button variant="secondary">
          <FaSearch />
        </Button>
      </OverlayTrigger>
    </td>

    <td>
    <Dropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">        
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Eliminar</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Cambiar Estado </Dropdown.Item>
        
      </Dropdown.Menu>
    </Dropdown>
 
    </td>
    <td>-</td>
  </tr>
  )
}

export default MostrarDocumentacion