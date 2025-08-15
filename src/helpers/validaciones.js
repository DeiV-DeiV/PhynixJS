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

export function validate({ str, callback, object, array, number }) {
  if (typeof str !== "string" || !str.trim()) {
    console.error("no es un string");
  }

  if (typeof callback !== "function" || callback === null) {
    console.error("debe ser una function");
  }

  if (typeof object !== "object" || object === null) {
    console.error("Solo acepto Objeto");
  }

  if (!Array.isArray(array)) {
    console.error("Esperando un arreglo");
  }

  if (typeof number !== "number") {
    console.error("Esperando un numero");
  }
}
window.Validate = validate

// ejemplo de uso
function uso(html, data, fn, elementos = {}, num) {
  validate({
    str: html,
    callback: fn,
    object: data,
    array: elementos,
    number: num,
  });
}

uso(
  "template.html",
  { nombre: "test" },
  function () {
    console.log("callback ok");
  },
  ["item1", "item2"],
  99
);
