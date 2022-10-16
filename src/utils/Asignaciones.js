import {direcionDeServidor} from "./server"

export const obtenerAsignaciones = async (id) => {
    try {
        const res = await fetch(`${direcionDeServidor}asignaciones`)
        return await res.json()
    } catch (error) {
        console.log(error);
    }
}

export const crearAsignacion = async (data) => {    
    try {
        const res = await fetch(`${direcionDeServidor}asignaciones`,{
            method:"POST",
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        })
        return await res.json()
    } catch (error) {
        console.log(error);
    }
}

export const subirDocumentacionAsignacion = async (id,data) => {    
    try {
        const res = await fetch(`${direcionDeServidor}asignaciones/subirDocumentos/${id}`,{
            method:"POST",
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
        })
        return await res.json()
    } catch (error) {
        console.log(error);
    }
}

