// metodos/css.js

import { validate } from "../helpers/validaciones.js";

export function css(style = {}) {
  validate({object:style})
  this._forEach((el) => {
    for (let [prop, val] of Object.entries(style)) {
      el.style[prop] = val;
    }
  });
  return this;
}
