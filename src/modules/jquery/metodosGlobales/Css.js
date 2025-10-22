import { path } from "../../../helpers/path.js";
// import { Validate } from "../../validate/Validate.js";


export function Css(obj){
    if (typeof obj === "string" && obj.endsWith(".css")) {
        
         const ruta = path(obj)
         
        if (!document.querySelector(`link[href="${ruta}"]`)) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = ruta;
          document.head.appendChild(link);
        }
        
      }

    if(typeof obj === 'object'){

      const entries = Object.entries(obj)
      for(let i = 0; i < entries.length; i++){
          const [selector, style] = entries[i]
          const el  = document.querySelector(selector)
  
          // Aplicar todos los estilos de style
          for (const [key, value] of Object.entries(Object.freeze(style))) {
              el.style[key] = value;
          }
      }
    }
      
    
}