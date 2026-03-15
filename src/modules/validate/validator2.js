import { error } from "../../helpers/error.js";


const validatorType = Object.freeze({
  isString(str) {
    if(str === null || str === undefined)error('parametro vacio')
    if (typeof str !== "string") error("no es string");
    if (str.trim() === "") error("string vacio");
  },
  isNumber(n) {
    if(n === null || n === undefined)error('parametro vacio')
    if (typeof n !== "number") error("no es number");
  },
  isObject(o) {
    if (typeof o !== "object" || o === null || Array.isArray(o)) error("no es Object");
  },
  isArray(a) {
    if (!a || !Array.isArray(a)) error("no es Array");
  },
});
export const { isString, isNumber, isObject } = validatorType;

const obj = (list, type) => {
  isObject(list); //esperando estrictamente Object
  let errs = []
  for (const [key, value] of Object.entries(list)) {
    try {
        type(value)
    } catch (err) {
        errs.push(`${key}: ${value} --> ${err.message}`)
    }
  };
  if(errs.length) error(errs.join('\n'))
};

export const validator = Object.freeze({
  string(val) {
    typeof val !== 'object' ?isString(val):obj(val,isString) ;
  },
  number(val) {
    typeof val !== 'object' ?isNumber(val) :obj(val,isNumber) ;
  },
});



