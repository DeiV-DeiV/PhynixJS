// src/helpers/validaciones.js

export const validaciones = Object.freeze({
  append(html) {
    if (!html) throw new Error("Ingresa template");
    if (typeof html !== "string") throw new Error("Solo acepto STRING");
  },
  val(val) {},

  css(prop, val) {
    if (typeof prop !== "string")
      throw new Error("css espera propiedad tipo string");
    if (!prop.trim()) throw new Error("propiedad no puede estar vacía");
    if (typeof val !== "string")
      throw new Error("css espera valor tipo string");
  },
  get(url, callback) {
    if (typeof url !== 'string' || !url.trim()) throw new Error('URL inválida para get');
    if (typeof callback !== 'function') throw new Error('Callback debe ser función para get');
  },

  post(url, data, callback) {
    if (typeof url !== 'string' || !url.trim()) throw new Error('URL inválida para post');
    if (typeof data !== 'object' || data === null) throw new Error('Datos inválidos para post');
    if (typeof callback !== 'function') throw new Error('Callback debe ser función para post');
  },
});
