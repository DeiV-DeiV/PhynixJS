// src/modules/jquery/metodos/html.js

import { validate } from "../../validate/validate.js";

export function html(html) {
  if (html.endsWith(".html")) {
     (async () => {
      try {
        const res = await fetch(html);
        const text = await res.text();
        validate({ html: text });
        for (const el of this) el.insertAdjacentHTML("beforeend", text);
        return text
        
      } catch (xx) {
        console.error("Error al cargar HTML:", xx)
      }
    })()
  } else {
    validate({ html });
    for (let el of this) el.insertAdjacentHTML("beforeend", html);
    return html;
  }

  return this;
}
