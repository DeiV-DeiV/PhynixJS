// metodos/css.js

export function css(style) {
  if (typeof style === "string" && style.endsWith(".css")) {
     
    if (!document.querySelector(`link[href="${style}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = style;
      document.head.appendChild(link);
    }
    
  }

  if (typeof style === "object" && style !== null) {
    for(const el of this) {
      for (let [prop, val] of Object.entries(style)) {
        el.style[prop] = val;
      }
    };
  
  }

  return this;
}
