// index.js
import { mi$ } from "./core.js";

export const $ = (selector) => mi$(selector);
window.$ = (selector) => mi$(selector)
//hola desde index.js otra vez