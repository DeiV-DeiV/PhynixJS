// src/modules/validate/validate.js

import { Component } from "../Component/Component.js";
import { validator } from "./validator.js";

export function validate(args = {}) {
  let errorList = []; // acumulador de errores

  for (const [key, { fn, msg }] of Object.entries(validator)) {
    const value = args[key];

    if (!fn(value)) {
      errorList.push({ msg, value: JSON.stringify(value ?? " ") });
    }
  }

  if (errorList.length > 0) {
    document.querySelector(".validate")?.remove();

    const errorHTML = errorList
      .map(({ msg, value }) => `<li><strong>${msg}:</strong> ${value}</li>`)
      .join("");

    Component({
      template: `
        <div class="validate glass">
          <ul class="formValidate">
            ${errorHTML}
          </ul>
        </div>
      `,
      style: "./src/validate/validate.css",
    })();
    return;
  }
}

window.Validate = validate;
