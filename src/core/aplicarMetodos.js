import { metodos } from "../modules/jquery/metodos.js";

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


