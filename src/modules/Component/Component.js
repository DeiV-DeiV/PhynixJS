// src/component.js

import { Diffing } from "./Diffing/Diffing.js";

import { error } from "../../helpers/error.js"
import { formatError } from "../../helpers/formatError.js";

import { noRepeatFetch } from "./noRepeatFetch.js";
import { Template } from "./Template.js";
import { $ } from "../jquery/jquery.js";


export function Component({
  selector = "body",
  method = "GET",
  template = "",
  style = "",
  script = "",
  data = "",
  limits = 15,
  
}) {
  return async function () {
    const ctn = $(selector);
    if (!ctn) return await error(selector);

    try {
      // ----------------------------template----------------------------
      const html =  $(selector).html(template)
      console.log(html)
      // const html = await noRepeatFetch(template);
      const render = Template(html);

      // ----------------------data---------------------------

      const dataJson =
        typeof data === "string" ? await noRepeatFetch(data, method) : data;

      const renderHTML = render({
        data: dataJson,
        limits: limits,
      });

      //---------------- RENDER ------------------

      if (limits <= 15) {
        ctn.insertAdjacentHTML("beforeend", renderHTML);
      } else {
        Diffing(ctn, renderHTML);
      }

      // ------------ CSS y JS ------------

      if(style) ctn.css(style)
      if(script) ctn.js(script)

    } catch (xx) {
      return formatError(xx, { data, method });
    }
  };
}
// exportacion global
window.Component = Component;
