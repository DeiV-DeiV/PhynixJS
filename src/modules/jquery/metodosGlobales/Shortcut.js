import { modsMap } from "../../../helpers/modsMap.js";
import { Validate } from "../../validate/Validate.js";
import { On } from "./On.js";

export function Shortcut(obj = {}) {
  // Validate('Shortcut',{object:obj})
console.log('Shortcut',obj)

  On("keydown", function (e) {
    for (const [selector, keypress] of Object.entries(obj)) {
      const partes = keypress.toLowerCase().split("+");
      if (partes.length < 2 || partes.length > 4) continue;

      const keyChar = partes.pop();
      const modifiers = partes;

      const allModsMatch = modifiers.every(
        (mod) => modsMap[mod] && e[modsMap[mod]]
      );

      const keyMatch = e.key.toLowerCase() === keyChar;

      if (allModsMatch && keyMatch) {
        document.querySelector(selector)
      }
    }
  });
}


window.Shortcut = Shortcut