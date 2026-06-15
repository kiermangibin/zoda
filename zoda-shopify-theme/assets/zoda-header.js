(() => {
  const headers = document.querySelectorAll("[data-zoda-header]");
  if (!headers.length) return;

  headers.forEach((header) => {
    if (header.dataset.ready === "true") return;
    header.dataset.ready = "true";

    const drawer = header.querySelector("[data-zoda-menu-drawer]");
    const toggles = header.querySelectorAll("[data-zoda-menu-toggle]");
    if (!drawer || !toggles.length) return;

    const setOpen = (open) => {
      drawer.classList.toggle("is-open", open);
      drawer.setAttribute("aria-hidden", open ? "false" : "true");
      toggles.forEach((toggle) => {
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      });
      document.body.style.overflow = open ? "hidden" : "";
    };

    toggles.forEach((toggle) => {
      toggle.addEventListener("click", () => {
        setOpen(!drawer.classList.contains("is-open"));
      });
    });

    drawer.addEventListener("click", (event) => {
      if (event.target instanceof Element && event.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && drawer.classList.contains("is-open")) setOpen(false);
    });
  });

  document.addEventListener("click", (event) => {
    document.querySelectorAll(".zoda-header-currency[open]").forEach((dropdown) => {
      if (event.target instanceof Element && dropdown.contains(event.target)) return;
      dropdown.removeAttribute("open");
    });
  });
})();
