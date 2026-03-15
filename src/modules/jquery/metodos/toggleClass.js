// src/metodos/toggleClass.js


export function toggleClass(classname) {
  
  
  for (let i = 0; i < this.length; i++) {
    const el = this[i]
    if(classname === undefined){
      el.hidden = !el.hidden;
    }else{
      const clases = classname.trim().split(/\s+/);
      for (let t = 0; t < clases.length; t++) {
      el.classList.toggle(clases[t]);
      }

    }
  }

  return this;
}
