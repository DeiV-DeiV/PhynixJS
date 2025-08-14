// src/metodos/append.js

import { validaciones } from "../helpers/validaciones.js";

export function append(html) {

  validaciones.append(html)

  for (const el of this) {
    el.insertAdjacentHTML("beforeend", html);
  }
  return this;
}
