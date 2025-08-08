// src/metodosGlobales/metodosGlobales.js

import { Drag } from "./metodosGlobales/Drag.js";
import { Shortcut } from "./metodosGlobales/Shortcut.js";


// metodos globales
export const metodosGlobales = Object.freeze({
  mousedown: Drag,
  keydown: Shortcut,

  // ... agregas mas eventos (...,slider,etc)
});
