import {direcionDeServidor} from "./server"

export const obtenerReservas = async () => {
    try {
        const res = await fetch(`${direcionDeServidor}reservas`)
        return await res.json()
    } catch (error) {
        console.log(error);
    }
}
