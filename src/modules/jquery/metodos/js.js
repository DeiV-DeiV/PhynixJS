// src/modules/jquery/metodos/js.js

import { path } from "../../../helpers/path.js";

export function js(script) {
  if (typeof script === "string" && script.endsWith(".js")) {
    const ruta = path(script)
    if (!document.querySelector(`script[src="${ruta}"]`)) {
      const js = document.createElement("script");
      js.src = ruta;
      js.type = "module";
      document.body.appendChild(js);
    }
  }
  return this;
}
