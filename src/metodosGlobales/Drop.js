// src/metodosGlobales/Drop.js

import { On } from "./On.js";

export function Drop(obj = {}, { ext = ["png", "jpg", "jpeg"] } = {}) {
  const extAll = ext.map((e) => e.toLowerCase());

  let select;

  On("dragstart", (e) => {
    select = e.target;
  });

  On("dragover", (e) => {
    e.preventDefault(); // necesario para permitir drop
  });

  On("dragenter", (e) => {
    console.log("drag enter");
    const target = e.target;
    if (target) e.preventDefault(); //evitar usar
  });

  On("drop", function (e) {
    e.preventDefault();

    const files = [...e.dataTransfer.files];

    const extInvalida = files.filter((file) => {
      const extenxiones = file.name.split(".").pop().toLowerCase();
      return !extAll.includes(extenxiones);
    });
    if (extInvalida.length > 0)
      return console.error(`Extensiones permitidas: --> ${ext.join(" ")} <--`);

    // -----------------------------------------------
    for (const [selector, fn] of Object.entries(obj)) {
      const target = e.target.closest(selector);
      if (target) {
        fn.call(target, e);
      }
    }
  });
}

window.Drop = Drop;
