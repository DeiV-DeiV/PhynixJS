import { $, $$ } from "./modules/jquery/jquery.js";

import { Drag } from "./modules/jquery/metodosGlobales/Drag.js";
import { Drop } from "./modules/jquery/metodosGlobales/Drop.js";
import { On } from "./modules/jquery/metodosGlobales/On.js";
import { Shortcut } from "./modules/jquery/metodosGlobales/Shortcut.js";
import { Click } from "./modules/jquery/metodosGlobales/Click.js";
import { Input } from "./modules/jquery/metodosGlobales/Input.js";


import { ajax } from "./modules/ajax/ajax.js";
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
  ajax,
  
  Component,
};

export default $;




