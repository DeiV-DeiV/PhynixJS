// metodos/css.js

export function css(style) {
  if (typeof style === "string" && style.endsWith(".css")) {
    const ruta = style;
    if (!document.querySelector(`link[href="${ruta}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = ruta;
      document.head.appendChild(link);
    }
    return this;
  }

  if (typeof style === "object" && style !== null) {
    this._forEach((el) => {
      for (let [prop, val] of Object.entries(style)) {
        el.style[prop] = val;
      }
    });
    return this;
  }
}
