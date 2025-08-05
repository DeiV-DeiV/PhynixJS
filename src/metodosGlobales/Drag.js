// metodosGlobales/Drag.js

import { listenerRegistry } from "./listenerHistory.js";



export function Drag(e) {
  const handlers = listenerRegistry.mousedown;

  for (const [selectorParent, selectorChild] of Object.entries(handlers)) {
    const parent = e.target.closest(selectorParent);
    if (parent) {
      const child = e.target.closest(selectorChild);
      if (!parent || !child) return;

      let offsetX = 0,
        offsetY = 0,
        posX = 0,
        posY = 0;

      child.style.cursor = "grabbing";
      child.classList.toggle('select')

      offsetX = e.clientX - posX;
      offsetY = e.clientY - posY;

      // rectngulos completos
      const parentRect = parent.getBoundingClientRect();
      const childRect = child.getBoundingClientRect();

      const onMouseMove = (e) => {
        posX = e.clientX - offsetX;
        posY = e.clientY - offsetY;

        //(ancho y alto) de padre e hijo
        const rectX = parentRect.width - childRect.width;
        const rectY = parentRect.height - childRect.height;

        // Limitar del contenedor
        const limitX = Math.max(0, Math.min(posX, rectX));
        const limitY = Math.max(0, Math.min(posY, rectY));

        child.style.transform = `translate(${limitX}px, ${limitY}px)`;
      };

      const onMouseUp = (e) => {
        child.style.cursor = "grab";
        child.classList.toggle('select')

        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    }
  }
}
