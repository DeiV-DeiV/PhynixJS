// dom.js

import { get, post } from "./ajax";

export const metodos = Object.freeze({
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
      this._forEach(ele => Object.assign(ele.style,style))
      return this
    }
  },

  get,
  post
});


