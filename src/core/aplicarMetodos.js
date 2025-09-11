import { metodos } from "./metodos.js";

export function aplicarMetodos(el) {
  if (!el || (typeof el !== "object" && typeof el !== "function")) {
    console.warn("aplicarMetodos: elemento inválido", el);
    return el; // devuelve tal cual para evitar el crash
  }
  // evita usar proxy
  for (const metodo of Object.keys(metodos)) {
    Object.defineProperty(el, metodo, {
      value: metodos[metodo],
      writable: false,
      configurable: false,
      enumerable: false,
    });
  }

  return el;
}

export function applyMetodos(el) {
  const wrapper = {
    ele: Array.isArray(el) ? el : [el],
    apply(fn) {
      for (const el of this.ele) fn(el);
      return this;
    },
  };
  for (const [key, fn] of Object.entries(metodos)) {
    wrapper[key] = function (...args) {
      wrapper.apply(function (elm) {
        fn(elm, ...args);
      });
      return wrapper;
    };
  }

  return wrapper;
}
