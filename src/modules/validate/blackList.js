export const backList = {
  attrs: [
    // eventos de mouse
    'onclick', 'ondblclick', 'onmousedown', 'onmouseup', 'onmouseover', 'onmousemove', 'onmouseout', 'onmouseenter', 'onmouseleave',

    // eventos de teclado
    'onkeydown', 'onkeypress', 'onkeyup',

    // eventos de formulario
    'onfocus', 'onblur', 'onchange', 'onsubmit', 'onreset', 'oninput', 'onselect',

    // eventos de ventana/documento
    'onload', 'onunload', 'onresize', 'onscroll', 'onerror', 'onhashchange', 'onpopstate', 'onbeforeunload',

    // multimedia
    'onabort', 'oncanplay', 'oncanplaythrough', 'ondurationchange', 'onemptied', 'onended', 'onerror', 'onloadeddata', 'onloadedmetadata', 'onpause', 'onplay', 'onplaying', 'onprogress', 'onratechange', 'onseeked', 'onseeking', 'onstalled', 'onsuspend', 'ontimeupdate', 'onvolumechange', 'onwaiting',

    // touch/móvil
    'ontouchstart', 'ontouchend', 'ontouchmove', 'ontouchcancel', 'ongesturestart', 'ongesturechange', 'ongestureend',

    // pointer
    'onpointerdown', 'onpointerup', 'onpointermove', 'onpointerover', 'onpointerout', 'onpointerenter', 'onpointerleave', 'onpointercancel',

    // drag & drop
    'ondrag', 'ondragend', 'ondragenter', 'ondragleave', 'ondragover', 'ondragstart', 'ondrop',

    // clipboard
    'oncopy', 'oncut', 'onpaste',

    // media errors
    'onerror',

    // animation & transition
    'onanimationstart', 'onanimationend', 'onanimationiteration', 'ontransitionend'
  ],
  tags: [
    'script',        // ejecución directa de JS
    'iframe',        // puede cargar contenido externo malicioso
    'object',        // objetos activos
    'embed',         // flash/legacy
    'applet',        // Java antiguo
    'link',          // hojas de estilo externas peligrosas si no se filtra
    'meta',          // refresh, redirect, charset puede ser usado maliciosamente
    'base',          // cambia base URL
    'form',          // si se permite enviar datos a terceros sin control
    'frame', 'frameset', // viejo HTML
    'svg',           // puede contener vectores con eventos XSS (opcional, depende del uso)
    'math',          // MathML con vectores XSS (opcional)
    'style'          // inline CSS puede tener expressions en CSS antiguos
  ]
};
