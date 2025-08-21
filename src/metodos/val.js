// metodos/val.js

function val(val) {
 
    for (const el of this) {
      el.value = val;
    }
  
  return this;
}
