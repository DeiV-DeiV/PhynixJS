import { statusError } from "../../helpers/statusError.js";


export async function noRepeatFetch(path, method) {
  try {
    if (typeof path === "string" && path.trim().startsWith("<")) return path;
    if (typeof path === "object") return path;

    const ext = path.split(".").pop().toLowerCase(); // html o json...etc
    const opts = Object.freeze({
      method: method,
    });

    const url =  path.trim().startsWith('./') ? path : `./components/${path}`
    const res = await fetch(url, opts);

    if (!res.ok) return statusError(res)

    const data = ext === "json" ? await res.json() : await res.text();

    return data;
  } catch (xx) {
    console.error(xx)
    // formatError(xx,{data,method})
  }
}
