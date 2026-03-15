// src/modules/jquery/metodos/remove.js

export function remove(val) {
  for(let i =0;i<this.length;i++){
    let el = this[i]
    !val ? el.remove():el.classList.remove(val)
  }
  
  return this;
}
