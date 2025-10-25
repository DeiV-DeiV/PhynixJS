// src/modules/validate/validate.js

import { validator } from "./validator.js";
import { $Validate } from "./validate.component.js";
import { errorList } from "../../helpers/globalState.js";


let validating = false;

export const Validate = (title, types = {}) => {
  if (!validator.string.fn(title) || !validator.object.fn(types)) return;
  if (validating) return;
  validating = true;
  const typesMap = new WeakSet();

  if (typesMap.has(types)) return;
  typesMap.add(types);

  if (!errorList[title]) errorList[title] = []; 

  const entries = Object.entries(types);

  for (let i = 0; i < entries.length; i++) {
    const [key, value] = entries[i];
    const rule = Object.freeze(validator[key]); // inmutabilidad cuando busca

    if (!rule) {
      errorList[title].push({
        value: key,
        msg: `Key ${key} no encontrado..!!`,
      });
      continue;
    }

    const { fn, msg } = rule;

    if (!fn(value)) {
      errorList[title].push({ title, value, msg });
    }
  }

  if (errorList[title].length > 0) {
    const existe = document.querySelector(".validate");
    if (existe) existe.remove();
    console.log(errorList);
    $Validate();

    validating = false;
  }

  validating = false;
};

window.Validate = Validate;
