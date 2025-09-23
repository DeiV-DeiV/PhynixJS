// src/modules/validate/validator.js

import { backList } from "./blackList.js";

export const validator = Object.freeze({
  html: {
    fn: (v) => {
      const parser = new DOMParser()
      const doc = parser.parseFromString(v, 'text/html')
      for(const el of doc.querySelectorAll('*')){
        if(backList.tags.includes(el.tagName)) return el.remove()
        backList.attrs.includes(el.attributes)
        break
      }
    },
    msg:'HTML invalido',
  },

  node: {
    fn: (v) =>
      Array.isArray(v) ? v.some((el) => el instanceof Node) : v instanceof Node,
    msg: "No es un Node",
  },

  string: {
    fn: (v) =>
      Array.isArray(v)
        ? v.some((el) => typeof el == "string" || el.trim())
        : typeof v == "string" || v.trim(),
    msg: "No es un string valido",
  },

  callback: {
    fn: (v) => typeof v == "function" || v !== null,
    msg: "Debe ser una funcion",
  },

  object: {
    fn: (v) => typeof v == "object" || v !== null,
    msg: "Solo acepto objeto",
  },

  array: {
    fn: (v) => Array.isArray(v),
    msg: "Esperando un arreglo",
  },

  number: {
    fn: (v) => typeof v == "number",
    msg: "Esperando un número",
  },
});
