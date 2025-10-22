// src/modules/validate/validate.js

import { Component } from "../Component/Component.js";
import { validator } from "./validator.js";

export let errorList = {
  Diffing: [],
  Login: [],
  Singin: [],
  Component: [],
  On: [],
}; // acumulador de errores

let validating=false

export const Validate = (title, types = {}) => {
  if (typeof title !== "string" || typeof types !== "object") return;
  if(validating)return
  validating = true
  const typesMap = new WeakSet()
  
  function _Validate(obj) {
    
    if(typesMap.has(types)) return
    typesMap.add(types)
    
    if (!errorList[title]) errorList[title] = [];

    const entries = Object.entries(obj);

    for (let i = 0; i < entries.length; i++) {
      const [key, value] = entries[i];
      const rule = Object.freeze(validator[key]); // inmutabilidad cuando entrees

      if (!rule) {
        console.error(`Key ${key} no existe..!!`);
        continue
      }

      const { fn, msg } = rule;

      if (!fn(value)) {
        errorList[title].push({ title, msg, value });
      }

      
    }
  }

  _Validate(types);

  if (errorList[title].length > 0) {
    const existe = document.querySelector(".validate");
    if (existe) existe.remove();

    const template = ()=>{
      Component({
      template: `
               <div class="validate glass">
        <ul class="formValidate">
            <h1>Error Validate:</h1>
            
            
        </ul>
      </div>
              `,
      style: "../../src/components/validate/validate.css",
    })();

    Component({
      selector: ".formValidate",
      template: `<li>{{title}} → {{msg}}: {{value}}</li>`,
      data: errorList[title],
    })();
    }
    
    template()
    validating = false
  }

  validating = false
};

window.Validate = Validate;


