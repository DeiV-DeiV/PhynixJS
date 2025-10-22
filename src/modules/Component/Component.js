// src/modules/Component/Component.js

import { $ } from "../jquery/jquery.js";
import { Css } from "../jquery/metodosGlobales/Css.js";
// import { Validate } from "../validate/validate.js";

// Component v2
export function Component({
  selector = "body",
  method = "GET",
  template = '',
  style = "",
  script = "",
  data = "",
  limit = 15,
}) {
  return function () {
    try {
      // Validate({string:[selector,method,template,style,script]})
      const ctn = $(selector)
        ctn.html(template, { method, data, limit })
        Css(style)
        ctn.js(script);
    } catch (xx) {
      console.log("Error Component:", xx);
    }
  };
}

// exportacion global
window.Component = Component;
