export function Diffing(nodeReal, nodeVirtual) {
  // validate({ string: [nodeReal, nodeVirtual] });
  if(!nodeReal && !nod)

  if (
    nodeReal.nodeType !== nodeVirtual.nodeType ||
    nodeReal.nodeName !== nodeVirtual.nodeName
  ) {
    nodeReal.replaceWith(nodeVirtual.cloneNode(true));
    return;
  }

  if (nodeReal.nodeType === Node.TEXT_NODE) {
    if (nodeReal.textContent !== nodeVirtual.textContent) {
      nodeReal.textContent = nodeVirtual.textContent;
    }
    return;
  }

  //2️⃣ Sincronizamos atributos
  const realAttrs = [...nodeReal.attributes];
  const virtualAttrs = [...nodeVirtual.attributes];

  // Añadimos o actualizamos atributos
  for (const attr of virtualAttrs) {
    if (nodeReal.getAttribute(attr.name) !== attr.value) {
      nodeReal.setAttribute(attr.name, attr.value);
    }
  }

  // Eliminamos atributos que ya no existen en virtual
  for (const attr of realAttrs) {
    if (!nodeVirtual.hasAttribute(attr.name)) {
      nodeReal.removeAttribute(attr.name);
    }
  }

  // 3️⃣ Sincronizar hijos
  const realChildren = [...nodeReal.childNodes];
  const virtualChildren = [...nodeVirtual.childNodes];
  const nodeTotal = Math.max(realChildren.length, virtualChildren.length);

  for (let i = 0; i < nodeTotal; i++) {
    if (!realChildren[i] && virtualChildren[i]) {
      // Agregamos nuevo nodo
      nodeReal.appendChild(virtualChildren[i].cloneNode(true));
    } else if (realChildren[i] && !virtualChildren[i]) {
      // Eliminamos nodo sobrante
      realChildren[i].remove();
      i--; // Ajuste por eliminación
    } else if (realChildren[i] && virtualChildren[i]) {
      // Recursivo para actualizar hijos
      Diffing(realChildren[i], virtualChildren[i]);
    }
  }
}

//ejemplos de uso
