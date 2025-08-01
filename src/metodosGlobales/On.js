// metodos/globales/On.js

import { $ } from "../core.js";

export let EventHandlersByType = {};

// export function AddEventType(ev, handler) {
//   if (!EventHandlersByType[ev]) EventHandlersByType[ev] = {};

//   EventHandlersByType[ev] = { ...EventHandlersByType[ev], ...handler };
// }

export const On = (window.On = function (ev, handler = {}) {
  if (typeof handler !== "object" || handler == null) {
    console.error("handler debe ser un objeto");
    return;
  }

  document.body.addEventListener(ev, function (e) {
    for (const [selector, fn] of Object.entries(EventHandlersByType[ev])) {
      const target = e.target.closest(selector);
      if (target) {
        fn.call($(target), e);
        break;
      }
    }
  });
});
