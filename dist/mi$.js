var mi$ = (function (exports) {
  'use strict';

  //ajax.js

  async function get(template) {
    if (!template || typeof template !== "string") {
      console.error("❌ mi$.html(): Ruta inválida.");
      return this;
    }
    try {
      const res = await fetch(`./components${template}.html`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await res.text();
      this._forEach((el) => (el.innerHTML += html));
    } catch (error) {
      console.error("❌ mi$.html(): Falló la carga del componente:", error);
    }
    return this;
  }

  async function post(template, body = {}) {
    if (!template || typeof template !== "string") {
      console.error("❌ mi$.html(): Ruta inválida.");
      return this;
    }

    try {
      const opts = Object.freeze({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const res = await fetch(`./components${template}.html`, opts);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await res.text();
      this._forEach((el) => (el.innerHTML += html));
    } catch (error) {
      console.error("❌ mi$.html(): Falló la carga del componente:", error);
    }
    return this;
  }

  // dom.js


  const metodos = Object.freeze({
    _forEach(callback) {
      for (let i = 0; i < this.length; i++) {
        callback(this[i], i);
      }
      return this;
    },

    on(ev, callback) {
      this._forEach((ele) => ele.addEventListener(ev, callback));
      return this;
    },

    css(style) {
      this._forEach((ele) => Object.assign(ele.style, style));
      return this;
    },

    get,
    post,
  });

  // core.js
  // consume menos memoria, mi punto es ese


  const mi$ = (selector) => {
    if (typeof selector === "function") {
      document.addEventListener("DOMContentLoaded", selector);
      return;
    }

    if (typeof selector === "string") {
      const elements = Array.from(document.querySelectorAll(selector));

      {
        // evita usar proxy
        for (const key of Object.keys(metodos)) {
          Object.defineProperty(elements, key, {
            value: metodos[key],
            writable: false,
            configurable: false,
            enumerable: false,
          });
        }
      }

      // Previene agregar nuevas propiedades
      Object.freeze(elements);
      // Object.freeze(Persona.prototype);

      return elements;
    }

    return [];
  };

  // index.js

  const $ = (selector) => mi$(selector);
  window.$ = (selector) => mi$(selector);

  exports.$ = $;

  return exports;

})({});
//# sourceMappingURL=mi$.js.map
