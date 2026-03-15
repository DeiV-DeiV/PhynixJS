// metodos/on.js


export function on(ev, callback) {
  const els = this
  document.body.addEventListener(ev, function(e){
    //Optimizacion
    for(let i = 0; i < els.length; i++){
      const target = e.target.closest(els[i])
      if(target) callback.call(target, e)
    }
    

  })
  return this;
}


