import {direcionDeServidor} from "./server"

export const obtenerClientePorNit = async (nit) => {
    try {
        const res = await fetch(`${direcionDeServidor}clientes/nit/${nit}`)
        return await res.json()
    } catch (error) {
        console.log(error);
    }
}

export const crearCliente = async (data) => {
    try {
        const res = await fetch(`${direcionDeServidor}clientes`,{
            method:"POST",
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        })
        return await res.json()
    } catch (error) {
        console.log(error);
    }
}

export const obtenerAsignacionParaDocumentacion = async (data) => {
    try {
        const res = await fetch(`${direcionDeServidor}clientes/asignaciones`,{
            method:"POST",
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        })
        return await res.json()
    } catch (error) {
        console.log(error);
    }
}