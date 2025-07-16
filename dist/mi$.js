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

  var ayax = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get: get,
    post: post
  });

  // effects.js

  function drag() {
    this._forEach((el) => {
      el.style.cursor = "grab";
      el.style.position = "relative";
      let isDraggable = false;
      let offsetX = 0,
        offsetY = 0;
      let currentX = 0,
        currentY = 0;

      const UpdatePos = () => {
        el.style.transform = `translate(${currentX}px, ${currentY}px)`;
      };

      const onMouseDown = function (e) {
        isDraggable = true;
        offsetX = e.clientX - currentX;
        offsetY = e.clientY - currentY;
        el.style.cursor = "grabbing";
        e.preventDefault();
      };
      const onMouseMove = function (e) {
        if (!isDraggable) return;
        currentX = e.clientX - offsetX;
        currentY = e.clientY - offsetY;
        UpdatePos();
      };
      const onMouseUp = function () {
        isDraggable = false;
        el.style.cursor = "grab";
      };

      el.addEventListener("mousedown", onMouseDown);
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    });
    return this;
  }

  var effects = /*#__PURE__*/Object.freeze({
    __proto__: null,
    drag: drag
  });

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

    off(ev,callback){
      this._forEach(el=>el.removeEventListener(ev,callback));
      return this
    },

    css(style = {}) {
      
      this._forEach((el) => {
        for(let [prop,val] of  Object.entries(style)){
          el.style[prop] = val;
        }
      });
      return this;
    },

    html(html){
      this._forEach(el => el.innerHTML = html);  
      return this
    },

    animate(animate){
      this._forEach(el=>requestAnimationFrame(()=>animate(el)));
      return this
    },

    addClass(classname){
      this._forEach(el=>el.classList.add(classname));
      return this
    },

    removeClass(classname){
      this._forEach(el=>el.classList.remove(classname));
      return this
    },

    toggleClass(classname){
      const clase = classname.trim().split(/\s+/);
      this._forEach(el=>{
        for(let cls of clase){
  el.classList.toggle(cls);
        }
        
      });
      return this
    },

    ...ayax,
    ...effects,
  });

  // core.js
  // consume menos memoria, mi punto es ese


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
    }

    if (typeof selector === "string") {
      const elements = Array.from(document.querySelectorAll(selector));
      
      return usarProxyProtegido(elements)
        ;
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
