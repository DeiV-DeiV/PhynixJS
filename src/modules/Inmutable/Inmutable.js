// src/modules/Inmutable/Inmutable.js

import { validate } from "../validate/validate.js";
import { InmutableMethod } from "./InmutableMethod.js";
import { deepFreeze } from "./deepFreeze.js";

export function Inmutable(obj) {
  validate({object: obj})
  return InmutableMethod(deepFreeze(obj));
}

// ejemplos de uso

const data = Inmutable({
  users: Array.from({ length: 1000000 }, (_, i) => ({ id: i, name: "User" + i })),
  config: { theme: "light" }
});

const data2 = data
  .set("users.500000.name", "Maria")
  .set("config.theme", "dark");

console.log(data.get("users.500000.name"));  // "User500000"
console.log(data2.get("users.500000.name")); // "Maria"
console.log(data2.get("config.theme"));      // "dark"