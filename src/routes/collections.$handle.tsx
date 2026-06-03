import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { getCollectionByHandle } from "@/lib/collection";
import { ProductCard } from "@/components/zoda/ProductCard";
import { CartDrawer } from "@/components/zoda/CartDrawer";
import { SiteHeader } from "@/components/zoda/SiteHeader";
import { Footer } from "@/components/zoda/Footer";

export const Route = createFileRoute("/collections/$handle")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.handle.replace(/-/g, " ")} — ZODA` },
      {
        name: "description",
        content: `Shop the ${params.handle.replace(/-/g, " ")} collection from ZODA.`,
      },
    ],
  }),
  component: CollectionPage,
});

function CollectionPage() {
  const { handle } = useParams({ from: "/collections/$handle" });
  const { data, isLoading, isError } = useQuery({
    queryKey: ["collection", handle],
    queryFn: () => getCollectionByHandle(handle),
    staleTime: 60_000,
  });

  return (
    <div className="zoda-shell zoda-shell--light">
      <SiteHeader menuId="collection-detail-mobile-menu" />

      <main className="zoda-shell__main">
        {isLoading ? (
          <div className="zoda-shell__loading">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : isError || !data ? (
          <p className="zoda-shell__empty">Collection not found.</p>
        ) : (
          <>
            <div className="zoda-shell__heading">
              <h1>{data.title}</h1>
              <nav className="zoda-shell__breadcrumbs" aria-label="Breadcrumbs">
                <Link to="/">Home</Link>
                <span aria-hidden="true">/</span>
                <Link to="/collections">Collections</Link>
                <span aria-hidden="true">/</span>
                <span>{data.title}</span>
              </nav>
              {data.description ? <p>{data.description}</p> : null}
            </div>

            {data.products.length === 0 ? (
              <p className="zoda-shell__empty">No products in this collection yet.</p>
            ) : (
              <div className="zoda-collection-grid">
                {data.products.map((p, index) => (
                  <ProductCard key={p.id} p={p} eager={index < 4} />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <CartDrawer />
      <Footer />
    </div>
  );
}
