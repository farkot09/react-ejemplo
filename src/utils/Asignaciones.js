import {direcionDeServidor} from "./server"

export const obtenerAsignaciones = async (id) => {
    try {
        const res = await fetch(`${direcionDeServidor}asignaciones`)
        return await res.json()
    } catch (error) {
        console.log(error);
    }
}
