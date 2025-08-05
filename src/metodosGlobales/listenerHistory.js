// src/metodosGlobales/listenerHistory.js

export let listenerRegistry  = {}; // agregando eventos globales

// Solo un listener por tipo de evento
export const eventosRegistrados = new Set();

// nombrar EventManager es mas claro

export function listenerHistory(ev, handlers) {
  const listeners = listenerRegistry[ev] ||= {}

  Object.assign(listeners , handlers);
  return listeners 
}


