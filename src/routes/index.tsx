import { createFileRoute } from "@tanstack/react-router";
import { ZodaCircuit } from "@/components/zoda/ZodaCircuit";
import "@/styles/home-circuit.css";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ZODA — Changing how humans experience activewear" },
      {
        name: "description",
        content:
          "ZODA is built for training, recovery, and every hour between. Performance activewear engineered for athletes moving with intent.",
      },
      { property: "og:title", content: "ZODA — Performance Activewear" },
      {
        property: "og:description",
        content:
          "ZODA is built for training, recovery, and every hour between. Step into the circuit and move with intent.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return <ZodaCircuit />;
}
