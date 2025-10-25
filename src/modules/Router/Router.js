const routerHistory = new Map()

export function Router(routers){

    for(const path in routers){
        routerHistory.set(path, routers[path])
    }

    const currentPath = window.location.pathname
    if(routerHistory.has(currentPath)){
        routerHistory.get(currentPath)()
    }else{
        console.log('ruta no encontrada:', currentPath)
    }

    
}

Router({
  "/": "./pages/home.html",
  "/about": "./pages/about.html"
});

