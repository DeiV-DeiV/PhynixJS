import { errorList } from "../../helpers/globalState.js";
import { Component } from "../Component/Component.js";


const template = `
<div class="validate glass">
    <ul class="formValidate">
        <h1>Error Validate:</h1>
        
        
    </ul>
</div>


`;


export const $Validate = Component({
    selector: ".formValidate",
    template:  "<li>{{title}} → {{msg}}: {{value}}</li>",
    style: "../../src/modules/validate/validate.css",
    data: [errorList],
})


