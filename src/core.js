// core.js
// consume menos memoria, mi punto es ese

import { metodos } from "./dom.js";

const DEBUG = false;
const x = (...args) => DEBUG && console.log(...args);

const DEV_MODO = false; // usar FALSE para produccion

const proxyCache = new WeakMap()

export const getProxyCache = (el)=>{
  if (!proxyCache.has(el)) {
    const proxy = usarProxyProtegido([el]);
    proxyCache.set(el, proxy);
  }
  return proxyCache.get(el);
}

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

  // Evita agregar nuevas propiedades
  return nodoArray
  // return Object.freeze(nodoArray);
  // Object.freeze(Persona.prototype);
};

const usarProxyProtegido = (nodoArray) => {
  const proxy = new Proxy(nodoArray, {
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
  proxyCache.set(el,proxy)
  return 
};

export const mi$ = (selector) => {
  if (typeof selector === "function") {
    document.addEventListener("DOMContentLoaded", selector);
    return;
  }

  if (typeof selector === "string") {
    const elements = Array.from(document.querySelectorAll(selector));
    
getProxy(elements)
    
    return DEV_MODO ? usarProxyProtegido(elements) : aplicarMetodos(elements);
  }

  return [];
};
