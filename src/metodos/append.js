// src/metodos/append.js

import { validate } from "../helpers/validaciones.js";

export function append(html) {
  validate({ string: html });

  for (const el of this) {
    el.insertAdjacentHTML("beforeend", html);
  }
  return this;
}
