// metodos/globales/On.js

import { mi$ } from "../../core.js";

export let EventHandlersByType = {};

// export function AddEventType(ev, handler) {
//   if (!EventHandlersByType[ev]) EventHandlersByType[ev] = {};

//   EventHandlersByType[ev] = { ...EventHandlersByType[ev], ...handler };
// }

function $On(ev, handler = {}) {
  if (typeof handler !== "object" || handler == null) {
    console.error("handler debe ser un objeto");
    return;
  }

  document.body.addEventListener(ev, function (e) {
    for (const [selector, fn] of Object.entries(EventHandlersByType[ev])) {
      const target = e.target.closest(selector);
      if (target) {
        fn.call(mi$(target), e);
        break;
      }
    }
  });


  
}

// Soporte global y por módulo
export const On = (ev, handler) => $On(ev, handler);
window.On = (ev, handler) => $On(ev, handler);
