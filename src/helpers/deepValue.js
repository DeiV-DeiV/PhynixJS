// src/helpers/deepValue.js

export function deepValue (path, data){
let val = data;
  for (const key of path.split(".")) {
    val = val?.[key];
    if (val == null) break;
  }
  return val ?? "";
}