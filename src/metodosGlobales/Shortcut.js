

import { listenerRegistry } from "./listenerHistory.js";

import { modsMap } from "../helpers/modsMap.js";

export function Shortcut(e) {
  const handlers = listenerRegistry.keydown;
  if (!handlers) console.log(`falta agregar....`);

  for (const [keypress, handler] of Object.entries(handlers)) {
    const partes = keypress.toLowerCase().split("+");
    if (partes.length < 2 || partes.length > 4) continue;

    const keyChar = partes.pop();
    const modifiers = partes;

    const allModsMatch = modifiers.every(
      (mod) => modsMap[mod] && e[modsMap[mod]]
    );

    const keyMatch = e.key.toLowerCase() === keyChar;

    if (allModsMatch && keyMatch) {
      handler.call($(e.target), e);
    }
  }
}
