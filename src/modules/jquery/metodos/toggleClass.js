// src/metodos/toggleClass.js
import { Validate } from "../../validate/Validate.js";



export function toggleClass(classname) {
  Validate('toggleClass',{string:classname})
  
  const clase = classname.trim().split(/\s+/);
  this._forEach((el) => {
    for (let cls of clase) el.classList.toggle(cls);
  });
  return this;
}
