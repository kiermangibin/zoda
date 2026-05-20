// ZODA cart drawer — open/close + AJAX add to cart via /cart/add.js + /cart.js
(() => {
  const drawer = document.querySelector('[data-zoda-cart-drawer]');
  if (!drawer) return;

  const open = () => { drawer.dataset.open = 'true'; drawer.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; };
  const close = () => { drawer.dataset.open = 'false'; drawer.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; };

  document.addEventListener('click', (e) => {
    const t = e.target;
    if (!(t instanceof Element)) return;
    if (t.closest('[data-zoda-cart-open]')) { e.preventDefault(); open(); }
    if (t.closest('[data-zoda-cart-close]')) { e.preventDefault(); close(); }
  });

  const refreshDrawer = async () => {
    try {
      const res = await fetch('/?section_id=zoda-cart-drawer-fragment', { headers: { Accept: 'text/html' } });
      if (res.ok) {
        const html = await res.text();
        const next = new DOMParser().parseFromString(html, 'text/html').querySelector('[data-zoda-cart-drawer]');
        if (next) drawer.replaceWith(next);
      }
    } catch {}
    // Always update the badge from /cart.js — works even if section render fails
    try {
      const cartRes = await fetch('/cart.js', { headers: { Accept: 'application/json' } });
      const cart = await cartRes.json();
      document.querySelectorAll('[data-zoda-cart-count]').forEach((el) => {
        el.textContent = String(cart.item_count);
        el.style.display = cart.item_count > 0 ? '' : 'none';
      });
    } catch {}
  };

  document.addEventListener('click', async (e) => {
    const t = e.target;
    if (!(t instanceof Element)) return;
    const btn = t.closest('[data-zoda-quick-add]');
    if (!btn) return;
    e.preventDefault();
    const id = btn.getAttribute('data-variant-id');
    if (!id) return;
    btn.disabled = true;
    try {
      await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ items: [{ id: Number(id), quantity: 1 }] }),
      });
      await refreshDrawer();
      open();
    } finally {
      btn.disabled = false;
    }
  });

  // Quantity + remove inside the drawer (delegated; works after re-render)
  document.addEventListener('click', async (e) => {
    const t = e.target;
    if (!(t instanceof Element)) return;
    const qty = t.closest('[data-cart-qty]');
    const rem = t.closest('[data-cart-remove]');
    if (!qty && !rem) return;
    e.preventDefault();
    const key = (qty || rem).getAttribute('data-key');
    if (!key) return;
    const line = drawer.querySelector(`[data-cart-line="${CSS.escape(key)}"]`);
    let nextQty = 0;
    if (qty) {
      const cur = Number(line?.querySelector('span[style*="min-width"]')?.textContent || '1');
      nextQty = Math.max(0, cur + (qty.getAttribute('data-cart-qty') === '+1' ? 1 : -1));
    }
    await fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ id: key, quantity: nextQty }),
    });
    await refreshDrawer();
  });
})();
