const _x = Object.freeze({
  red: (t) => `\x1b[31m${t}\x1b[0m`,
  green: (t) => `\x1b[32m${t}\x1b[0m`,
  yellow: (t) => `\x1b[33m${t}\x1b[0m`,
  blue: (t) => `\x1b[34m${t}\x1b[0m`,
  magenta: (t) => `\x1b[35m${t}\x1b[0m`,
  cyan: (t) => `\x1b[36m${t}\x1b[0m`,
  white: (t) => `\x1b[37m${t}\x1b[0m`,
  bold: (t) => `\x1b[1m${t}\x1b[0m`,
  underline: (t) => `\x1b[4m${t}\x1b[0m`,
  bgRed: (t) => `\x1b[41m${t}\x1b[0m`,
  bgGreen: (t) => `\x1b[42m${t}\x1b[0m`,
  bgYellow: (t) => `\x1b[43m${t}\x1b[0m`,
  bgCyan: (t) => `\x1b[46m${t}\x1b[0m`,
})

// Función auxiliar para formatear cualquier valor
function formatValue(v) {
  if (typeof v === "object") {
    return JSON.stringify(v, null, 2);
  }
  return String(v);
}

export function x (...args){

    const argumentos = args.map(formatValue).join(' ')

    const wrapper = {
        arg: argumentos,
        log(){
            console.log(this.arg)
            return this
        }
    }
    for(const [key,fn] of Object.entries(_x)){
        wrapper[key] = function(){
            this.arg = fn(this.arg)
            return this
        }
    }

    return wrapper
}

window.x = x
