import React from 'react'
import Card from 'react-bootstrap/Card';


function TiempoRestante({cierre,numeroReserva}) {
  const obtenerTIempoRestante = () =>{
    const fechaActual = new Date()    
    const fechaCierre = new Date(cierre)   
    const tiempoRestante = (fechaCierre - fechaActual + 1000) / 1000
    //const segundosRestantes = ("0" + Math.floor(tiempoRestante % 60)).slice(-2)
    //const minutosRestantes = ("0" + Math.floor(tiempoRestante / 60 % 60)).slice(-2)
    const horasRestantes = ("0" + Math.floor(tiempoRestante / 3600 % 24)).slice(-2)
    const diasRestantes = (Math.floor(tiempoRestante / (3600 * 24)))
    
    return `En ${diasRestantes} dias y ${horasRestantes} horas` 
  }

  
  

  return (
    <Card bg="success" text='white' >
    <Card.Header>{numeroReserva}</Card.Header>
          <Card.Body>
            <Card.Title> Cierre de Reserva </Card.Title>
            <Card.Text>
            {obtenerTIempoRestante()}
            </Card.Text>
          </Card.Body>
        </Card>
  )
}

export default TiempoRestante