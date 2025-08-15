// src/helpers/validaciones.js

export const validaciones = Object.freeze({
  on(ev, obj) {
    if (typeof ev !== "string" || !ev.trim()) {
      console.error(`El ${ev} no existe`);
    }

    for (const [selector, callback] of Object.entries(obj)) {
      if (typeof selector !== "string" || !selector.trim()) {
        console.error(`El ${selector} no existe`);
      }

      if (typeof callback !== "function" || callback === null) {
        console.error(`El ${callback} no es una funcion`);
      }
    }
  },

  append(html) {
    if (!html) throw new Error("Ingresa template");
    if (typeof html !== "string") throw new Error("Solo acepto STRING");
  },

  val(val) {
    if (typeof val !== "string") throw new Error("val espera string");
  },

  css(prop, val) {
    if (typeof prop !== "string")
      throw new Error("css espera propiedad tipo string");
    if (!prop.trim()) throw new Error("propiedad no puede estar vacía");
    if (typeof val !== "string")
      throw new Error("css espera valor tipo string");
  },
  get(url, callback) {
    if (typeof url !== "string" || !url.trim())
      throw new Error("URL inválida para get");
    if (typeof callback !== "function")
      throw new Error("Callback debe ser función para get");
  },

  post(url, data, callback) {
    if (typeof url !== "string" || !url.trim())
      throw new Error("URL inválida para post");
    if (typeof data !== "object" || data === null)
      throw new Error("Datos inválidos para post");
    if (typeof callback !== "function")
      throw new Error("Callback debe ser función para post");
  },
});

// -------------------------------------------------

//dicionario de validaciones
const validator = Object.freeze({
  str: {
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

export function validate(args = {}) {
  const errors = [];
  for (const [key, { fn, msg }] of Object.entries(validator)) {
    const value = args[key];
    if (key in args && fn(value)) {
      // Formateamos arrays de forma legible
      const errorMsg = Array.isArray(value)
        ? `${msg}: [${value.map(v => JSON.stringify(v)).join(", ")}]`
        : `${msg}: ${value}`;
      errors.push(errorMsg);
    }
  }
  if (errors.length > 0) {
    console.warn("Errores de validación:\n" + errors.join("\n"));
  } else {
    console.log("Validación exitosa ✅");
  }
}
window.Validate = validate;
