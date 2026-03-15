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
    //Optimizacion
    const entries = Object.entries(style)
    for(let i = 0;i<this.length;i++){
      const el = this[i]
      for(let j = 0;j<entries.length;j++){
        const [prop, val] = entries[j]
        el.style[prop] = val
      }
    }
  
  }

  return this;
}
