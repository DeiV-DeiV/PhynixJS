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

export function x (args){
    const wrapper = {
        args
    }
    for(const [key,fn] of Object.entries(_x)){
        wrapper[key] = function(){
            console.log(fn(this.args))
            return this
        }
    }

    return wrapper
}

window.x = x
