// core.js
// consume menos memoria, mi punto es ese

import { error } from "./helpers/error.js";
import { metodos } from "./metodos.js";

const DEBUG = false;
const x = (...args) => DEBUG && console.log(...args);

const DEV_MODO = false; // usar FALSE para produccion

const aplicarMetodos = (el) => {
  // evita usar proxy
  for (const nameMetodo of Object.keys(metodos)) {
    Object.defineProperty(el, nameMetodo, {
      value: metodos[nameMetodo],
      writable: false,
      configurable: false,
      enumerable: false,
    });
  }

  // Evita agregar nuevas propiedades
  return Object.freeze(el);
};

const usarProxy = (el) => {
  return new Proxy(el, {
    get(target, prop) {
      if (prop in target) return target[prop];
      if (prop in metodos) {
        const fn = metodos[prop];
        Object.defineProperty(target, prop, {
          value: fn,
          writable: false,
          configurable: false,
          enumerable: false,
        });

        return fn;
      }

      return undefined;
    },

    set(target, prop, value) {
      if (prop in metodos)
        throw new Error(`No puedes sobreescribir el metodo .${prop}`);
      target[prop] = value;
      return true;
    },
  });
};


// ejecutadores

const $$ = function (s) {
  if (typeof s === "function") {
    document.addEventListener("DOMContentLoaded", s);
    return;
  }

  const ele =
    typeof s === "string"
      ? [...document.querySelectorAll(s)]
      : s instanceof Element
      ? [s]
      : s instanceof NodeList || Array.isArray(s)
      ? [...s]
      : error(s);

  if (!ele) error(s); // <- agrega esta validación

  const final = DEV_MODO ? aplicarMetodos(ele) : usarProxy(ele);
  return final;
};

const $ = (s) => {
  if (typeof s === "function") {
    document.addEventListener("DOMContentLoaded", s);
    return;
  }
  const ele =
    typeof s === "string"
      ? document.querySelector(s)
      : s instanceof Element
      ? s
      : error(s);

  if (!ele) error(s); // <- agrega esta validación

  const final = DEV_MODO ? aplicarMetodos([ele]) : usarProxy([ele]);
  return final;
};



export { $, $$, error, x };
