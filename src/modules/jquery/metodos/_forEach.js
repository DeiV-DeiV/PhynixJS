// metodos/_forEach.js

export function _forEach(callback) {
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i);
  }
  return this;
}
