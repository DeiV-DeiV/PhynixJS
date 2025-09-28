import { statusError } from "../../helpers/statusError.js";
import { httpOpts } from "./httpOpts.js";

export async function request( method, path, data, fn ) {
  try {
    const res = await fetch(path, httpOpts[method.toUpperCase()](data));
    const contentType = res.headers.get("content-type");

    if (!res.ok) return statusError(res);

    if (!contentType.includes("application/json")) {
      throw new Error(`Solo acepta JSON. Recibido: ${contentType}`);
    }
    const json = await res.json();
    return fn ? fn(json) : json;
    
  } catch (xx) {
    throw xx
  }
}