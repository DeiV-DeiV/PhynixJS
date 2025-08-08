// src/helpers/error.js

// errores personalizados
export function error(s) {
  throw new Error(`Elemento Invalido --> ${s} <--`);
};