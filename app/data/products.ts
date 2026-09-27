type Product = {
  slug: string;
  name: string;
  category: string;
  price: number;
  image: string;
  altImage: string;
  description: string;
  specs: Record<string, string>;
  isNew?: boolean;
};

const images = {
  hero: "/images/hero.jpg",
  living: "https://images.unsplash.com/photo-1705326701287-346fc37a2c86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=90&w=2000",
  intro: "/images/sofa.jpg",
  bed: "https://images.unsplash.com/photo-1633944095397-878622ebc01c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200",
  bedAlt: "https://images.unsplash.com/photo-1649817018876-c05473c7e5a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200",
  sofa: "https://images.unsplash.com/photo-1784653548770-23c8f9022c4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200",
  sofaAlt: "https://images.unsplash.com/photo-1750639258774-9a714379a093?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200",
  dining: "https://images.unsplash.com/photo-1597072689227-8882273e8f6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200",
  diningAlt: "https://images.unsplash.com/photo-1719899913493-1e508c3833e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200",
  table: "https://images.unsplash.com/photo-1576864333210-6fbc08b1bb2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200",
  tableAlt: "https://images.unsplash.com/photo-1692262089751-7e26b69ad8d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200",
  chair: "https://images.unsplash.com/photo-1720391793902-06a80038b1ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200",
  bedroom: "/images/bedroom.jpg",
};

const products: Product[] = [
  {
    slug: "modern-oak-king-bed",
    name: "Modern Oak King Bed",
    category: "Bedroom",
    price: 85000,
    image: images.bed,
    altImage: images.bedAlt,
    description: "A timeless wooden bed designed with clean proportions and a warm natural finish.",
    specs: { Material: "Solid Wood", Dimensions: "6 × 6.5 ft", Color: "Natural Oak", Finish: "Natural Wood", Condition: "New" },
    isNew: true,
  },
  {
    slug: "elara-lounge-sofa",
    name: "Elara Lounge Sofa",
    category: "Living Room",
    price: 128000,
    image: images.sofa,
    altImage: images.sofaAlt,
    description: "A generous contemporary sofa with soft lines and a calm, inviting profile.",
    specs: { Material: "Solid Wood Frame", Seats: "3 Seater", Dimensions: "88 × 36 in", Color: "Warm Ivory", Fabric: "Textured Weave" },
    isNew: true,
  },
  {
    slug: "arco-dining-table",
    name: "Arco Dining Table",
    category: "Dining",
    price: 96000,
    image: images.dining,
    altImage: images.diningAlt,
    description: "A beautifully balanced dining table made for unhurried gatherings.",
    specs: { Material: "Oak Veneer", Dimensions: "72 × 36 in", Shape: "Rectangular", Color: "Smoked Oak", Finish: "Matte" },
  },
  {
    slug: "solace-coffee-table",
    name: "Solace Coffee Table",
    category: "Tables",
    price: 42000,
    image: images.table,
    altImage: images.tableAlt,
    description: "A grounded coffee table with sculptural presence and natural warmth.",
    specs: { Material: "Solid Wood", Dimensions: "42 × 24 in", Shape: "Organic", Color: "Walnut", Finish: "Satin" },
    isNew: true,
  },
  {
    slug: "lina-oak-chair",
    name: "Lina Oak Chair",
    category: "Seating",
    price: 28500,
    image: images.chair,
    altImage: images.dining,
    description: "A refined dining chair with an honest silhouette and thoughtful comfort.",
    specs: { Material: "Solid Oak", Dimensions: "31 × 20 in", Color: "Natural", Finish: "Hand-rubbed", Condition: "New" },
  },
  {
    slug: "haven-bedside-table",
    name: "Haven Bedside Table",
    category: "Bedroom",
    price: 32000,
    image: images.bedAlt,
    altImage: images.tableAlt,
    description: "A quiet bedside companion with generous storage and beautiful grain.",
    specs: { Material: "Oak Veneer", Dimensions: "22 × 18 in", Color: "Light Oak", Finish: "Matte", Condition: "New" },
  },
  {
    slug: "mira-occasional-chair",
    name: "Mira Occasional Chair",
    category: "Seating",
    price: 47500,
    image: images.sofaAlt,
    altImage: images.chair,
    description: "An accent chair with soft geometry, made for slow and comfortable moments.",
    specs: { Material: "Wood Frame", Dimensions: "30 × 32 in", Color: "Sand", Fabric: "Performance Bouclé", Condition: "New" },
  },
  {
    slug: "atelier-console",
    name: "Atelier Console",
    category: "Tables",
    price: 58000,
    image: images.intro,
    altImage: images.diningAlt,
    description: "A slender oak console that brings effortless order to an entrance or living space.",
    specs: { Material: "Solid Wood", Dimensions: "54 × 14 in", Color: "Honey Oak", Finish: "Natural Oil", Condition: "New" },
  },
];

export { images, products };
export type { Product };