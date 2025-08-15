// src/component.js

import { validate } from "./helpers/validaciones.js";

const componentsCargados = new Set();

export function Component(
  { selector = "body", method = "GET", template, script, style },
  { once = true } = {}
) {
  validate({str:[selector,method,template,script,style]})
  
  return async function () {
    if (!script && !style) return;

    if (once && componentsCargados.has(template)) {
      return console.warn(`Componente cargado en el ${selector}...`);
    }

    const self = document.querySelector(selector);
    if (!self) console.warn(`--> ${selector} <-- no existe en el documento...`);

    try {
      const opts = {
        method: method,
      };

      
      const res = await fetch(`./components/${template}`, opts);
      const html = await res.text();
      self.insertAdjacentHTML('beforeend',html)
      // html = html.replace(/{{(.*?)}}/g, (_, key) => data[key.trim()] ?? "");
      // console.log(html)

      if (once) componentsCargados.add(template);

      // Cargar CSS
      if (
        style &&
        !document.querySelector(`link[href="./components/${style}"]`)
      ) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = `./components/${style}`;
        document.head.appendChild(link);
      }

      // Cargar JS
      if (
        script &&
        !document.querySelector(`script[src="./components/${script}"]`)
      ) {
        const js = document.createElement("script");
        js.src = `./components/${script}`;
        js.type = "module";
        document.body.appendChild(js);
      }
    } catch (rr) {
      const res = await fetch(`./components/error/error.html`);
      const html = await res.text();

      self.innerHTML = html;
    }
  };
}
// exportacion global
window.Component = Component;

console.log(componentsCargados);

// ejemplos de uso

Component({
  template: "",
  style: "",
  script: "",
});
