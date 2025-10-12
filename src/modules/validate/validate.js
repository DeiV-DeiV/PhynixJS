// src/modules/validate/validate.js

import { Component } from "../Component/Component.js";
import { validator } from "./validator.js";

export const errorMap = {
  Diffing: [],
  Login: [],
  Singin: [],
  Component: [],
}; // acumulador de errores

export const Validate = (title = null, args = {}) => {
  const argsMap = new WeakSet();

  return (function _Validate() {
    // recursividad controlada
    if (argsMap.has(args)) return;
    argsMap.add(args);

    errorMap[title] = [];

    const entries = Object.entries(args);

    for (let i = 0; i < entries.length; i++) {
      const [key, value] = entries[i];
      const rule = Object.freeze(validator[key]); // inmutabilidad cuando entrees

      if (!rule) throw new Error(`Key ${key} no existe..!!`);

      const { fn, msg } = rule;

      if (!fn(value)) {
        errorMap[title].push({ title: errorMap[title], msg, value });
      }

      if (validator.object.fn(value)) {
        _Validate(value); // recursividad
      }
    }

    if (errorMap[title].length > 0) {
      const existe = document.querySelector(".validate");
      if (existe) existe.remove();

      Component({
        template: `
             <div class="validate glass">
      <ul class="formValidate">
          <h1>Error Validate:</h1>
          
          
      </ul>
    </div>
            `,
        style: "validate/validate.css",
      })();

      Component({
        selector: ".formValidate",
        template: `<li>{{title}} -> {{msg}}: {{value}}</li>`,
        data: errorMap[title],
      })();
    }
  })();
};

window.Validate = Validate;

