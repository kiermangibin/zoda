import { Link } from "@tanstack/react-router";
import { Check, ChevronDown, ShoppingBag, User, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useCartStore } from "@/stores/cartStore";
import { SHOPIFY_STORE_PERMANENT_DOMAIN } from "@/lib/shopify";

type Variant = "light" | "dark";

const currencies = [
  { label: "Hong Kong SAR (HKD $)", value: "HKD $" },
  { label: "Malaysia (MYR RM)", value: "MYR RM" },
  { label: "Singapore (SGD $)", value: "SGD $" },
];

function HeaderCurrencySelector() {
  return (
    <details className="zoda-header-currency">
      <summary className="zoda-header-currency__trigger" aria-label="Select currency">
        <span>SGD $</span>
        <ChevronDown className="zoda-header-currency__chevron h-4 w-4" aria-hidden="true" />
      </summary>
      <div className="zoda-header-currency__menu" role="menu">
        {currencies.map((currency) => (
          <button
            key={currency.value}
            type="button"
            className="zoda-header-currency__option"
            role="menuitem"
          >
            <span>{currency.label}</span>
            {currency.value === "SGD $" ? <Check className="h-4 w-4" aria-hidden="true" /> : null}
          </button>
        ))}
      </div>
    </details>
  );
}

function DarkHeaderActions() {
  const open = useCartStore((s) => s.open);
  const totalItems = useCartStore((s) => s.items.reduce((n, i) => n + i.quantity, 0));
  return (
    <div className="zoda-circuit__chrome-actions">
      <HeaderCurrencySelector />
      <a
        className="zoda-circuit__chrome-icon"
        href={`https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/account`}
        target="_blank"
        rel="noopener"
        aria-label="Account"
      >
        <User className="h-5 w-5" />
      </a>
      <button
        type="button"
        className="zoda-circuit__chrome-icon"
        aria-label={`Cart, ${totalItems} item${totalItems === 1 ? "" : "s"}`}
        onClick={open}
      >
        <ShoppingBag className="h-5 w-5" />
        {totalItems > 0 ? <span className="zoda-circuit__chrome-badge">{totalItems}</span> : null}
      </button>
    </div>
  );
}

function LightHeader({ menuId }: { menuId: string }) {
  const open = useCartStore((s) => s.open);
  const totalItems = useCartStore((s) => s.items.reduce((n, i) => n + i.quantity, 0));
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="zoda-site-header" data-open={mobileOpen}>
      <a className="zoda-site-header__logo" href="/" aria-label="ZODA">
        <img
          src="https://zoda.sg/cdn/shop/files/ZODA_logo.svg?v=1741773590&width=352"
          alt="ZODA"
          loading="eager"
        />
      </a>

      <nav className="zoda-site-header__nav" aria-label="ZODA navigation">
        <a href="/collections/new-arrivals">New Arrivals</a>
        <a href="/collections/womens-collection">Women</a>
        <a href="/collections/mens-collection">Men</a>
        <a href="/collections/unisex">Unisex</a>
        <span className="zoda-site-header__nav-item">
          <a href="/collections">Our Products</a>
          <span className="zoda-site-header__menu" role="menu">
            <a href="/collections/core-performance">Core Performance</a>
            <a href="/collections/endurance">Endurance</a>
            <a href="/collections/24-7-wear">24/7 Wear</a>
            <a href="/collections/accessories">Accessories</a>
          </span>
        </span>
        <span className="zoda-site-header__nav-item">
          <a href="https://zoda.sg/pages/about-zoda" target="_blank" rel="noopener">
            Who We Are
          </a>
          <span className="zoda-site-header__menu" role="menu">
            <Link to="/fabrics">Our Fabrics</Link>
            <Link to="/ikigai">Our Ikigai</Link>
            <Link to="/mission">The Mission</Link>
          </span>
        </span>
      </nav>

      <div className="zoda-site-header__actions">
        <HeaderCurrencySelector />
        <button type="button" className="zoda-site-header__icon" aria-label="Search">
          <Search className="h-5 w-5" />
        </button>
        <a
          className="zoda-site-header__icon"
          href={`https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/account`}
          target="_blank"
          rel="noopener"
          aria-label="Account"
        >
          <User className="h-5 w-5" />
        </a>
        <button
          type="button"
          className="zoda-site-header__icon"
          aria-label={`Cart, ${totalItems} item${totalItems === 1 ? "" : "s"}`}
          onClick={open}
        >
          <ShoppingBag className="h-5 w-5" />
          {totalItems > 0 ? <span className="zoda-site-header__badge">{totalItems}</span> : null}
        </button>
        <button
          type="button"
          className="zoda-site-header__burger"
          aria-label="Menu"
          aria-expanded={mobileOpen}
          aria-controls={menuId}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        className="zoda-site-header__mobile-panel"
        id={menuId}
        onClick={(e) => {
          if ((e.target as HTMLElement).tagName === "A") setMobileOpen(false);
        }}
      >
        <a href="/collections/new-arrivals">New Arrivals</a>
        <a href="/collections/womens-collection">Women</a>
        <a href="/collections/mens-collection">Men</a>
        <a href="/collections/unisex">Unisex</a>
        <strong>Our Products</strong>
        <a href="/collections/core-performance">Core Performance</a>
        <a href="/collections/endurance">Endurance</a>
        <a href="/collections/24-7-wear">24/7 Wear</a>
        <a href="/collections/accessories">Accessories</a>
        <strong>Who We Are</strong>
        <Link to="/fabrics">Our Fabrics</Link>
        <Link to="/ikigai">Our Ikigai</Link>
        <Link to="/mission">The Mission</Link>
      </div>
    </header>
  );
}

