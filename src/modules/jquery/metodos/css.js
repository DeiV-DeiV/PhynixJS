// metodos/css.js

import { path } from "../../../helpers/path.js";

export function css(style) {
  if (typeof style === "string" && style.endsWith(".css")) {
     const ruta = path(style)
     
    if (!document.querySelector(`link[href="${ruta}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = ruta;
      document.head.appendChild(link);
    }
    
  }

  if (typeof style === "object" && style !== null) {
    for(const el of this) {
      for (const [prop, val] of Object.entries(style)) {
        el.style[prop] = val;
      }
    };
  
  }

  return this;
}
