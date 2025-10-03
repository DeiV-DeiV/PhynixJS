// src/modules/jquery/metodos/template.js

import { Diffing } from "../../Component/Diffing/Diffing.js";
import { validate } from "../../validate/validate.js";

export function html(template, { method, data = null, limit = 15 } = {}) {
  if (typeof template === 'string' && template.endsWith(".template")) {
    (async () => {
      try {
        // Obtener plantilla
        const res = await fetch(template);
        const text = await res.text();
        validate({ template: text });

        // Obtener datos
        const json =
          typeof data === "string" && data.endsWith(".json")
            ? await (await fetch(data, { method })).json()
            : data;

        // Reemplazar variables
        const parts = text.split(/{{\s*(.*?)\s*}}/g);
        let finaltemplate = "";
        for (let i = 0; i < parts.length; i++) {
          finaltemplate += i % 2 === 0 ? parts[i] : json[parts[i]] ?? "";
        }

        for (const el of this) {
          if (limit <= 15) {
            el.insertAdjacenttemplate("beforeend", finaltemplate);
          } else {
            Diffing(el, finaltemplate);
          }
        }
      } catch (xx) {
        console.error("Error al cargar template:", xx);
      }
    })();
  }

  if (typeof template === "string") {
    validate({ template });
    for (let el of this) el.insertAdjacenttemplate("beforeend", template);
  }

  return this;
}
