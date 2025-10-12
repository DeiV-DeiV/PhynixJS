// src/modules/validate/validate.js

import { formValidate } from "../../components/validate/validate.component.js";
import { Component } from "../Component/Component.js";
import { validator } from "./validator.js";

export const errorMap = {
  Diffing: [],
  Login: [],
  Singin: [],
  Component: [],
}; // acumulador de errores

export const validate = (title = null, args = {}) => {
  const argsMap = new WeakSet();

  return (function _validate() {
    // recursividad controlada
    if (argsMap.has(args)) return;
    argsMap.add(args);

    errorMap[title] = [];

    const entries = Object.entries(args);

    for (let i = 0; i < entries.length; i++) {
      const [key, value] = entries[i];
      const rule = Object.freeze(validator[key]); // inmutabilidad cuando se nesecite

      if (!rule) throw new Error(`Key ${key} no existe..!!`);

      const { fn, msg } = rule;

      if (!fn(value)) {
        errorMap[title].push({ msg, value });
      }

      if (validator.object.fn(value)) {
        _validate(value); // recursividad
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
        style: "/validate/validate.css",
      })();

      Component({
        selector: ".formValidate",
        template: `<li>{{msg}}: {{value}}</li>`,
        data: errorMap[title],
      })();
    }
  })();
};

window.Validate = validate;

// ejemplo de uso

validate("Diffing", { node: "gg", string: 3 });
validate("login", { node: "gg", number: 12 });
