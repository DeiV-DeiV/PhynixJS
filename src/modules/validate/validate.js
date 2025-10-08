// src/modules/validate/validate.js

import { $formValidate } from "./validate.component.js";
import { validator } from "./validator.js";

export function validate(args = {}) {
  try {
    let errorList = []; // acumulador de errores

  for (const [key, value] of Object.entries(args)) {
    if (!validator[key]) throw new Error("Key Invalido");
    
    const { fn, msg } = validator[key];

    if (!fn(value)) {
      errorList.push({ msg, value: JSON.stringify(value ?? " ") });
    }
  }

 
    const exist = document.querySelector('.validate')
    if(exist)exist.remove()
  

  } catch (xx) {
    
    console.error('Error Validate:', (errorList.length > 0) ?$formValidate(errorList)(): xx)
  }


}

window.Validate = validate;
