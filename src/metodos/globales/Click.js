// metodos/globales/Click.js

import { $ } from "../../core";
import { listenerHistory, listenerRegistry } from "./listenerHistory";

// funcion independiente
export function evGlobales(ev, handlers) {
  // esto permite validar eventos
  const eventsPermitidos = new Set(["click", "input"]);
  if (!eventsPermitidos.has(ev)) return;

  //Agrega al historial de delegacion de eventos
  listenerHistory(ev, handlers);

  document.body.addEventListener(ev, function (e) {
    for (const [selector, fn] of Object.entries(listenerRegistry[ev])) {
      const target = e.target.closest(selector);
      if (target) {
        fn.call($([target]), e);
      }
    }
  });
}

// Exportacion global y modulo
export const Click = (window.Click = (handlers) =>
  evGlobales("click", handlers));
export const Input = (window.Input = (handlers) =>
  evGlobales("input", handlers));

// ejemplos de prueba

Click({
  ".btn": function (e) {
    console.log("button cliqueado");
  },
});
