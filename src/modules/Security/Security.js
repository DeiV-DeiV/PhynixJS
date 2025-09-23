import { whiteList } from "./WhiteList.js";

const Security = Object.freeze({
  sanitizaTemplate: (html) => {
    const parser = new DOMParser();
    const DOM = parser.parseFromString(html, "text/html");

    for (const el of [...DOM.querySelectorAll('*')]) {
      // Eliminar tags no permitidos
      if (!whiteList.allowed_tags.includes(el.tagName.toLowerCase())) {
        el.remove();
      }

      // Eliminar atributos no permitidos
      for (const attr of [...el.attributes])
        if (!whiteList.allowed_attrs.includes(attr.name.toLowerCase())) {
          el.removeAttribute(attr.name);
        }
    }

    return DOM.body.innerHTML;
  },

  // ...etc.
});






