// src/modules/jquery/metodos/js.js

export function js(script) {
  if (typeof script === 'string' && script.endsWith(".js")) {
    const ruta = script;
    if (!document.querySelector(`script[src="${script}"]`)) {
      const js = document.createElement("script");
      js.src = ruta;
      js.type = "module";
      document.body.appendChild(js);
    }
  }
  return this
}
