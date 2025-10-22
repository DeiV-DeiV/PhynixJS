import { Validate } from "../../validate/Validate.js";
import { On } from "./On.js";

export const Click = (obj = {}) => {
  if(Validate("Click", { object: obj })){
      On("click", obj);
  }
};

window.Click = Click;
