// src/modules/validate/validate.js

//import { validator } from "./validator.js";


import { errorList } from "../../helpers/globalState.js";
import { isObject, isString, validator } from "./validator2.js";



export function Validate(funcName, obj){
    isString(funcName);isObject(obj)

    errorList[funcName] = []

    for(const key in obj){

        try{
            const fn = Object.freeze(validator[key]) //inmutabilidad
            if(!fn) error(`${key} no existe`)    
          fn(obj[key])
        }catch(e){
            errorList[funcName].push(`${e.message}`)
        }
    }

    if(errorList[funcName].length)  error(errorList[funcName])



}


window.Validate = Validate;
