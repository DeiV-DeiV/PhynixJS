// effects.js

export function drag() {
  this._forEach((el) => {
    el.style.cursor = "grab";
    el.style.position = "relative";
    let isDraggable = false;
    let offsetX = 0,
      offsetY = 0;
    let currentX = 0,
      currentY = 0;

    const UpdatePos = () => {
      el.style.transform = `translate(${currentX}px, ${currentY}px)`;
    };

    const onMouseDown = function (e) {
      isDraggable = true;
      offsetX = e.clientX - currentX;
      offsetY = e.clientY - currentY;
      el.style.cursor = "grabbing";
      e.preventDefault();
    };
    const onMouseMove = function (e) {
        if(!isDraggable) return
        currentX = e.clientX -se
      UpdatePos();
    };
    const onMouseUp = function () {};

    el.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  });
  return this;
}
