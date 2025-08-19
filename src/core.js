// core.js
// consume menos memoria, el punto es ese

import {error} from './helpers/error.js'
import {aplicarMetodos, applyMetodos} from './core/aplicarMetodos.js'
import {aplicarProxy} from './core/aplicarProxy.js'
import { On } from './metodosGlobales/On.js';


export const x = console.log
window.x = x;

const DEV_MODO = false; // usar FALSE para produccion

export function $$(s) {
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

  if (!ele.length) error(s);

  
  return applyMetodos(ele)
}
window.$$ = $$;

export function $(s) {
  if (typeof s === "function") {
    document.readyState === "loading"
      ? document.addEventListener("DOMContentLoaded", s)
      : s();

    return;
  }

  const ele =
    typeof s === "string"
      ? document.querySelector(s)
      : s instanceof Element
      ? s
      : error(s);

  if (!ele.length) error(s);

  return applyMetodos(ele);
}

window.$ = $;





// Exportacion metodosGlobales |metodo y global|


export const Click = (obj = {}) => On("click", obj);
window.Click = Click;

export const Input = (obj = {}) => On("input", obj);
window.Input = Input;










