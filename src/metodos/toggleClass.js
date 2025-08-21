// src/metodos/toggleClass.js

import { validate } from "../helpers/validaciones.js";

export function toggleClass(classname) {
  validate({str:classname})
  const clase = classname.trim().split(/\s+/);
  this._forEach((el) => {
    for (let cls of clase) el.classList.toggle(cls);
  });
  return this;
}
