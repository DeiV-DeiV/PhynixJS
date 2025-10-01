// metodosGlobales/Drag.js

import { On } from "./On.js";

export function Drag(obj = {}) {
  On("mousedown", function (e) {
    for (const [selectorParent, selectorChild] of Object.entries(obj)) {
      const parent = e.target.closest(selectorParent);
      if (parent) {
        const child = e.target.closest(selectorChild);
        if (!parent || !child) return;
        // rectngulos completos

        let offsetX = e.clientX - child.getBoundingClientRect().left;
        let offsetY = e.clientY - child.getBoundingClientRect().top;

        child.style.cursor = "grabbing";
        child.classList.toggle("select");

        const onMouseMove = (e) => {
          const parentRect = parent.getBoundingClientRect();
          const childRect = child.getBoundingClientRect();
          
          let posX = e.clientX - parentRect.left - offsetX;
          let posY = e.clientY - parentRect.top - offsetY;

          // Limitar del contenedor
          const limitX = Math.max(
            0,
            Math.min(posX, parentRect.width - childRect.width)
          );
          const limitY = Math.max(
            0,
            Math.min(posY, parentRect.height - childRect.height)
          );

          child.style.transform = `translate(${limitX}px, ${limitY}px)`;
        };

        const onMouseUp = (e) => {
          child.style.cursor = "grab";
          child.classList.toggle("select"); //Elmina 'select'

          document.body.removeEventListener("mousemove", onMouseMove);
          document.body.removeEventListener("mouseup", onMouseUp);
        };

        document.body.addEventListener("mousemove", onMouseMove);
        document.body.addEventListener("mouseup", onMouseUp);
      }
    }
  });
}

window.Drag = Drag;
