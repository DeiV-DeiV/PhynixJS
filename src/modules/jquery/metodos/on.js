// metodos/on.js


export function on(ev, callback) {
  const els = this
  document.body.addEventListener(ev, function(e){
    for (const el of els) {
      const target = e.target.closest(el.tagName)
      if(target) callback.call(target, e)
      
    }

  })
  return this;
}


