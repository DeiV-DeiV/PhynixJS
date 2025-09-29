// src/modules/jquery/metodos/html.js

export function html(html) {
  if (html.endsWith(".html")) {
    return (async () => {
      const res = await fetch(html);
      const text = await res.text();
      for (const el of this) el.insertAdjacentHTML("beforeend", text);
      return this;
    })();
  } else {
    for (let el of this) el.insertAdjacentHTML("beforeend", html);
    return this;
  }
}
