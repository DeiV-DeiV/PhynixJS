// src/modules/Component/Component.js

import { $ } from "../jquery/jquery.js";
import { Css } from "../jquery/metodosGlobales/Css.js";
// import { Validate } from "../validate/validate.js";

const routerHistory = new Map();
// Component v2
export function Component({
  selector = "body",
  method = "GET",
  router = "",
  template = "",
  style = "",
  script = "",
  data = "",
  limit = 15,
}) {
  return function () {
    try {
      // Validate({string:[selector,method,template,style,script]})
      const currentPath = window.location.pathname;
      if (routerHistory.has(currentPath)) {
        const cache = routerHistory.get(currentPath);
        const ctn = $(cache.selector);
        ctn.html(cache.template, {
          method: cache.method,
          data: cache.data,
          limit: cache.limit,
        });
        Css(cache.style);
        ctn.js(cache.script);
        return
      }

      const ctn = $(selector);
      ctn.html(template, { method, data, limit });
      Css(style);
      ctn.js(script);

      routerHistory.set(currentPath, {
        selector,
        method,
        router,
        template,
        style,
        script,
        data,
        limit,
      });
    } catch (xx) {
      console.error("Error en Component:", xx);
    }
  };
}

// exportacion global
window.Component = Component;
