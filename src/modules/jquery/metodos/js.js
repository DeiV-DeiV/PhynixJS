// src/modules/jquery/metodos/js.js

export function js(script) {
  if (typeof script === "string" && script.endsWith(".js")) {
    const ruta =
      script.startsWith("./") || script.startsWith("/") || script.startsWith("http")
        ? script
        : `./components/${script}`;

    if (!document.querySelector(`script[src="${ruta}"]`)) {
      const js = document.createElement("script");
      js.src = ruta;
      js.type = "module";
      document.body.appendChild(js);
    }
  }
  return this;
}
