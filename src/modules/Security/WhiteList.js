export const whiteList = {
  allowed_tags: [
    // contenido básico
    'div', 'span', 'p', 'a', 'img', 'ul', 'ol', 'li', 'br', 'hr',
    'b', 'i', 'u', 'strong', 'em', 'small', 'mark', 'sub', 'sup',

    // títulos
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',

    // tablas
    'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td',

    // multimedia
    'picture', 'source', 'video', 'audio',

    // formularios simples (sin submit remoto)
    'form', 'label', 'input', 'textarea', 'button', 'select', 'option',

    // bloques semánticos
    'section', 'article', 'aside', 'header', 'footer', 'nav',

    // listas de descripción
    'dl', 'dt', 'dd',

    // inline safe
    'code', 'pre', 'blockquote', 'q', 'abbr', 'cite', 'time'
  ],

  allowed_attrs: [
    // globales
    'class', 'id', 'title', 'lang', 'dir', 'style',

    // enlaces
    'href', 'target', 'rel',

    // imágenes y multimedia
    'src', 'srcset', 'alt', 'width', 'height', 'loading', 'poster', 'controls',

    // tablas
    'colspan', 'rowspan', 'scope',

    // formularios
    'name', 'value', 'placeholder', 'type', 'checked', 'disabled', 'readonly',
    'selected', 'multiple', 'method', 'action', 'for', 'maxlength', 'min',
    'max', 'step',

    // aria (accesibilidad)
    'role', 'aria-label', 'aria-hidden', 'aria-describedby'
  ]
};