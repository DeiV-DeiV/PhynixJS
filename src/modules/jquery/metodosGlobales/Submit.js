import { On } from "./On.js";

export const Submit = (obj = {}) => On("submit", obj);
window.Submit = Submit;
