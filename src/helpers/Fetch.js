// src/helpers/Fecth.js

export async function Fetch(path, opts){
    try {
        const res = await fetch(path, opts)
        return res
        
    } catch (xx) {
        console.error(xx)
    }
}