/**
 * Global header.
 * - variant="light" (default): matches the live zoda.sg base theme — used on collections, PDP, cart pages.
 * - variant="dark": the bespoke "Circuit" chrome — used only on the home page.
 */
export function SiteHeader({
  menuId = "site-header-mobile-menu",
  variant = "dark",
  embedded = false,
}: {
  menuId?: string;
  variant?: Variant;
  /** True when rendered inside an existing .zoda-circuit ancestor (home page). */
  embedded?: boolean;
}) {
  useEffect(() => {
    if (variant !== "dark") return;
    if (embedded && document.getElementById("zoda-circuit-home")) return;
    const btn = document.querySelector<HTMLButtonElement>(
      `[data-zoda-mobile-menu-button][aria-controls="${menuId}"]`,
    );
    const panel = document.getElementById(menuId);
    if (!btn || !panel) return;
    const wrap = btn.closest("[data-zoda-mobile-menu]") as HTMLElement | null;
    const onClick = () => {
      const isOpen = wrap?.getAttribute("data-open") === "true";
      wrap?.setAttribute("data-open", String(!isOpen));
      btn.setAttribute("aria-expanded", String(!isOpen));
    };
    btn.addEventListener("click", onClick);
    const onLink = (e: Event) => {
      if ((e.target as HTMLElement)?.tagName === "A") {
        wrap?.setAttribute("data-open", "false");
        btn.setAttribute("aria-expanded", "false");
      }
    };
    panel.addEventListener("click", onLink);
    return () => {
      btn.removeEventListener("click", onClick);
      panel.removeEventListener("click", onLink);
    };
  }, [menuId, variant, embedded]);

  if (variant === "light") {
    return <LightHeader menuId={menuId} />;
  }

  const headerMarkup = (
    <header className="zoda-circuit__chrome zoda-circuit__chrome--global">
      <a className="zoda-circuit__logo" href="/" aria-label="ZODA">
        <img
          className="zoda-circuit__logo-image"
          src="https://zoda.sg/cdn/shop/files/ZODA_logo.svg?v=1741773590&width=352"
          alt="ZODA"
          loading="eager"
        />
      </a>

      <nav className="zoda-circuit__nav" aria-label="ZODA navigation">
        <a href="/collections/new-arrivals">New Arrivals</a>
        <a href="/collections/womens-collection">Women</a>
        <a href="/collections/mens-collection">Men</a>
        <a href="/collections/unisex">Unisex</a>
        <span className="zoda-circuit__nav-item">
          <a className="zoda-circuit__nav-trigger text-lg" href="/collections">
            Our Products
          </a>
          <span className="zoda-circuit__nav-menu" role="menu">
            <a href="/collections/core-performance" role="menuitem">
              Core Performance
            </a>
            <a href="/collections/endurance" role="menuitem">
              Endurance
            </a>
            <a href="/collections/24-7-wear" role="menuitem">
              24/7 Wear
            </a>
            <a href="/collections/accessories" role="menuitem">
              Accessories
            </a>
          </span>
        </span>
        <span className="zoda-circuit__nav-item">
          <a
            className="zoda-circuit__nav-trigger text-lg"
            href="https://zoda.sg/pages/about-zoda"
            target="_blank"
            rel="noopener"
          >
            Who We Are
          </a>
          <span className="zoda-circuit__nav-menu" role="menu">
            <Link to="/fabrics" role="menuitem">
              Our Fabrics
            </Link>
            <Link to="/ikigai" role="menuitem">
              Our Ikigai
            </Link>
            <Link to="/mission" role="menuitem">
              The Mission
            </Link>
          </span>
        </span>
      </nav>

      <div className="zoda-circuit__chrome-right">
        <DarkHeaderActions />
        <div className="zoda-circuit__mobile-menu" data-zoda-mobile-menu="">
          <button
            className="zoda-circuit__mobile-menu-button"
            type="button"
            aria-label="Open ZODA navigation"
            aria-expanded="false"
            aria-controls={menuId}
            data-zoda-mobile-menu-button=""
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div
            className="zoda-circuit__mobile-menu-panel"
            id={menuId}
            data-zoda-mobile-menu-panel=""
          >
            <a href="/collections/new-arrivals">New Arrivals</a>
            <a href="/collections/womens-collection">Women</a>
            <a href="/collections/mens-collection">Men</a>
            <a href="/collections/unisex">Unisex</a>
            <div className="zoda-circuit__mobile-menu-group">
              <a href="/collections">
                <strong>Our Products</strong>
              </a>
              <a href="/collections/core-performance">Core Performance</a>
              <a href="/collections/endurance">Endurance</a>
              <a href="/collections/24-7-wear">24/7 Wear</a>
              <a href="/collections/accessories">Accessories</a>
            </div>
            <div className="zoda-circuit__mobile-menu-group">
              <strong>Who We Are</strong>
              <Link to="/fabrics">Our Fabrics</Link>
              <Link to="/ikigai">Our Ikigai</Link>
              <Link to="/mission">The Mission</Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );

  if (embedded) return headerMarkup;
  return <div className="zoda-circuit zoda-circuit--chrome-only">{headerMarkup}</div>;
}
