// metodos/drag.js

const dragState = new WeakMap();

export function drag() {
  for (let el of this) {
    if (dragState.has(el)) continue; // Evita agregar más de una vez

    const state = {
      isDraggable: false,
      offsetX: 0,
      offsetY: 0,
      currentX: 0,
      currentY: 0,
    };

    dragState.set(el, state);

    el.style.cursor = "grab";

    const UpdatePos = () => {
      el.style.transform = `translate(${state.currentX}px, ${state.currentY}px)`;
    };

    const onMouseMove = function (e) {
      if (!state.isDraggable) return;
      state.currentX = e.clientX - state.offsetX;
      state.currentY = e.clientY - state.offsetY;
      UpdatePos();
    };

    const onMouseUp = function () {
      state.isDraggable = false;
      el.style.cursor = "grab";

      window.removeEventListener("mousemove", onMouseMove);
      // window.removeEventListener("mouseup", onMouseUp);
    };

    const onMouseDown = function (e) {
      state.isDraggable = true;
      state.offsetX = e.clientX - state.currentX;
      state.offsetY = e.clientY - state.currentY;
      el.style.cursor = "grabbing";
      e.preventDefault();

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp, {once:true});
    };

    el.addEventListener("mousedown", onMouseDown);
  }

  return this;
}