import { metodos } from "./metodos.js";

export function aplicarMetodos(el) {
  // evita usar proxy
  for (const metodo of Object.keys(metodos)) {
    Object.defineProperty(el, metodo, {
      value: metodos[metodo],
      writable: false,
      configurable: false,
      enumerable: false,
    });
  }

  return el   
};