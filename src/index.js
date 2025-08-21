// src/index.js

import { Component } from "./component.js";
import { $, $$, Click, Input } from "./core.js";
import { validate } from "./helpers/validaciones.js";
import { x } from "./helpers/x.js";
import { Drag } from "./metodosGlobales/Drag.js";
import { Drop } from "./metodosGlobales/Drop.js";
import { On } from "./metodosGlobales/On.js";
import { Shortcut } from "./metodosGlobales/Shortcut.js";

$, $$, x, On, Click, Input, Drag, Shortcut, Drop, Component, validate;

export default $;
