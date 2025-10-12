export function path(path){
    return path.startsWith('./') || path.startsWith('/') || path.startsWith('http')
     ? path
     : `./components/${path}`
}