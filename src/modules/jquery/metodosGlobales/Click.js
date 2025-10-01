import { On } from "./On";

export const Click = (obj = {}) => On("click", obj);
window.Click = Click;
