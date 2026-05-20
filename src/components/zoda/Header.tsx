import { Link } from "@tanstack/react-router";
import { Search, User, ShoppingBag, ChevronDown } from "lucide-react";

const NAV = [
  { label: "New Arrivals", to: "/" },
  { label: "Women", to: "/" },
  { label: "Men", to: "/" },
  { label: "Unisex", to: "/" },
  { label: "Our Products", to: "/", hasMenu: true },
  { label: "Who We Are", to: "/", hasMenu: true },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-black/10 text-black">
      <div className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-[var(--zoda-accent)]">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden>
            <rect width="32" height="32" rx="6" fill="currentColor" />
            <path
              d="M9 9h14L9 23h14"
              stroke="#fff"
              strokeWidth="3.2"
              strokeLinecap="square"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-display text-[22px] tracking-[0.04em]">ZODA</span>
        </Link>

        {/* Nav */}
        <nav className="hidden lg:flex items-center gap-7 text-[12px] font-bold uppercase tracking-[0.12em]">
          {NAV.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="inline-flex items-center gap-1 transition-colors hover:text-[var(--zoda-accent)]"
            >
              {item.label}
              {item.hasMenu && <ChevronDown className="h-3 w-3" />}
            </Link>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-4 text-[12px] font-bold uppercase tracking-[0.12em]">
          <button className="hidden md:inline-flex items-center gap-1 hover:text-[var(--zoda-accent)]">
            SGD $ <ChevronDown className="h-3 w-3" />
          </button>
          <button aria-label="Search" className="hover:text-[var(--zoda-accent)]">
            <Search className="h-5 w-5" />
          </button>
          <button aria-label="Account" className="hover:text-[var(--zoda-accent)]">
            <User className="h-5 w-5" />
          </button>
          <button aria-label="Cart" className="relative hover:text-[var(--zoda-accent)]">
            <ShoppingBag className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
