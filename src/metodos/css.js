// metodos/css.js

import { validate } from "../helpers/validaciones.js";

export function css(style = {}) {
  this._forEach((el) => {
    for (let [prop, val] of Object.entries(style)) {
      validate({str:[prop,val]})
      el.style[prop] = val;
    }
  });
  return this;
}
