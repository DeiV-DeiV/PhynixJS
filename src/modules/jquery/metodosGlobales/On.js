// src/metodosGlobales/On.js

import { validate } from "../../validate/validate.js";


const eventosRegistrados = new Set();
const mapeoEvents = {}; // { evento: { selector: callback } }

export function On(ev, obj) {
  validate({object: obj})
  const eventos = (mapeoEvents[ev] ||= {});

  for (const selector in obj) {
    if (!(selector in eventos)) {
      eventos[selector] = obj[selector];
    } else {
      console.warn(
        `El selector ${selector} ya fue registrado en el evento ${ev}`
      );
    }
  }

  if (eventosRegistrados.has(ev)) return;

  document.body.addEventListener(ev, function (e) {
    for (const [selector, callback] of Object.entries(eventos)) {
      const target = e.target.closest(selector);
      if (target) {
        callback.call(target, e);
      }
    }
  });

  eventosRegistrados.add(ev);
}

window.On = On;
