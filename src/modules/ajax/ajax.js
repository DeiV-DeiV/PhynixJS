import { request } from "./request.js";

export const ajax = Object.freeze({
  get: (path, fn) => request("GET", path, null,fn),
  post: (path, data, fn) => request("POST", path, data, fn),
  put: (path, data, fn) => request("PUT", path, data, fn),
  delete: (path, fn) => request("DELETE", path, null, fn),
})

window.ajax = ajax


