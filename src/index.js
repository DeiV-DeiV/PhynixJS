// index.js
import {mi$, $keydown} from "./core.js";

export const $ = (selector) => mi$(selector);
export const keydown = ({ selector, keypress, handle }) => $keydown({ selector, keypress, handle });

window.$ = (selector) => mi$(selector)
window.keydown = ({ selector, keypress, handle }) => $keydown({ selector, keypress, handle })
