// src/metodos/globales/listenerHistory.js

export let listenerRegistry  = {}; // agregando eventos globales

export function listenerHistory(ev, handlers) {
  const listeners = listenerRegistry[ev] ||= {}

  Object.assign(listeners , handlers);
  return listeners 
}

console.log(listenerRegistry)