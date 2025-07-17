// dom.js

import * as ayax from "./ajax.js";
import { mi$ } from "./core.js";

import * as effects from "./effects.js";

export const metodos = Object.freeze({
  _forEach(callback) {
    for (let i = 0; i < this.length; i++) {
      callback(this[i], i);
    }
    return this;
  },

  on(ev, callback) {
    for (let el of this) el.addEventListener(ev, callback.call(mi$(el)));
    return this;
  },

  off(ev, callback) {
    for (let el of this) el.removeEventListener(ev, callback);
    return this;
  },

  css(style = {}) {
    this._forEach((el) => {
      for (let [prop, val] of Object.entries(style)) el.style[prop] = val;
    });
    return this;
  },

  html(html) {
    for (let el of this) el.innerHTML = html;
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

    return this;
  },

  toggleClass(classname) {
    const clase = classname.trim().split(/\s+/);
    this._forEach((el) => {
      for (let cls of clase) el.classList.toggle(cls);
    });
    return this;
  },

  hide(){
    this._forEach(el=>{el.style.display = 'none'})
    return this
  },

  ...ayax,
  ...effects,
});
