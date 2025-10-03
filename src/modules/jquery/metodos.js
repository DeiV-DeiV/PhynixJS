// src/metodos.js

import { _forEach } from "./metodos/_forEach.js";
import { css } from "./metodos/css.js";
import { toggleClass } from "./metodos/toggleClass.js";
import { drag } from "./metodos/drag.js";
import { get } from "./metodos/get.js";
import { post } from "./metodos/post.js";
import { on } from "./metodos/on.js";
import { append } from "./metodos/append.js";

import { js } from "./metodos/js.js";
import { html } from "./metodos/html.js";



export const metodos = Object.freeze({
  _forEach,

  off(ev, callback) {
    for (let el of this) el.removeEventListener(ev, callback);
    return this;
  },

  toggleClass,
  append,
  drag,
  on,
  get,
  post,
  html,
  css,
  js,

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
    for (let el of this) {
      if (el.classList.contains(classname)) return true;
    }
    return this;
  },

  hide() {
    for (let el of this) el.style.display = "none";
    return this;
  },
  show() {
    for (let el of this) el.style.display = "";
    return this;
  },

  val(val) {
    if(!val) el.val
    for (let el of this) el.value = val;
    return this;
  },
});
