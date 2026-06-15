// Convert ZodaCircuit.tsx JSX into Liquid markup for sections/circuit-home.liquid
const fs = require("fs");
const src = fs.readFileSync("/dev-server/src/components/zoda/ZodaCircuit.tsx", "utf8");

// Extract everything between the React fragment opener `<>` and closer `</>`
const start = src.indexOf("<>") + 2;
const end = src.lastIndexOf("</>");
let body = src.slice(start, end);

// Strip the components rendered separately (header, gallery, reviews, cart drawer, footer)
body = body
  .replace(/<SiteHeader[^>]*\/>\s*/g, "{% render 'zoda-header' %}\n")
  .replace(/<ProductMotionGallery\s*\/>\s*/g, "{% render 'zoda-pim' %}\n")
  .replace(/<ReviewsRail\s*\/>\s*/g, "{% render 'zoda-reviews' %}\n")
  .replace(/<CartDrawer\s*\/>\s*/g, "")
  .replace(/<Footer\s*\/>\s*/g, "");

// className -> class
body = body.replace(/className=/g, "class=");

// style={{"--zoda-delay": "90ms"} as React.CSSProperties}
body = body.replace(
  /style=\{\{\s*"--zoda-delay":\s*"(\d+ms)"\s*\}\s*as\s*React\.CSSProperties\}/g,
  'style="--zoda-delay: $1"'
);

// tabIndex={0} -> tabindex="0"
body = body.replace(/tabIndex=\{(\d+)\}/g, 'tabindex="$1"');

// strokeWidth="1.9" stays fine in Liquid as attribute, lowercase it for safety
body = body.replace(/strokeWidth=/g, "stroke-width=");

// Remove any remaining {expression} braces around plain string children that are safe
// (e.g., none expected at this point). Leave HTML as-is.

const out = `{% comment %}
  Auto-ported from src/components/zoda/ZodaCircuit.tsx by
  scripts/convert-circuit-to-liquid.cjs. Edit the React source first,
  then re-run the converter so both runtimes stay in sync.
{% endcomment %}

${body.trim()}

{% schema %}
{
  "name": "Circuit home",
  "settings": [],
  "presets": [{ "name": "Circuit home" }]
}
{% endschema %}
`;

fs.writeFileSync("/dev-server/zoda-shopify-theme/sections/circuit-home.liquid", out);
console.log("wrote sections/circuit-home.liquid", out.length, "bytes");
