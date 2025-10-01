// src/modules/validate/validator.js

import { backList } from "./blackList.js";

export const validator = Object.freeze({
  html: {
    fn: (v) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(v, "text/html");
      for (const el of doc.querySelectorAll("*")) {
        if (backList.tags.includes(el.tagName.toLowerCase())) return false;
        for (const attr of el.attributes) {
          if (backList.attrs.includes(attr.name.toLowerCase())) return false;
        }
      }
      return true;
    },
    msg: "HTML invalido",
  },

  node: {
    fn: (v) =>
      Array.isArray(v)
        ? v.every((el) => el instanceof Node)
        : v instanceof Node,
    msg: "No es un Node",
  },

  string: {
    fn: (v) =>
      Array.isArray(v)
        ? v.every((el) => typeof el == "string" && el.trim().length > 0)
        : typeof v == "string" && v.trim().length > 0,
    msg: "No es un string valido",
  },

  callback: {
    fn: (v) => typeof v == "function",
    msg: "Debe ser una funcion",
  },

  object: {
    fn: (v) =>
      Array.isArray(v)
        ? v.every((el) => typeof el == "object" && el !== null)
        : typeof v == "object" && v !== null,
    msg: "Solo acepto objeto",
  },

  array: {
    fn: (v) => Array.isArray(v),
    msg: "Esperando un arreglo",
  },

  number: {
    fn: (v) =>
      Array.isArray(v)
        ? v.every((el) => typeof el == "number")
        : typeof v == "number",
    msg: "Esperando un numero",
  },

  email:{
    fn:()=>{},
    msg:"Email invalido"
  }
});
