// src/component.js

import { $ } from "../jquery/jquery.js";

// Component v2
export function Component({
  selector = "body",
  method = "GET",
  template = "",
  style = "",
  script = "",
  data = "",
  limit = 15,
  
}) {
  return function () {
    try {
      const ctn = $(selector);
      ctn.html(template, { method, data, limit });
      ctn.css(style);
      ctn.js(script);
    } catch (xx) {
      console.log('Error en Component:',xx);
    }
  };
}


// exportacion global
window.Component = Component;
