// src/metodosGlobales/eventsGlobals.js

import { $ } from "../core.js";

import { metodosGlobales } from "./metodosGlobales.js";
import {
  eventosRegistrados,
  listenerHistory,
  listenerRegistry,
} from "./listenerHistory.js";


// metodos globales
export function evGlobales(ev, handlers) {
  // Agrega al historial de delegacion de eventos
  listenerHistory(ev, handlers);

  // para cualquier tipo de evento
  // Registrar listener global una sola vez
  if (!eventosRegistrados.has(ev)) {
    const listener = metodosGlobales[ev]
      ? function (e) {
          metodosGlobales[ev](e);
        }
      : function (e) {
          for (const [selector, fn] of Object.entries(listenerRegistry[ev])) {
            const target = e.target.closest(selector);
            if (target) {
              fn.call($(target), e);
            }
          }
        };

    document.body.addEventListener(ev, listener);
    eventosRegistrados.add(ev);
  }
}
