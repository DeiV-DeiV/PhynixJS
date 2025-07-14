var $ = (function (exports) {
  'use strict';

  //ajax.js

  function get() {
    return async function (template) {
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
    };
  }

  function post() {
    return async function (template,body = {}) {
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
    };
  }

  // dom.js


  const metodos = Object.freeze({
    _forEach() {
      return function (callback) {
        for (let i = 0; i < this.length; i++) {
          callback(this[i], i);
        }
        return this;
      };
    },

    on() {
      return function (ev, callback) {
        this._forEach((ele) => ele.addEventListener(ev, callback));
        return this;
      };
    },

    css() {
      return function(style){
        this._forEach(ele => Object.assign(ele.style,style));
        return this
      }
    },

    get,
    post
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
        return new Proxy(elements, {
          get(target, prop) {
            if (prop in target) return target[prop];
            if (prop in metodos) {
              const fn = metodos[prop]();
              Object.defineProperty(target, prop, {
                value: fn,
                writable: false,
                configurable: false,
                enumerable: false,
              });

              return fn;
            }

            return undefined;
          },
        });
      }
    }

    return [];
  };

  // ejemplos practicos
  $(".ctn-box")
    .on("click", (e) => {
    })
    .css({
      color: "orange",
    });

  $(".box").on("click", (e) => {
  });

  // index.js

  const $$1 = (selector) => mi$(selector);
  window.$ = (selector) => mi$(selector);

  exports.$ = $$1;

  return exports;

})({});
//# sourceMappingURL=mi$.js.map
