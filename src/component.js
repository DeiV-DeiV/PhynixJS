// src/component.js

import { Diffing } from "./diffing.js";
import { validate } from "./helpers/validaciones.js";

const componentsCargados = new Set();

export function Component(
  { selector = "body", method = "GET", template, script, style, api },
  { once = true } = {}
) {
  validate({
    string: [selector, method, template, script, style, api],
  });

  return async function () {
    if (once && componentsCargados.has(template)) {
      return console.warn(`Componente cargado en el ${selector}...`);
    }

    const self = document.querySelector(selector);
    if (!self)
      return console.warn(`--> ${selector} <-- no existe en el documento...`);

    try {
      const opts = {
        method: method,
      };
      // ----------------------------template----------------------------
      const res = await fetch(`./components/${template}`, opts);
      const html = await res.text();

      // ----------------------api---------------------------
      const resApi = await fetch(api);
      const dataJson = await resApi.json();

      const _html = dataJson.map((d) => {
        html.replace(/{{(.*?)}}/g, (_, key) => d[key.trim()] ?? "");
      }).join('');

      self.insertAdjacentHTML("beforeend", _html);

      // Usar Diffing en lugar de insertAdjacentHTML
      // const virtualDOM = new DOMParser().parseFromString(
      //   _html,
      //   "text/html"
      // ).body;
      // Diffing(self, virtualDOM);

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
      const _html = html.replace(
        /{{(.*?)}}/g,
        (_, key) => api[key.trim()] ?? ""
      );

      // Usar Diffing en lugar de insertAdjacentHTML
      document.body.insertAdjacentHTML("beforeend", _html);
    }
  };
}
// exportacion global
window.Component = Component;
