// src/metodosGlobales/On.js

import { Validate } from "../../validate/Validate.js";

export function On(ev='', obj = {}) {

  document.body.addEventListener(ev, function (e) {
    for (const [selector, callback] of Object.entries(obj)) {
      Validate({string:selector, callback})
      const target = e.target.closest(selector);
      if (target) callback.call(target, e);
    }
  });

 
}

window.On = On;
