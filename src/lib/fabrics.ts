// Fabric content sourced from https://zoda.sg/pages/zoda-fabrics
// Plain TypeScript data — no Shopify metafields, edit copy/images here.

export interface FabricFeature {
  label: string;
  icon: string;
}

export interface Fabric {
  handle: string;
  name: string;
  tagline: string;
  heroTitle: string;
  description: string;
  features: FabricFeature[];
  performance: string[];
  sustainability: string[];
  community: string;
  shopUrl: string;
  swatchImage: string;
}

const ICONS = {
  fluid: "https://zoda.sg/cdn/shop/files/1_12ff3052-9255-40c4-85a3-15a2e8672275.png?v=1748620566&width=80",
  fresh: "https://zoda.sg/cdn/shop/files/3_ed88a1f3-b5d7-48ef-a64d-21ce4008ca9c.png?v=1748620565&width=80",
  dry: "https://zoda.sg/cdn/shop/files/3_37b6f8b7-5425-47a6-a7bc-6f9ab472b6f8.png?v=1748626713&width=80",
  vent: "https://zoda.sg/cdn/shop/files/4_bb2248f1-9ef7-4ba9-aca8-c7de92491aed.png?v=1748626714&width=80",
  carbon: "https://zoda.sg/cdn/shop/files/Untitled_design_5.png?v=1755082719&width=80",
  zenflex: "https://zoda.sg/cdn/shop/files/fabric_icons.png?v=1748692779&width=80",
};

