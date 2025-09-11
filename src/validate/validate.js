// src/validate/validaciones.js

import { Component } from "../Component/Component.js";
import { validator } from "./validator.js";

export function validate(args = {}) {
  let errorList = []; // acumulador en Array

  for (const [key, { fn, msg }] of Object.entries(validator)) {
    const value = args[key];
    const isInvalidate = fn(value);

    if (isInvalidate) {
      const safeValue = value ?? " ";
      errorList.push({ msg, value: isInvalidate ? JSON.stringify(value):safeValue });
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
