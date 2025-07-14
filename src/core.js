// core.js
// consume menos memoria, mi punto es ese

import { metodos } from "../src/dom";

const DEBUG = false;
const x = (...args) => DEBUG && console.log(...args);

const isDev = false;  // usar FALSE para produccion

export const mi$ = (selector) => {
  if (typeof selector === "function") {
    document.addEventListener("DOMContentLoaded", selector);
    return;
  }

  if (typeof selector === "string") {
    const elements = Array.from(document.querySelectorAll(selector));

    if (isDev) {
      return new Proxy(elements, {
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
      });
    } else {
      // evita usar proxy
      for (const key of Object.keys(metodos)) {
        Object.defineProperty(elements, key, {
          value: metodos[key],
          writable: false,
          configurable: false,
          enumerable: false,
        });
      }
    }

    // Previene agregar nuevas propiedades
    Object.freeze(elements);
    // Object.freeze(Persona.prototype);

    return elements;
  }

  return [];
};
