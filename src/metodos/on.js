// metodos/on.js


export function on(ev, handler) {
  for (const el of this) {
    el.addEventListener(ev,handler)
  }
  return this;
}


