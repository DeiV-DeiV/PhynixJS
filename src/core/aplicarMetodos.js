import { metodos } from "../modules/jquery/metodos.js";

export function aplicarMetodos(el) {
  
 
  for (const key of metodos) {
    Object.defineProperty(el, key, {
      value: metodos[key],
      writable: false,
      configurable: false,
      enumerable: false,
    });
  }

  return el;
}

// function f_metodos(els){
 //  for (const [key, value] of metodos) {
        //els[key] = value
 //  }
// }
