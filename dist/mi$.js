var mi$ = (function (exports) {
  'use strict';

  // core.js
  // consume menos memoria, mi punto es ese


  const mi$ = (selector) => {
    if (typeof selector === "function") {
      document.addEventListener("DOMContentLoaded", selector);
      return;
    }

    if (typeof selector === "string") {
      const elements = Array.from(document.querySelectorAll(selector));

      return aplicarMetodosEstáticos(elements);
    }

    return [];
  };

  // index.js

  const $ = (selector) => mi$(selector);
  window.$ = (selector) => mi$(selector);

  exports.$ = $;

  return exports;

})({});
//# sourceMappingURL=mi$.js.map
