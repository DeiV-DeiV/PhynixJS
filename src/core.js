// core.js
// consume menos memoria, el punto es ese

import {error} from './helpers/error.js'
import {aplicarMetodos} from './core/aplicarMetodos.js'
import {aplicarProxy} from './core/aplicarProxy.js'
import { evGlobales } from './eventsGlobals.js';


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

  const final = DEV_MODO ? aplicarProxy(ele) : aplicarMetodos(ele);
  return final;
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
      ? [document.querySelector(s)]
      : s instanceof Element
      ? [s]
      : error(s);

  if (!ele.length) error(s);

  return aplicarMetodos(ele);
}

window.$ = $;





// Exportacion metodosGlobales |metodo y global|

export const On = (ev, handler = {}) => evGlobales(ev, handler);
window.On = On;

export const Click = (handlers = {}) => evGlobales("click", handlers);
window.Click = Click;

export const Input = (handlers = {}) => evGlobales("input", handlers);
window.Input = Input;

export const Drag = (handlers = {}) => evGlobales("mousedown", handlers);
window.Drag = Drag;

export const Shortcut = (handlers = {}) => evGlobales("keydown", handlers);
window.Shortcut = Shortcut;






