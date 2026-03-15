// metodos/val.js

export function val(val) {
  
  for(let i = 0; i < this.length;i++){
    let el = this[i]
    val === undefined ? el.value : el.value = parseFloat(val)
  }

  return this;
}
