import { aplicarMetodos } from "../../core/aplicarMetodos.js";
import { error } from "../../helpers/error.js";


export function $$(s) {
  if (typeof s === "function") {
    document.addEventListener("DOMContentLoaded", s);
    return;
  }

  const ele =
    typeof s === "string"
      ? document.querySelectorAll(s)
      : s instanceof Element
      ? s
      : s instanceof NodeList || Array.isArray(s)
      ? s
      : error(s);

  if (!ele.length) error(s);

  return aplicarMetodos(ele);
}
window.$$ = $$;

export function $(s) {
  if (typeof s === "function") {
    document.readyState === "loading"
      ? document.addEventListener("DOMContentLoaded", s)
      : s();

    return;
  }

  const ele =
    typeof s === "string"
      ? document.querySelector(s)
      : s instanceof Element
      ? s
      : error(s);

  return aplicarMetodos([ele]);
}
window.$ = $;