import { validate } from "../validate/validate.js"

export const InmutableMethod = (value) => Object.freeze({
  get(path){
    validate({string:path})
  },
  set(path, pathNew){
    validate({string:[path, pathNew]})
   
  }
})