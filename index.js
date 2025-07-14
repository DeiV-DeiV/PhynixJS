// index.js
import { mi$ } from "./core.js";

export const $ = (selector) => mi$(selector);
window.$ = mi$
