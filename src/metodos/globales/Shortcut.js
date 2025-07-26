// metodos/globales/Keydown.js

import { $ } from "../../core.js";

const modsMap = {
  ctrl: "ctrlKey",
  alt: "altKey",
  shift: "shiftKey",
  meta: "metaKey",
};

let keydownHandlers = [];
let listenerAdded = false;

window.Shortcut = (arrObj = []) => {

  keydownHandlers = keydownHandlers.concat(arrObj);

  if (!listenerAdded) {
    document.body.addEventListener("keydown", function (e) {
      for (const obj of keydownHandlers) {
        const { keypress, ...handler } = obj;
        
        const parts = keypress.toLowerCase().split("+");
        if(parts.length < 2 || parts.length > 4) continue

        const keyChar = parts.pop()
        const modifiers = parts

        const allModsMatch = modifiers.every((mod)=> modsMap[mod] && e[modsMap[mod]] === true)
        
        const keyMatch = e.key.toLowerCase() === keyChar

        if (allModsMatch && keyMatch) {
          for (const [selector, fn] of Object.entries(handler)) {
            fn.call($(selector), e);
          }
        }
      }
    });
    listenerAdded = true;
  }
};

export { Shortcut}


// ejemplos de prueba

Shortcut({
  {
    'ctrl+g+r': function(e){
      console.log($('.btn').toggle('ocultar'))
    }
  }
})