// src/helpers/error.js

// errores personalizados
export const error = (s) => {
  throw new Error(`Elemento Invalido --> ${s} <--`);
};