// src/Diffing/getKey.js


const keySymbol = Symbol("diffingKey");
let nodeContador = 0
export function getKey(node){
    if(node.dataset.key) return node.dataset.key;
    if(!node[keySymbol]){
        node[keySymbol] = `${node.nodeName}-${nodeContador++}`
    }
    return node[keySymbol]
}