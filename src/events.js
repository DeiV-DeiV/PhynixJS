on(ev, selectorHandlers, useDelegation = true) {
  this._forEach(el => {
    const wrapped = function(e) {
      if (!useDelegation || typeof selectorHandlers !== 'object') {
        // Caso normal sin delegación o sin objeto: llamar handler directo
        if (typeof selectorHandlers === 'function') {
          selectorHandlers.call(mi$(e.currentTarget), e);
        }
        return;
      }

      // Delegación con objeto: buscar selector que matchee e.target o ancestro
      for (const selector in selectorHandlers) {
        const target = e.target.closest(selector);
        if (target && el.contains(target)) {
          selectorHandlers[selector].call(mi$(target), e);
          break; // Ejecutar solo el primero que coincida
        }
      }
    };

    const attach = () => {
      el.addEventListener(ev, wrapped, { once: true });

      const cleanup = () => {
        el.removeEventListener(ev, wrapped);
        window.removeEventListener('mouseup', cleanup);
      };

      window.addEventListener('mouseup', cleanup);
    };

    el.addEventListener('mousedown', attach);
  });

  return this;
}
