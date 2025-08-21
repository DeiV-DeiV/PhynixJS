// src/metodos/append.js

import { validate } from "../helpers/validaciones";



export function append(html) {

  validate({str:html})

  for (const el of this) {
    el.insertAdjacentHTML("beforeend", html);
  }
  return this;
}
