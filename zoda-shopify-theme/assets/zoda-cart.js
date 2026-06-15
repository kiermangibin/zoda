// ZODA cart drawer - open/close + AJAX add to cart via /cart/add.js + /cart.js
(() => {
  let drawer = document.querySelector("[data-zoda-cart-drawer]");
  if (!drawer) return;

  const open = () => {
    if (!drawer) return;
    drawer.dataset.open = "true";
    drawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    if (!drawer) return;
    drawer.dataset.open = "false";
    drawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    if (target.closest("[data-zoda-cart-open]")) {
      event.preventDefault();
      open();
    }

    if (target.closest("[data-zoda-cart-close]")) {
      event.preventDefault();
      close();
    }
  });

  const refreshDrawer = async () => {
    try {
      const response = await fetch("/?section_id=zoda-cart-drawer-fragment", {
        headers: { Accept: "text/html" },
      });

      if (response.ok) {
        const html = await response.text();
        const next = new DOMParser()
          .parseFromString(html, "text/html")
          .querySelector("[data-zoda-cart-drawer]");

        if (next && drawer) {
          drawer.replaceWith(next);
          drawer = next;
        }
      }
    } catch {}

    // Always update the badge from /cart.js - works even if section rendering fails.
    try {
      const cartResponse = await fetch("/cart.js", { headers: { Accept: "application/json" } });
      const cart = await cartResponse.json();

      document.querySelectorAll("[data-zoda-cart-count]").forEach((element) => {
        element.textContent = String(cart.item_count);
        element.style.display = cart.item_count > 0 ? "" : "none";
      });
    } catch {}
  };

  document.addEventListener("click", async (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const swatch = target.closest("[data-zoda-card-swatch]");
    if (swatch) {
      event.preventDefault();
      event.stopPropagation();

      const card = swatch.closest(".zoda-product-card");
      if (!card) return;

      card.querySelectorAll("[data-zoda-card-swatch]").forEach((button) => {
        button.classList.remove("is-active");
        button.setAttribute("aria-pressed", "false");
        button.querySelector(".zoda-product-card__swatch-check")?.remove();
      });

      swatch.classList.add("is-active");
      swatch.setAttribute("aria-pressed", "true");
      swatch.insertAdjacentHTML(
        "beforeend",
        '<svg class="zoda-product-card__swatch-check" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" /></svg>',
      );

      const imageUrl = swatch.getAttribute("data-image-url");
      const image = card.querySelector(".zoda-product-card__media img");
      if (imageUrl && image) {
        image.setAttribute("src", imageUrl);
        image.removeAttribute("srcset");
      }

      const color = swatch.getAttribute("data-color") || "";
      const sizePayload = swatch.getAttribute("data-size-payload") || "";
      const sizeMap = new Map(
        sizePayload
          .split("||")
          .map((entry) => entry.trim())
          .filter(Boolean)
          .map((entry) => {
            const [size, id, available] = entry.split("::");
            return [size, { id, available: available === "true" }];
          }),
      );

      card.querySelectorAll(".zoda-product-card__size").forEach((button) => {
        const size = button.textContent.trim();
        const data = sizeMap.get(size);
        const canAdd = Boolean(data?.id) && data.available;

        button.setAttribute("data-variant-id", data?.id || "");
        button.disabled = !canAdd;
        button.classList.toggle("is-unavailable", !canAdd);
        button.setAttribute(
          "aria-label",
          `Add ${card.getAttribute("aria-label") || "product"} - ${color} ${size} to cart`,
        );
      });

      return;
    }

    const button = target.closest("[data-zoda-quick-add]");
    if (!button) return;

    event.preventDefault();

    const id = button.getAttribute("data-variant-id");
    if (!id) return;

    button.disabled = true;

    try {
      await fetch("/cart/add.js", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ items: [{ id: Number(id), quantity: 1 }] }),
      });

      await refreshDrawer();
      open();
    } finally {
      button.disabled = false;
    }
  });

  document.addEventListener("click", async (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const quantityButton = target.closest("[data-cart-qty]");
    const removeButton = target.closest("[data-cart-remove]");
    if (!quantityButton && !removeButton) return;

    event.preventDefault();

    const control = quantityButton || removeButton;
    const key = control.getAttribute("data-key");
    if (!key || !drawer) return;

    const line = drawer.querySelector(`[data-cart-line="${CSS.escape(key)}"]`);
    let nextQuantity = 0;

    if (quantityButton) {
      const currentQuantity = Number(
        line?.querySelector("[data-cart-quantity]")?.textContent || "1",
      );
      nextQuantity = Math.max(
        0,
        currentQuantity + (quantityButton.getAttribute("data-cart-qty") === "+1" ? 1 : -1),
      );
    }

    await fetch("/cart/change.js", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ id: key, quantity: nextQuantity }),
    });

    await refreshDrawer();
  });
})();
