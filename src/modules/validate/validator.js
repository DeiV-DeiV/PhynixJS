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
        ? v.every((el) => typeof el === "string")
        : typeof v === "string",
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

  email: {
    fn: (v) => {
      Array.isArray(v)
        ? v.every((el) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el))
        : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    },
    msg: "Email invalido",
  },

  password: {
    fn: (v) => {
      typeof v === "string" &&
        v.length >= 8 &&
        /[A-Z]/.test(v) &&
        /[a-z]/.test(v) &&
        /[0-9]/.test(v);
    },
    msg: "Password inválido (debe tener mayúsculas, minúsculas y números)",
  },
});
