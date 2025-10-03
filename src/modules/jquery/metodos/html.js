// src/modules/jquery/metodos/html.js

import { Diffing } from "../../Component/Diffing/Diffing.js";
import { validate } from "../../validate/validate.js";

export function html(html, { method, data = null, limit = 15 } = {}) {
  if (typeof html === 'string' && html.endsWith(".html")) {
    (async () => {
      try {
        // Obtener plantilla
        const res = await fetch(html);
        const text = await res.text();
        validate({ html: text });

        // Obtener datos
        const json =
          typeof data === "string" && data.endsWith(".json")
            ? await (await fetch(data, { method })).json()
            : data;

        // Reemplazar variables
        const parts = text.split(/{{\s*(.*?)\s*}}/g);
        let finalHtml = "";
        for (let i = 0; i < parts.length; i++) {
          finalHtml += i % 2 === 0 ? parts[i] : json[parts[i]] ?? "";
        }

        for (const el of this) {
          if (limit <= 15) {
            el.insertAdjacentHTML("beforeend", finalHtml);
          } else {
            Diffing(el, finalHtml);
          }
        }
      } catch (xx) {
        console.error("Error al cargar HTML:", xx);
      }
    })();
  }

  if (typeof html === "string") {
    validate({ html });
    for (let el of this) el.insertAdjacentHTML("beforeend", html);
  }

  return this;
}
