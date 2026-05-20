import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { SiteHeader } from "@/components/zoda/SiteHeader";
import { CartDrawer } from "@/components/zoda/CartDrawer";
import { Footer } from "@/components/zoda/Footer";

export const Route = createFileRoute("/collections/")({
  head: () => ({
    meta: [
      { title: "Collections — ZODA" },
      { name: "description", content: "Browse ZODA collections: New Arrivals, Women, Men, Unisex." },
    ],
  }),
  component: CollectionsIndex,
});

const COLLECTIONS = [
  { handle: "new-arrivals", title: "New Arrivals" },
  { handle: "womens-collection", title: "Women" },
  { handle: "mens-collection", title: "Men" },
  { handle: "unisex", title: "Unisex" },
  { handle: "core-performance", title: "Core Performance" },
  { handle: "endurance", title: "Endurance" },
  { handle: "24-7-wear", title: "24/7 Wear" },
  { handle: "accessories", title: "Accessories" },
];

function CollectionsIndex() {
  return (
    <div className="zoda-shell zoda-shell--light">
      <SiteHeader menuId="collections-index-mobile-menu" />
      <main className="zoda-shell__main">
        <div className="zoda-shell__heading">
          <h1>Collections</h1>
          <p>Pick your training mode.</p>
        </div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, borderTop: "1px solid var(--line)" }}>
          {COLLECTIONS.map((c) => (
            <li key={c.handle} style={{ borderBottom: "1px solid var(--line)" }}>
              <Link
                to="/collections/$handle"
                params={{ handle: c.handle }}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "20px 8px",
                  fontSize: 14,
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "#0a0a0a",
                  textDecoration: "none",
                }}
              >
                <span>{c.title}</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <CartDrawer />
      <Footer />
    </div>
  );
}
