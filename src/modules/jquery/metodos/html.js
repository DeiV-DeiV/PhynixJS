// src/modules/jquery/metodos/template.js

import { deepValue } from "../../../helpers/deepValue.js";
import { getDataArray } from "../../../helpers/getDataArray.js";
import { path } from "../../../helpers/path.js";
import { Diffing } from "../../Diffing/Diffing.js";
import { validate } from "../../validate/Validate.js";



export function html(
  template,
  { method = "GET", data = null, limit = 15 } = {}
) {
  if (template.trim().length == 0) for (const el of this) return el.innerHTML;

  return (async () => {
    try {
      // Obtener plantilla
      const text = template.endsWith(".html")
        ? await (await fetch(path(template))).text()
        : template;

     

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
          
        Validate('html',{html:finalHTML})

      for (const el of this) {
        if (limit <= 15) {
          el.insertAdjacentHTML("beforeend", finalHTML);
        } else {
          Diffing(el, finalHTML);
        }
      }

      return this;
    } catch (xx) {
      console.error("Error al cargar metodo .html :", xx);
    }
  })();
}
