// metodos/globales/Click.js

import { $ } from "../../core";

export let EventHistory = {}; // agregando eventos globales

export function addEventsHistory(ev, handlers) {
  const listEvents = EventHistory[ev] ||= {}

  Object.assign(listEvents, handlers);
  return listEvents
}


// funcion independiente
export function evGlobales(ev, handlers) {
  
  // esto permite validar eventos
  const eventsPermitidos= new Set(['click','input'])
  if(!eventsPermitidos.has(ev)) return

  //Agrega al historial de delegacion de eventos
  addEventsHistory(ev, handlers);

  document.body.addEventListener(ev, function (e) {
    for (const [selector, fn] of Object.entries(EventHistory[ev])) {
      const target = e.target.closest(selector);
      if (target) {
        fn.call($([target]), e);
      
      }
    }
  });
};





window.Click = (handlers) => evGlobales('click', handlers);
window.Input = (handlers) => evGlobales('input', handlers);



// Exportacion como modulo

export { Click, Input };


// ejemplos de prueba

Click({
  '.btn': function(e){
    console.log('button cliqueado')
  }
})

