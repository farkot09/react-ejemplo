import {direcionDeServidor} from "./server"

export const obtenerClientePorNit = async (nit) => {
    try {
        const res = await fetch(`${direcionDeServidor}clientes/nit/${nit}`)
        return await res.json()
    } catch (error) {
        console.log(error);
    }
}
