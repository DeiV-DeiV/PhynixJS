// dom.js

import { _forEach } from "./metodos/_forEach.js";
import { css } from "./metodos/css.js";
import { toggleClass } from "./metodos/toggleClass.js";
import { drag } from "./metodos/drag.js";
import { get } from "./metodos/get.js";
import { post } from "./metodos/post.js";
import { on } from "./metodos/on.js";

// metodos globales
import { Click, Input } from "./metodos/globales/Click.js";
import { Drag } from "./metodos/globales/Drag.js";
import { On } from "./metodos/globales/On.js";

Click
Input
Drag
On

export const metodos = (el) => {
  const api = Object.freeze({
    _forEach,

    off(ev, callback) {
      for (let el of this) el.removeEventListener(ev, callback);
      return this;
    },

    toggleClass,
    css,
    drag,
    on,
    get,
    post,
    html(html) {
      for (let el of this) el.innerHTML = html;
      return this;
    },

    animate(animate) {
      for (let el of this) requestAnimationFrame(() => animate(el));
      return this;
    },

    addClass(classname) {
      for (let el of this) el.classList.add(classname);
      return this;
    },

    removeClass(classname) {
      for (let el of this) el.classList.remove(classname);
      return this;
    },

    containsClass(classname) {
      for (let el of this) el.classList.contains(classname);
      return this;
    },

    hide() {
      for (let el of this) el.style.display = "none";
      return this;
    },
  });

  return api;
};
