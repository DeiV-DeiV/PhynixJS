// metodos/val.js

export function val(val) {
  for (const el of this) {
    if(val === undefined) return el.value
    el.value = val;
  }

  return this;
}
