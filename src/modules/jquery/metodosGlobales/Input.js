import { On } from "./On.js";

export const Input = (obj = {})=> On("input", obj);

window.Input = Input;
