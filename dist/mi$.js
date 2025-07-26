let mi$ = (function (exports) {
  "use strict";

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

  var ayax = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    get: get,
    post: post,
  });

  // _____________________________

  var effects = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    drag: drag,
  });

  // dom.js

  const metodos = Object.freeze({
    _forEach(callback) {
      for (let i = 0; i < this.length; i++) {
        callback(this[i], i);
      }
      return this;
    },

    on(ev, handler = {}) {
      for (let el of this) {
        if (typeof handler === "object") {
          el.addEventListener(ev, function (e) {
            for (const [selector, fn] of Object.entries(handler)) {
              console.log(selector);
              const target = e.target.closest(selector); // '.' o '#'

              if (target && el.contains(target)) {
                fn.call(mi$(target), e);
              }
            }
          });
        } else if (typeof handler === "function") {
          el.addEventListener(
            ev,
            function (e) {
              handler.call(mi$(e.currentTarget), e);
            },
            { once: true }
          );
        }
      }
      return this;
    },

    off(ev, callback) {
      this._forEach((el) => el.removeEventListener(ev, callback));
      return this;
    },

    css(style = {}) {
      this._forEach((el) => {
        for (let [prop, val] of Object.entries(style)) {
          el.style[prop] = val;
        }
      });
      return this;
    },

    html(html) {
      this._forEach((el) => (el.innerHTML = html));
      return this;
    },

    animate(animate) {
      this._forEach((el) => requestAnimationFrame(() => animate(el)));
      return this;
    },

    addClass(classname) {
      this._forEach((el) => el.classList.add(classname));
      return this;
    },

    removeClass(classname) {
      for (let el of this) el.classList.remove(classname);
      // this._forEach((el) => el.classList.remove(classname));
      return this;
    },

    toggleClass(classname) {
      const clase = classname.trim().split(/\s+/);
      this._forEach((el) => {
        for (let cls of clase) el.classList.toggle(cls);
      });
      return this;
    },

    ...ayax,
    ...effects,
  });
  // --------------------------------------------------------------------

  // effects.js

  const dragState = new WeakMap();
  const registeredContainers = new WeakSet();
  const MOVE_LISTENERS_ADDED = "__global_drag_listeners_added__";

  let isDragging = false;
  let draggedElement = null;
  let currentContainer = null;

  function clamp(val, min, max) {
    return Math.max(min, Math.min(val, max));
  }

  function addGlobalListeners() {
    if (window[MOVE_LISTENERS_ADDED]) return;
    window[MOVE_LISTENERS_ADDED] = true;

    const moveHandler = (clientX, clientY) => {
      if (!isDragging || !draggedElement || !currentContainer) return;

      const state = dragState.get(draggedElement);
      if (!state) return;

      const containerRect = currentContainer.getBoundingClientRect();
      const elemRect = draggedElement.getBoundingClientRect();

      const maxX = containerRect.width - elemRect.width;
      const maxY = containerRect.height - elemRect.height;

      const x = clamp(clientX - state.offsetX, 0, maxX);
      const y = clamp(clientY - state.offsetY, 0, maxY);

      state.x = x;
      state.y = y;

      draggedElement.style.transform = `translate(${x}px, ${y}px)`;
    };

    window.addEventListener("mousemove", (e) => {
      moveHandler(e.clientX, e.clientY);
    });

    window.addEventListener(
      "touchmove",
      (e) => {
        if (e.touches.length > 0) {
          const touch = e.touches[0];
          moveHandler(touch.clientX, touch.clientY);
        }
      },
      { passive: false }
    );

    const stopDrag = () => {
      if (!isDragging || !draggedElement) return;

      const state = dragState.get(draggedElement);
      if (state) state.dragging = false;

      draggedElement.style.cursor = "grab";
      isDragging = false;
      draggedElement = null;
      currentContainer = null;
    };

    window.addEventListener("mouseup", stopDrag);
    window.addEventListener("touchend", stopDrag);
  }

  function drag(container, selector) {
    if (!(container instanceof Element)) return;
    if (registeredContainers.has(container)) return;

    registeredContainers.add(container);
    addGlobalListeners();

    const startDrag = (target, clientX, clientY) => {
      if (!dragState.has(target)) {
        dragState.set(target, {
          dragging: false,
          offsetX: 0,
          offsetY: 0,
          x: 0,
          y: 0,
        });

        target.style.position = "relative";
        target.style.cursor = "grab";
      }

      const state = dragState.get(target);
      state.dragging = true;
      state.offsetX = clientX - state.x;
      state.offsetY = clientY - state.y;

      target.style.cursor = "grabbing";
      isDragging = true;
      draggedElement = target;
      currentContainer = container;
    };

    container.addEventListener("mousedown", (e) => {
      const target = e.target.closest(selector);
      if (!target || !container.contains(target)) return;
      startDrag(target, e.clientX, e.clientY);
      e.preventDefault();
    });

    container.addEventListener(
      "touchstart",
      (e) => {
        const touch = e.touches[0];
        const target = e.target.closest(selector);
        if (!target || !container.contains(target)) return;
        startDrag(target, touch.clientX, touch.clientY);
        e.preventDefault();
      },
      { passive: false }
    );
  }

  function resetDragPosition(element) {
    if (!dragState.has(element)) return;
    const state = dragState.get(element);
    state.x = 0;
    state.y = 0;
    element.style.transform = "translate(0px, 0px)";
  }

  // ---------------------------------------------------------------------
  // core.js
  // consume menos memoria, mi punto es ese
  const DEV_MODO = true; // usar FALSE para produccion

  const aplicarMetodos = (el) => {
    // evita usar proxy
    for (const nameMetodo of Object.keys(metodos)) {
      Object.defineProperty(el, nameMetodo, {
        value: metodos[nameMetodo],
        writable: false,
        configurable: false,
        enumerable: false,
      });
    }

    // Evita agregar nuevas propiedades
    return el;
    // return Object.freeze(nodoArray);
    // Object.freeze(Persona.prototype);
  };

  const usarProxyProtegido = (nodoArray) => {
    return new Proxy(nodoArray, {
      get(target, prop) {
        if (prop in target) return target[prop];
        if (prop in metodos) {
          const fn = metodos[prop];
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

      set(target, prop, value) {
        if (prop in metodos)
          throw new Error(`No puedes sobreescribir el metodo ${prop}`);
        target[prop] = value;
        return true;
      },
    });
  };

  const mi$ = (selector) => {
    if (typeof selector === "function") {
      document.addEventListener("DOMContentLoaded", selector);
      return;
    } else if (typeof selector === "string") {
      const elements = Array.from(document.querySelectorAll(selector));
      return DEV_MODO ? usarProxyProtegido(elements) : aplicarMetodos(elements);
    } else if (selector instanceof Element) {
      const elements = [selector];
      return DEV_MODO ? usarProxyProtegido(elements) : aplicarMetodos(elements);
    }

    return [];
  };

  const $keydown = ({ keypress, handler }) => {
    for(const selector of handler){
      console.log(selector)
    }
    
    
    const element = mi$(selector);
    const [modKey, keyChar] = keypress.toLowerCase().split("+");
    const modKeyProp = modsMap[modKey];

    document.addEventListener("keydown", (e) => {
      const matchKey = e[modKeyProp] && e.key.toLowerCase() === keyChar;

      if (matchKey) {
        element._forEach((el) => fn.call(mi$(el)));
      }
    });
  };

  // index.js

  const $ = (selector) => mi$(selector);
  const keydown = ({ keypress, handler }) => $keydown({ keypress, handler });

  window.$ = (selector) => mi$(selector);
  window.keydown = ({ keypress, handler }) => $keydown({ keypress, handler });

  exports.$ = $;

  return exports;
})({});
//# sourceMappingURL=mi$.js.map
