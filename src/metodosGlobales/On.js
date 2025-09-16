// src/metodosGlobales/On.js


const eventosRegistrados = new Set();
const mapeoEvents = {}; // { evento: { selector: callback } }

export function On(ev, obj) {
  

  const eventos = (mapeoEvents[ev] ||= {});
  Object.assign(eventos, obj);

  if (!eventosRegistrados.has(ev)) {
    eventosRegistrados.add(ev);

    document.body.addEventListener(ev, function (e) {
      for (const [selector, callback] of Object.entries(eventos)) {
        const target = e.target.closest(selector);
        if (target) {
          callback.call(target, e);
        }
      }
    });
  }
}
window.On = On;


