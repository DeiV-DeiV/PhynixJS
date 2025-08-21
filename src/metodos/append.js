// src/metodos/append.js

vali

export function append(html) {

  validaciones.append(html)

  for (const el of this) {
    el.insertAdjacentHTML("beforeend", html);
  }
  return this;
}
