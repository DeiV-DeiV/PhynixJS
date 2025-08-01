// src/index.js

import { evGlobales } from "./metodosGlobales/eventsGlobals.js";


// Exportacion metodos globales

export const On = (window.On = (ev, handler = {}) => evGlobales(ev, handler));

export const Click = (window.Click = (handlers = {}) =>
  evGlobales("click", handlers));

export const Input = (window.Input = (handlers = {}) =>
  evGlobales("input", handlers));

export const Drag = (window.Drag = (handlers = {}) => {
  evGlobales("mousedown", handlers);
});

export const Shortcut = (window.Shortcut = (handlers = {}) =>{
  
  evGlobales("keydown", handlers)
});