

const extsTypes = Object.freeze({
  css(path) {
    if(!path) return
    const ruta = path.trim().startsWith('./')?path:`./components/${path.replace(/^\/+/, "")}`

    if (!document.querySelector(`link[href="${ruta}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = ruta;
      document.head.appendChild(link);
    }
  },
  js(path) {
    console.log(path)
    if(!path) return

    const src = path.startsWith('./')?path:`./components/${path.replace(/^\/+/, "")}`

    if (!document.querySelector(`script[src="${src}"]`)) {
      const js = document.createElement("script");
      js.src = src;
      js.type = "module";
      document.body.appendChild(js);
    }
  },
});

export function createElement(paths) {
  const arr = (Array.isArray(paths) ? paths : [paths]).filter(Boolean);

  for (const path of arr) {
    const ext = path.split(".").pop().toLowerCase(); // css-js
    const parser = extsTypes[ext];
    parser ? parser(path) : console.warn("Extension invalida:", ext,"-->",path);
  }
}
