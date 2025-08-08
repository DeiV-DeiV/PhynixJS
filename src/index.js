// src/index.js

import { $, $$, x } from "./core.js";
import { evGlobales } from "./eventsGlobals.js";

$,$$,x

// Exportacion metodosGlobales |metodo y global|

export const On = (ev, handler = {}) => evGlobales(ev, handler);
window.On = On;

export const Click = (handlers = {}) => evGlobales("click", handlers);
window.Click = Click;

export const Input = (handlers = {}) => evGlobales("input", handlers);
window.Input = Input;

export const Drag = (handlers = {}) => evGlobales("mousedown", handlers);
window.Drag = Drag;

export const Shortcut = (handlers = {}) => evGlobales("keydown", handlers);
window.Shortcut = Shortcut;
