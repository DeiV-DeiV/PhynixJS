// metodos/globales/Slider.js

import { $ } from "../jquery.js"


export function Slider(selector,{}){
    const ctn = $(selector)
    const w = ctn.clientWidth 
    const h = ctn.clientHeight 
    const imgs = ctn.querySelectorAll('img')
    const totalImgs = imgs.length
    const radius  = w/2
    const step = 360 / totalImgs

    for(let i = 0; i<totalImgs; i++){
        const angle = step * i
        imgs[i].style.position = 'absolute';
        imgs[i].style.transform= `
        rotateY(${angle}deg)
      translateZ(${radius}px)
        `
    }
    
}

window.Slider = Slider


//ejemplo de uso














//-------------------------------
// const allowdTags = [
//     'div','button'
// ]

// function _(tag, prop={}){
//     if(!allowdTags.includes(tag)) return console.log('Tag invalido...!!', `--> ${tag} <--`)
    
//     const el = document.createElement(tag)
//      const props = Object.getOwnPropertyNames(el)

//      for(const key of props){
//          return `
//          <label for="">${key}</label>
//             <input type="text" value="${el[key]}">
//          `

        

//      }

//      return el
// }

// _('div',{
    
//     class:'',
//     src:'',
//     id:''
//     // ...etc
// })