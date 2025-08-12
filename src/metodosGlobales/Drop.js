// src/metodosGlobales/Drop.js

import { listenerHistory } from "./listenerHistory";

export function Drop(objs, { ext = ["png", "jpg", "jpeg"] } = {}) {
  const extAll = ext.map((e) => e.toLowerCase());

  listenerHistory("drop",objs)

  document.body.addEventListener("dragover", (e) => {
    e.preventDefault(); // necesario para permitir drop
  });

  document.body.addEventListener("drop", function (e) {
    e.preventDefault();

    const files = [...e.dataTransfer.files];

    // 1️⃣ Si no hay archivos, es drag interno → ignorar
    if (files.length === 0) return;

    const extInvalida = files.filter((file) => {
      const extenxiones = file.name.split(".").pop().toLowerCase();
      return !extAll.includes(extenxiones);
    });
    if (extInvalida.length > 0)
      return console.error(`Extensiones permitidas: --> ${ext.join(" ")} <--`);

    // -----------------------------------------------
    for (const [selector, fn] of Object.entries(objs)) {
      const target = e.target.closest(selector);
      if (target) {
        fn.call(target, e);
      }
    }
  });
}

window.Drop = Drop;
