// src/metodos/append.js

export function append(html) {
  for (const el of this) {
    el.insertAdjacentHTML("beforeend", html);
  }
  return this;
}
