// src/helpers/statusError.js

export function statusError(res) {
  return Object.freeze({
    status: res.status,
    statusText: res.statusText,
    ok: res.ok,
    timestamp: Date.now(),
    contentType: res.headers.get("content-type"),
  })
}
