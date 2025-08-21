// metodos/css.js

export function css(style = {}) {
  this._forEach((el) => {
    for (let [prop, val] of Object.entries(style)) {
      el.style[prop] = val;
    }
  });
  return this;
}
