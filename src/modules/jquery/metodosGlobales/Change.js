//Change.js

import { On } from "./On.js";


export const Change = (obj = {})=> On('Change',obj)
window.Change = Change