export function path(path){
    path.startsWith('./') || path.startsWith('/') || path.startsWith('http')
     ? path
     : `./components/${path}`
}