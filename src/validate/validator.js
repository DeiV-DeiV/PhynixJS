// src/validate/validator.js

export const validator = Object.freeze({
  node: {
    fn: (v) =>
      Array.isArray(v)
        ? v.some((el) => !(el instanceof Node))
        : !(v instanceof Node),
    msg: "No es un Node",
  },

  string: {
    fn: (v) =>
      Array.isArray(v)
        ? v.some((el) => typeof el !== "string" || !el.trim())
        : typeof v !== "string" || !v.trim(),
    msg: "No es un string válido",
  },

  callback: {
    fn: (v) => typeof v !== "function" || v === null,
    msg: "Debe ser una función",
  },

  object: {
    fn: (v) => typeof v !== "object" || v === null,
    msg: "Solo acepto objeto",
  },

  array: {
    fn: (v) => !Array.isArray(v),
    msg: "Esperando un arreglo",
  },

  number: {
    fn: (v) => typeof v !== "number",
    msg: "Esperando un número",
  },
});