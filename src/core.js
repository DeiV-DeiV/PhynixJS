// core.js
// consume menos memoria, mi punto es ese

import { metodos } from "./dom.js";

const DEBUG = false;
const x = (...args) => DEBUG && console.log(...args);

const DEV_MODO = true; // usar FALSE para produccion

const aplicarMetodos = (nodoArray) => {
  // evita usar proxy
  for (const nameMetodo of Object.keys(metodos)) {
    Object.defineProperty(nodoArray, nameMetodo, {
      value: metodos[nameMetodo],
      writable: false,
      configurable: false,
      enumerable: false,
    });
  }

  // Previene agregar nuevas propiedades
  return nodoArray
  // return Object.freeze(nodoArray);
  // Object.freeze(Persona.prototype);
};

const usarProxyProtegido = (nodoArray) => {
  return new Proxy(nodoArray, {
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
        throw new Error(`No puedes sobreescribir el metodo ${prop}`);
      target[prop] = value;
      return true;
    },
  });
};

export const mi$ = (selector) => {
  if (typeof selector === "function") {
    document.addEventListener("DOMContentLoaded", selector);
    return;
  }

  if (typeof selector === "string") {
    const elements = Array.from(document.querySelectorAll(selector));
    
    return DEV_MODO
      ? usarProxyProtegido(elements)
      : aplicarMetodos(elements);
  }

  return [];
};
