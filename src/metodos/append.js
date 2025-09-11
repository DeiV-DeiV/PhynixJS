// src/metodos/append.js

import { validate } from "../validate/validate.js";


export function append(html) {
  validate({ string: html });

  for (const el of this) {
    el.insertAdjacentHTML("beforeend", html);
  }
  return this;
}
