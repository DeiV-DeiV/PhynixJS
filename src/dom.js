// dom.js

import { get, post } from "./ajax";

export const metodos = Object.freeze({
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
    this._forEach(el=>el.removeEventListener(ev,callback))
    return this
  },

  css(style) {
    this._forEach((ele) => Object.assign(ele.style, style));
    return this;
  },
  html(html){
    this._forEach(el => el.innerHTML = html)  
    return this
  },

  animate(animate = {}){
    this._forEach(el=>el)
  },

  get,
  post,
});
