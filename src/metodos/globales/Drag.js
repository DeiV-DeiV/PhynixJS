// metodos/globales/Drag.js

import { $ } from "../../core.js";

const dragState = new WeakMap();

window.Drag = function (obj) {

  for (const [parentSelector, chieldSelector] of Object.entries(obj)) {

    const parents = $(parentSelector);

    for(const parent of parents){
    parent.addEventListener("mousedown", (e) => {
      const target = e.target.closest(chieldSelector);
      if(!target)return

      if (!dragState.has(target)) {
        dragState.set(target, {
          isDraggable: false,
          offsetX: 0,
          offsetY: 0,
          currentX: 0,
          currentY: 0,
        });
        target.style.cursor = "grab";
        // el.style.position = "relative"; // <-- Necesario para moverse correctamente
      
        if (getComputedStyle(target).position === "static") {
            target.style.position = "relative";
          }

      }

      const state = dragState.get(target);
      state.isDraggable = true;
      state.offsetX = e.clientX - state.currentX;
      state.offsetY = e.clientY - state.currentY;

      target.style.cursor = "grabbing";

      const onMouseMove = (e) => {
        if (!state.isDraggable) return;

        let newX = e.clientX - state.offsetX;
        let newY = e.clientY - state.offsetY;

        // Límites
          const parentRect = parent.getBoundingClientRect();
          const targetRect = target.getBoundingClientRect();

          const minX = 0;
          const minY = 0;
          const maxX = parentRect.width - targetRect.width;
          const maxY = parentRect.height - targetRect.height;

          state.currentX = Math.max(minX, Math.min(maxX, newX));
          state.currentY = Math.max(minY, Math.min(maxY, newY));

        target.style.transform = `translate(${state.currentX}px, ${state.currentY}px)`;
      };

      const onMouseUp = () => {
        state.isDraggable = false;

        target.style.cursor = "grab";
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
      e.preventDefault();
    });
  }

  }
}

export { Drag }
