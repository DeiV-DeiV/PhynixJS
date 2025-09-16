import { Component } from "../../Component/Component.js";
import { statusError } from "../../helpers/statusError.js";

export const error404 = Component({
  template: "/error/404.html",
  data: statusError(res),
  
});
