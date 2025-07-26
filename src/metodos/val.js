// metodos/val.js

function val(val) {
  if (val === undefined) {
    const el = this[0];
    return el ? el.value : undefined;
  } else {
    for (const el of this) {
      el.value = val;
    }
  }
  return this;
}
