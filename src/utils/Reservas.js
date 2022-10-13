import {direcionDeServidor} from "./server"

export const obtenerReservas = async () => {
    try {
        const res = await fetch(`${direcionDeServidor}reservas`)
        return await res.json()
    } catch (error) {
        console.log(error);
    }
}

export const crearReserva = async (data) => {    
    try {
        const res = await fetch(`${direcionDeServidor}reservas`,{
            method:"POST",
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        })
        return await res.json()
    } catch (error) {
        console.log(error);
    }
}
