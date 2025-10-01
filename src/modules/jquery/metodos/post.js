// metodos/post.js

export async function post(template, body = {}) {
 

  try {
    const opts = Object.freeze({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const res = await fetch(`./components${template}.html`, opts);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    this._forEach((el) => (el.innerHTML += html));
  } catch (error) {
    console.error("$.html(): Falló la carga del componente:", error);
  }
  return this;
}