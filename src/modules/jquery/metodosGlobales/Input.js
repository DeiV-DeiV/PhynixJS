import { On } from "./On";

export const Input=(obj = {})=> On("input", obj);

window.Input = Input;
