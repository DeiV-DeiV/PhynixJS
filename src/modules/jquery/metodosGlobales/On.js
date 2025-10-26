// src/metodosGlobales/On.js


export function On(ev = "", obj = {}) {
  const entries = Object.entries(obj);
  document.body.addEventListener(ev, function (e) {
    for (let i = 0; i < entries.length; i++) {
      const [selector, callback] = entries[i];
      const target = e.target.closest(selector);
      if (target) callback.call(target, e);
    }
  });
}

window.On = On;