export const FABRICS: Fabric[] = [
  {
    handle: "zencot",
    name: "ZENCOT™",
    tagline: "Luxurious BCI cotton and elastane blend for exceptional breathability and soft feel.",
    heroTitle: "ZENCOT™: Performance and Sustainability in Perfect Harmony",
    description:
      "ZENCOT™ is a premium fabric blend of BCI-certified cotton and elastane, delivering all-day comfort, breathability and performance—designed for athletes who value both function and environmental impact.",
    features: [
      { label: "FluidMotion™", icon: ICONS.fluid },
      { label: "ZO-Fresh™", icon: ICONS.fresh },
      { label: "Carbon Capture", icon: ICONS.carbon },
    ],
    performance: [
      "FluidMotion™ 4-way stretch for full mobility",
      "ZO-Fresh™ anti-odour treatment to stay fresh throughout wear",
      "Retains shape and softness through repeated use",
    ],
    sustainability: [
      "Treated with COzTERRA: absorbs CO₂ and converts it to harmless minerals during washing",
      "Each piece removes 16–41g of CO₂ over its lifetime",
      "Contributes to a reduced carbon footprint without compromising performance",
    ],
    community:
      "Designed for athletes who expect more from their gear—offering the perfect blend of sustainability, comfort and performance. Its advanced fabric technology supports unrestricted movement, long-lasting breathability and everyday wearability.",
    shopUrl: "https://zoda.sg/collections/zencot%E2%84%A2",
    swatchImage:
      "https://zoda.sg/cdn/shop/files/ZENCOT_BO_DSC04446.webp?width=1200",
  },
  {
    handle: "zoenix",
    name: "ZOENIX™",
    tagline:
      "Innovative fabric engineered from 100% Recycled Polyester (RPET), transforming post-consumer plastic bottles into premium athletic apparel.",
    heroTitle: "ZOENIX™: Performance and Sustainability Redefined",
    description:
      "Made from 100% recycled polyester (RPET), ZOENIX™ turns post-consumer plastic bottles into high-performance fabric, designed to support both your training and your values.",
    features: [
      { label: "FluidMotion™", icon: ICONS.fluid },
      { label: "ZO-Dry™", icon: ICONS.dry },
      { label: "ZO-Fresh™", icon: ICONS.fresh },
    ],
    performance: [
      "ZO-Dry™ wicks moisture away to keep you dry",
      "ZO-Fresh™ keeps odour in check",
      "FluidMotion™ 4-way stretch for agility and fit",
    ],
    sustainability: [
      "Reduces CO₂ emissions by 20.7% compared to virgin polyester",
      "Built from 100% recycled materials using RPET, in alignment with ZODA's commitment to reducing carbon emissions and promoting a circular economy.",
    ],
    community:
      "Experience unparalleled comfort and performance. Made to build high-intensity apparels that function well in highly humid conditions.",
    shopUrl: "https://zoda.sg/collections/zoenix%E2%84%A2",
    swatchImage:
      "https://zoda.sg/cdn/shop/files/zoenix_2.png?width=1200",
  },
  {
    handle: "zoenix-lite",
    name: "ZOENIXLITE™",
    tagline:
      "This technically advanced fabric, composed of 86% Recycled Polyester and 12% Elastane, exemplifies the commitment to sustainable athletic excellence.",
    heroTitle: "ZOENIXLITE™: Lightweight. Breathable. Sustainable.",
    description:
      "ZOENIXLITE™ blends recycled polyester, elastane, and a fine-tuned structure to deliver maximum breathability and flexibility where it matters most.",
    features: [
      { label: "FluidMotion™", icon: ICONS.fluid },
      { label: "ZO-Vent™", icon: ICONS.vent },
      { label: "ZO-Dry™", icon: ICONS.dry },
    ],
    performance: [
      "ZO-Dry™ moisture control",
      "ZO-Vent mesh design for overall ventilation",
      "ZO-Fresh™ for extended freshness",
      "FluidMotion™ stretch for freedom in every movement",
    ],
    sustainability: [
      "Made with recycled polyester, reducing CO₂ emissions and contributing to a circular economy",
      "Embodies ZODA's commitment to sustainable innovation, where performance and environmental responsibility meet",
    ],
    community:
      "Experience unparalleled comfort, performance and style while giving your best on your turf.",
    shopUrl: "https://zoda.sg/collections/zoenixlite%E2%84%A2",
    swatchImage:
      "https://zoda.sg/cdn/shop/files/ZoenixLite_SG_DSC04319_1.webp?width=1200",
  },
  {
    handle: "rpstrng",
    name: "RPSTRNG™",
    tagline:
      "An ultra-premium blend of Recycled Nylon, Elastane and BCI Cotton — engineered to withstand the rigours of training while keeping the athlete cool, dry and comfortable.",
    heroTitle: "RPSTRNG™: Engineered for Durability and Performance",
    description:
      "Experience the perfect balance of protection and performance with ZODA's RPSTRNG™ fabric. This technically advanced textile is engineered to withstand the rigors of your training while keeping you cool, dry and comfortable.",
    features: [
      { label: "FluidMotion™", icon: ICONS.fluid },
      { label: "ZO-Vent™", icon: ICONS.vent },
      { label: "ZO-Dry™", icon: ICONS.dry },
      { label: "ZO-Fresh™", icon: ICONS.fresh },
    ],
    performance: [
      "Reinforced grid weave resists tearing",
      "ZO-Dry™ wicks sweat efficiently",
      "ZO-Vent™ and FluidMotion™ tech ensure comfort and freedom",
      "ZO-Fresh™ keeps gear feeling clean",
    ],
    sustainability: [
      "Built from regenerated nylon in alignment with ZODA's commitment to reducing carbon emissions and promoting a circular economy.",
    ],
    community:
      "Two variants — Performance: rugged finish for intense hardcore training. Sprint: lighter, breathable for long runs or high-endurance sprint training. Select your variant based on your training style. RPSTRNG™ is made to endure.",
    shopUrl: "https://zoda.sg/collections/rpstrng%E2%84%A2",
    swatchImage:
      "https://zoda.sg/cdn/shop/files/RPSTRNG_SBG_DSC04435.webp?width=1200",
  },
  {
    handle: "auraform",
    name: "AURAFORM™",
    tagline:
      "Crafted from a premium blend of 80% Nylon and 20% Elastane, AuraForm™ delivers a unique combination of strength, stretch and recovery.",
    heroTitle: "AURAFORM™: Elite Comfort. Maximum Endurance.",
    description:
      "AuraForm™ is a performance-engineered fabric made from a premium blend of Nylon and Elastane. Exclusively developed using Zenith Tech™, it delivers strategic support and flexibility.",
    features: [
      { label: "FluidMotion™", icon: ICONS.fluid },
      { label: "ZO-Vent™", icon: ICONS.vent },
      { label: "ZO-Dry™", icon: ICONS.dry },
      { label: "ZO-Fresh™", icon: ICONS.fresh },
    ],
    performance: [
      "FluidMotion™ allows unrestricted movement and a sculpted fit",
      "Zenith Tech™ maintains fabric shape wear after wear",
      "ZO-Dry™ keeps you cool and dry through intense sessions",
      "ZO-Fresh™ neutralises odour for long-lasting freshness",
    ],
    sustainability: [
      "Built from regenerated nylon in alignment with ZODA's commitment to reducing carbon emissions and promoting a circular economy.",
    ],
    community:
      "AuraForm™ offers the perfect balance of compression and comfort. Stay supported, confident and unstoppable—wherever your training takes you.",
    shopUrl: "https://zoda.sg/collections/auraform%E2%84%A2",
    swatchImage:
      "https://zoda.sg/cdn/shop/files/AuraForm_B_DSC04342_1.jpg?width=1200",
  },
  {
    handle: "nycurv",
    name: "NYCURV™",
    tagline:
      "Made from a premium blend of high-denier Nylon and advanced Elastane fibers — exceptional durability, stretch and recovery.",
    heroTitle: "NYCURV™: Engineered for Unwavering Support and Comfort",
    description:
      "NyCurv™ is a premium high-denier Nylon and Elastane blend designed for ultimate fit, shape retention, and confidence. Developed with advanced tech to sculpt, support, and empower movement. This fabric is made to perform under pressure and hold its form no matter the challenge.",
    features: [
      { label: "FluidMotion™", icon: ICONS.fluid },
      { label: "ZO-Vent™", icon: ICONS.vent },
      { label: "ZO-Dry™", icon: ICONS.dry },
      { label: "ZO-Fresh™", icon: ICONS.fresh },
    ],
    performance: [
      "Zenith Tech™ premium shape retention and enhanced compression for a secure, sculpted fit",
      "FluidMotion™ 4-way stretch for full range of motion",
      "ZO-Dry™ moisture-wicking to stay cool and dry",
      "ZO-Fresh™ anti-odour technology for long-lasting freshness",
    ],
    sustainability: [
      "Built from regenerated nylon in alignment with ZODA's commitment to reducing carbon emissions and promoting a circular economy.",
    ],
    community:
      "Made for athletes who demand more from their activewear. Feel confident, supported and powerful—wherever you train or compete.",
    shopUrl: "https://zoda.sg/collections/nycurv%E2%84%A2",
    swatchImage:
      "https://zoda.sg/cdn/shop/files/NyCurv_DM_DSC04354.webp?width=1200",
  },
  {
    handle: "nyx",
    name: "NYX™",
    tagline:
      "Crafted from a premium blend of NyCurv™ and Elastane — lightweight and engineered to support the most demanding workouts.",
    heroTitle: "NYX™: Engineered for High-Intensity Training",
    description:
      "NyX™ delivers targeted support and shape retention during your most intense workouts—without compromising on comfort.",
    features: [
      { label: "FluidMotion™", icon: ICONS.fluid },
      { label: "ZO-Fresh™", icon: ICONS.fresh },
      { label: "ZO-Dry™", icon: ICONS.dry },
    ],
    performance: [
      "NyCurv™ and elastane blend for firm yet flexible compression",
      "FluidMotion™ allows full range of motion",
      "ZO-Dry™ and ZO-Fresh™ ensure comfort and hygiene",
      "Holds shape, wash after wash",
    ],
    sustainability: [
      "Built from regenerated nylon in alignment with ZODA's commitment to reducing carbon emissions and promoting a circular economy.",
    ],
    community:
      "High-performance compression that works as hard as you do. Jacquard ventilation zones increase airflow; strategic structure for both function and style.",
    shopUrl: "https://zoda.sg/collections/nyx%E2%84%A2",
    swatchImage:
      "https://zoda.sg/cdn/shop/files/NyrCurv.png?width=1200",
  },
  {
    handle: "nyxlite",
    name: "NYXLITE™",
    tagline:
      "A premium blend of recycled polyester and elastane — exceptional breathability, stretch and recovery.",
    heroTitle: "NYXLITE™: Cooling. Compressive. Ready for the Outdoors.",
    description:
      "Crafted for heat and high effort, NyXlite™ offers breathable support and structure in hot and humid training environments.",
    features: [
      { label: "FluidMotion™", icon: ICONS.fluid },
      { label: "ZO-Fresh™", icon: ICONS.fresh },
      { label: "ZO-Dry™", icon: ICONS.dry },
      { label: "ZenFlex™", icon: ICONS.zenflex },
    ],
    performance: [
      "Lightweight blend of NyCurv™ and elastane",
      "Strategic compression zones for muscle support",
      "ZO-Dry™ and ZO-Fresh™ keep you dry and odour-free",
      "Perforated jacquard design enhances breathability",
    ],
    sustainability: [
      "Built from regenerated nylon in alignment with ZODA's commitment to reducing carbon emissions and promoting a circular economy.",
    ],
    community:
      "Designed for the outdoor athlete: high-performance construction for serious athletes training in real conditions. Experience unparalleled comfort, support and breathability during your outdoor sessions.",
    shopUrl: "https://zoda.sg/collections/nyxlite%E2%84%A2",
    swatchImage:
      "https://zoda.sg/cdn/shop/files/NyXlite_B_DSC04425.webp?width=1200",
  },
];
