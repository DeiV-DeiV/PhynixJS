import { statusError } from "../helpers/statusError.js";
import { httpOpts } from "./httpOpts.js";

export async function Rest({ method, path, fn, data }) {

  try {
    const res = await fetch(path, httpOpts[method.toUpperCase()](data));
    const contentType = res.headers.get("content-type");


    if(!res.ok) return statusError(res)

    if (!path.endsWith(".json") || !contentType.includes("application/json")) {
    throw new Error(`Rest solo acepta JSON. Recibido: ${contentType}`);

    }
    const json = await res.json();
    return fn ? fn(json) : json;
    
  } catch (xx) {
    console.error(xx)
  }
}

window.Rest = Rest
