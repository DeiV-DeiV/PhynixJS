// src/component.js


import { Diffing } from "../diffing.js";
import { createElement } from "../helpers/createElement.js";
import { error } from "../helpers/error.js";
import { formatError } from "../helpers/formatError.js";
// import { validate } from "../validate/validate.js";
import { noRepeatFetch } from "./noRepeatFetch.js";
import { Template } from "./Template.js";

export function Component({
  selector = "body",
  method = "GET",
  template = "",
  script = "",
  style = "",
  data = { url: "", limits: 15 },
  diffing = false,
}) {
  // validate({
  //   string: [selector, method, template, script, style],
  // });

  return async function () {
    const ctn = document.querySelector(selector);
    if (!ctn) await error(selector);
    
    try {
      // ----------------------------template----------------------------
      const html = await noRepeatFetch(template);
      const render = Template(html);

      // ----------------------data---------------------------

      const dataJson =
        typeof data.url === "string"
          ? await noRepeatFetch(data.url, method)
          : data.url;

      const renderHTML = render({
        data: dataJson,
        limits: data.limits,
      });

      //---------------- RENDER ------------------

      if (!diffing || data.limits <= 15) {
        ctn.insertAdjacentHTML("beforeend", renderHTML);
      } else {
        Diffing(ctn, renderHTML);
      }

      // ------------ CSS y JS ------------

      await createElement([style, script]);

      
    } catch (xx) {
      const errorData = formatError(xx, { data, method });
      if (!template.includes("/error/")) {
        Component({
          template: "/error/error.html",
          style: "/error/error.css",
          data: {
            url: errorData,
          },
        })();
        return;
      } else {
        console.error("Error de Component", xx);
      }
    }
  };
}
// exportacion global
window.Component = Component;
