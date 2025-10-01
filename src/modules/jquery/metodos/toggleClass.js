// src/metodos/toggleClass.js
import { validate } from "../../validate/validate.js";



export function toggleClass(classname) {
  validate({string:classname})
  const clase = classname.trim().split(/\s+/);
  this._forEach((el) => {
    for (let cls of clase) el.classList.toggle(cls);
  });
  return this;
}
