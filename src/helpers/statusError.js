// src/helpers/statusError.js

import { Component } from "../modules/Component/Component.js";

export function statusData(res) {
  return Object.freeze({
    status: res.status,
    statusText: res.statusText,
    ok: res.ok,
    timestamp: Date.now(),
    contentType: res.headers.get("content-type"),
  });
}

export function statusError(res) {
  Component({
    template: "/error/404.html",
    style: "/error/404.css",
    data: statusData(res),
  });
}
