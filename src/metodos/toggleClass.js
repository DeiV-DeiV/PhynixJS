// metodos/toggleClass.js
export function toggleClass(classname) {
  const clase = classname.trim().split(/\s+/);
  this._forEach((el) => {
    for (let cls of clase) el.classList.toggle(cls);
  });
  return this;
}
