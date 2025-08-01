// src/metodosGlobales/metodosGlobales.js

import { $, $$ } from "../core.js";
import { modsMap } from "../helpers/modsMap.js";
import { listenerRegistry } from "./listenerHistory.js";



// metodos globales
export const metodosGlobales = Object.freeze({
  //funcion interna de Drag
  mousedown: function (e) {
    const handlers = listenerRegistry.mousedown;

    for (const [selector, handler] of Object.entries(handlers)) {
      const target = e.target.closest(selector);
      if (target) {

        const onMouseMove = (e)=>{}
        const onMouseUp = (e)=>{}
        console.log(selector, handler);
        console.log(e.target);

        window.addEventListener('mousemove',onMouseMove)
        window.addEventListener('mouseup',onMouseUp)
      }
    }
  },
  //funcion interna de Shortcut
  keydown: function (e) {
    const handlers = listenerRegistry.keydown;
    if (!handlers) return;

    for (const [keypress, handler] of Object.entries(handlers)) {
      const partes = keypress.toLowerCase().split("+");
      if (partes.length < 2 || partes.length > 4) continue;

      const keyChar = partes.pop();
      const modifiers = partes;

      const allModsMatch = modifiers.every(
        (mod) => modsMap[mod] && e[modsMap[mod]]
      );

      const keyMatch = e.key.toLowerCase() === keyChar;

      if (allModsMatch && keyMatch) {
        handler.call($(e.target), e);
      }
    }
  },

  // ... agregas mas eventos (...,slider,etc)
});
