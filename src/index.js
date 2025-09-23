import { $, $$, Click, Input } from "./core.js";

import { Drag } from "./metodosGlobales/Drag.js";
import { Drop } from "./metodosGlobales/Drop.js";
import { On } from "./metodosGlobales/On.js";
import { Shortcut } from "./metodosGlobales/Shortcut.js";

import { apiRest } from "./modules/apiRest/apiRest.js";
import { Component } from "./modules/Component/Component.js";
import { validate } from "./modules/validate/validate.js";

export {
  $$,
  Click,
  Input,
  validate,
  Drag,
  Drop,
  On,
  Shortcut,
  apiRest,
  Component,
};

export default $;
