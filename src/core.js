// core.js
// consume menos memoria, mi punto es ese

import { metodos } from "./dom.js";

const DEBUG = false;
const x = (...args) => DEBUG && console.log(...args);

const DEV_MODO = true; // usar FALSE para produccion

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
  return el;
  // return Object.freeze(nodoArray);
  // Object.freeze(Persona.prototype);
};

const usarProxyProtegido = (el) => {
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

export const mi$ = (selector) => {
  if (typeof selector === "function") {
    document.addEventListener("DOMContentLoaded", selector);
    return;
  }

  if (typeof selector === "string") {
    const elements = Array.from(document.querySelectorAll(selector));

    return DEV_MODO ? usarProxyProtegido(elements) : aplicarMetodos(elements);
  }
  
  // Si es un nodo DOM individual
  if (selector instanceof Element) {
    const elements = [selector];
    return DEV_MODO ? usarProxyProtegido(elements) : aplicarMetodos(elements);
  }

  return [];
};

const modsMap = {
  ctrl: "ctrlKey",
  alt: "altKey",
  shift: "shiftKey",
  meta: "metaKey",
};

export const $keydown = ({ selector, keypress, handle }) => {
  const element = mi$(selector);
  const [modKey, keyChar] = keypress.toLowerCase().split("+");
  const modKeyProp = modsMap[modKey];

  document.addEventListener("keydown", (e) => {
    const matchKey = e[modKeyProp] && e.key.toLowerCase() === keyChar;

    if (matchKey) {
      element._forEach((el) => handle.call(mi$(el)));
    }
  });
};
