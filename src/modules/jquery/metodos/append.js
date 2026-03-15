// src/metodos/append.js

export function append(html) {
  //Optimizacion
  for(let i = 0; i < this.length;i++){
    this[i].insertAdjacentHTML('beforeend', html)
  }

  return this;
}
