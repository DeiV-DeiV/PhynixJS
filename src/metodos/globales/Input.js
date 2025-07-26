// metodos/globales/Input.js

import { mi$ } from "../../core"

function $Input (handler){
    
    if(typeof handler !== 'object' || handler === null) {
        console.error("handler debe ser un objeto con pares selector: función")
        return
    }

    for(const [selector, fn] of Object.entries(handler)){
        document.body.addEventListener('input', function(e){
            const target = e.target.closest(selector)
            if(target){
                fn.call(mi$(target), e)
            }
        })
    }
}

export const Input = (handler)=>$Input(handler)
window.Input = (handler)=>$Input(handler)