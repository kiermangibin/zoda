// Map common color names → CSS color. Falls back to the variant image thumb.
const NAMED_COLORS: Record<string, string> = {
  black: "#0a0a0a",
  white: "#f5f5f0",
  cream: "#efe7d8",
  beige: "#dcc9a6",
  sand: "#cab98e",
  tan: "#c9a877",
  brown: "#5a3a22",
  chocolate: "#3b2516",
  grey: "#8a8a8a",
  gray: "#8a8a8a",
  charcoal: "#2a2a2a",
  silver: "#c8c8c8",
  navy: "#0f1b3d",
  blue: "#1f4dd0",
  teal: "#0e7a83",
  mint: "#7fdcb4",
  green: "#2f7d32",
  olive: "#6a7240",
  forest: "#1f3d2a",
  sage: "#9bb39c",
  red: "#c0392b",
  burgundy: "#5a1a26",
  pink: "#e8a3b6",
  rose: "#d96a83",
  orange: "#e07a30",
  yellow: "#e8c63a",
  purple: "#6a3aa3",
  lavender: "#b6a3e8",
  zoda: "#55cda1",
};

export interface Swatch {
  value: string;
  label: string;
  color: string | null;
  image: string | null;
}

export function deriveSwatches(
  options: Array<{ name: string; values: string[] }> | undefined | null,
  variants: Array<{
    selectedOptions: Array<{ name: string; value: string }>;
    image?: { url: string; altText: string | null } | null;
  }> | undefined | null,
): Swatch[] {
  if (!options || !variants) return [];
  const colorOpt = options.find((o) => /colou?r/i.test(o.name));
  if (!colorOpt) return [];

  const seen = new Map<string, Swatch>();
  for (const value of colorOpt.values) {
    const variant = variants.find((v) =>
      v.selectedOptions.some((s) => s.name === colorOpt.name && s.value === value),
    );
    const key = value.toLowerCase().trim();
    const named = NAMED_COLORS[key] ?? null;
    if (!seen.has(key)) {
      seen.set(key, {
        value,
        label: value,
        color: named,
        image: variant?.image?.url ?? null,
      });
    }
  }
  return Array.from(seen.values());
}
