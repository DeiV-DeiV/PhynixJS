// metodos/get.js

export async function get(template) {
 
  try {
    const res = await fetch(`./components${template}.html`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    this._forEach((el) => (el.innerHTML += html));
  } catch (error) {
    console.error("$.html(): Falló la carga del componente:", error);
  }
  return this;
}