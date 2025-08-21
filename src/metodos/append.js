// src/metodos/append.js

import { validate } from "../helpers/validaciones";



export function append(html) {

  validaciones.append(html)

  for (const el of this) {
    el.insertAdjacentHTML("beforeend", html);
  }
  return this;
}
