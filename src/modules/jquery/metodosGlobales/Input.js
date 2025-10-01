import { On } from "./On";

export function Input(obj = {}) {
  On("input", obj);
}
window.Input = Input;
