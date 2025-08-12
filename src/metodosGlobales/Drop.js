// src/metodosGlobales/Drop.js

export function Drop(objs, { ext = ["png", "jpg", "jpeg"] } = {}) {
  const extAll = ext.map((e) => e.toLowerCase());

  document.body.addEventListener("dragover", (e) => {
    e.preventDefault(); // necesario para permitir drop
  });

  document.body.addEventListener("drop", function (e) {
    e.preventDefault();

    const files = [...e.dataTransfer.files];
    files.forEach((file) => {
      const fileExt = file.name.split(".").pop().toLowerCase();

      if (!extAll.includes(fileExt))
        console.error(`Extensiones permitidas: --> ${ext} <--`);
    });

    for (const [selector, fn] of Object.entries(objs)) {
      const target = e.target.closest(selector);

      fn.call(target, e);
    }
  });
}

