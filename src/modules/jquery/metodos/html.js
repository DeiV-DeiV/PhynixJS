// src/modules/jquery/metodos/template.js

import { validate } from "../../validate/validate.js";
import { getDataArray } from "../../../helpers/getDataArray.js";
import { deepValue } from "../../../helpers/deepValue.js";
import { Diffing } from "../../Component/Diffing/Diffing.js";

export function html(
  template,
  { method = "GET", data = null, limit = 15 } = {}
) {
  (async () => {
    try {
      // Obtener plantilla
      const text =
        typeof template === "string" && template.endsWith(".template")
          ? await (await fetch(template)).text()
          : template;

      validate({ template: text });

      // Obtener datos
      const json =
        typeof data === "string" && data.endsWith(".json")
          ? await (await fetch(data, { method })).json()
          : data;

      const arrayData = getDataArray(json);
      const limitData = limit ? arrayData.slice(0, limit) : arrayData;

      // Reemplazar variables
      const parts = text.split(/{{\s*(.*?)\s*}}/g);
      let finalHTML = "";

      for (const item of limitData) {
        for (let i = 0; i < parts.length; i++) {
          finalHTML +=
            i % 2 === 0
              ? parts[i] // text plane
              : deepValue(parts[i], item); // placeholders profundos
        }
      }

      for (const el of this) {
        if (limit <= 15) {
          el.insertAdjacentHTML("beforeend", finalHTML);
        } else {
          Diffing(el, finalHTML);
        }
      }
      return this;
    } catch (xx) {
      console.error("Error al cargar template:", xx);
    }
  })();

}
