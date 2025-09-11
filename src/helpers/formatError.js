// src/helpers/formatError.js

export function formatError(xx,{data,method}){
    return Object.freeze({
        title: xx.title || "Error en Component",
        mensaje: xx.message || "Error desconocido",
        error: xx.toString(),
        stack: xx.stack || "Sin stack",
        name: xx.name || "Error",
        ruta: typeof data.url === "string" ? data.url : "Objeto directo",
        metodo: method,
        fecha: new Date().toString(),
      })
}