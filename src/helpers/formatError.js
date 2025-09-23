// src/helpers/formatError.js

import { Component } from "../modules/Component/Component.js";


export function errorData(xx, { data, method }) {

  return Object.freeze({
  title: xx.title || "Error en Component",
  mensaje: xx.message || "Error desconocido",
  error: xx.toString(),
  stack: xx.stack || "Sin stack",
  name: xx.name || "Error",
  ruta: typeof data.url === "string" ? data.url : "Objeto directo",
  metodo: method,
  fecha: new Date().toString(),
});

  
}


export function formatError (xx, { data, method }){
Component({
    method: method,
    template: "/error/error.html",
    style: "/error/error.css",
    data: errorData(xx,{data,method}),
    
  });
}