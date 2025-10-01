import { modsMap } from "../../../helpers/modsMap.js";
import { On } from "./On.js";

export function Shortcut(obj = {}) {
  On("keydown", function (e) {
    for (const [keypress, callback] of Object.entries(obj)) {
      const partes = keypress.toLowerCase().split("+");
      if (partes.length < 2 || partes.length > 4) continue;

      const keyChar = partes.pop();
      const modifiers = partes;

      const allModsMatch = modifiers.every(
        (mod) => modsMap[mod] && e[modsMap[mod]]
      );

      const keyMatch = e.key.toLowerCase() === keyChar;

      if (allModsMatch && keyMatch) {
        callback.call(e.target, e);
      }
    }
  });
}


window.Shortcut = Shortcut