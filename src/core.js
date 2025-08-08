// core.js
// consume menos memoria, el punto es ese

import {error} from './helpers/error.js'
import {aplicarMetodos} from './core/aplicarMetodos.js'
import {aplicarProxy} from './core/aplicarProxy.js'


export const x = (...args) => console.log(...args);

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

  const final = DEV_MODO ? aplicarProxy(ele) : aplicarMetodos(ele);
  return final;
}

export function $(s) {
  if (typeof s === "function") {
    document.readyState === "loading"
      ? document.addEventListener("DOMContentLoaded", s)
      : s();

    return;
  }

  const ele =
    typeof s === "string"
      ? [document.querySelector(s)]
      : s instanceof Element
      ? [s]
      : error(s);

  if (!ele.length) error(s);

  return aplicarProxy(ele);
}

// exportacion global
window.$ = $;
window.$$ = $$;
window.x = x;







