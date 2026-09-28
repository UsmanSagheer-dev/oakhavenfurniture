type ProductVariant = {
  size: string;
  price: number;
  image: string;
  altImage: string;
  thirdImage?: string;
  specs?: Record<string, string>;
};

type Product = {
  slug: string;
  name: string;
  category: string;
  basePrice: number;
  variants: ProductVariant[];
  description: string;
  specs?: Record<string, string>;
  isNew?: boolean;
};

const images = {
  hero: "/images/hero.jpg",
  living: "https://images.unsplash.com/photo-1705326701287-346fc37a2c86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=90&w=2000",
  intro: "/images/sofa.jpg",
  // Modern Sleigh Bed - Size Variants
  bedSingle: "/images/singlesleghbed.jpeg",
  bedSingle2: "/images/singlesleghbed2.jpeg",
  bedSingle3: "/images/singlesleghbed3.jpeg",
  bedDouble: "/images/doublebed.jpeg",
  bedDouble2: "/images/doublebed2.jpeg",
  bedDouble3: "/images/doublebed3.jpeg",
  bedKing: "/images/kingbed1.jpeg",
  bedKing2: "/images/kingbed2.jpeg",
  bedKing3: "/images/kingbed3.jpeg",
  bedSuperKing: "/images/superkingsleighbed1.jpeg",
  bedSuperKing2: "/images/superkingsleighbed2.jpeg",
  bedSuperKing3: "/images/superkingsleighbed3.jpeg",
  bedEmperor: "/images/emperorsleighbed.jpeg",
  bedEmperor2: "/images/emperorsleighbed2.jpeg",
  bedEmperor3: "/images/emperorsleighbed3.jpeg",
  // Arizona Bed - Size Variants
  arizonaSingle: "/images/arizonabed_single1.jpeg",
  arizonaSingle2: "/images/arizonabed_single2.jpeg",
  arizonaSingle3: "/images/arizonabed_single3.jpeg",
  arizonaDouble: "/images/arizonabed_double1.jpeg",
  arizonaDouble2: "/images/arizonabed_double2.jpeg",
  arizonaDouble3: "/images/arizonabed_double3.jpeg",
  arizonaKing: "/images/arizonabed_king1.jpeg",
  arizonaKing2: "/images/arizonabed_king2.jpeg",
  arizonaKing3: "/images/arizonabed_king3.jpeg",
  arizonaSuperKing: "/images/arizonabed_superking1.jpeg",
  arizonaSuperKing2: "/images/arizonabed_superking2.jpeg",
  arizonaSuperKing3: "/images/arizonabed_superking3.jpeg",
  // Elara Lounge Sofa
  sofa: "https://images.unsplash.com/photo-1784653548770-23c8f9022c4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200",
  sofa2: "https://images.unsplash.com/photo-1750639258774-9a714379a093?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200",
  sofa3: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200",
  // Arco Dining Table
  dining: "https://images.unsplash.com/photo-1597072689227-8882273e8f6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200",
  dining2: "https://images.unsplash.com/photo-1719899913493-1e508c3833e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200",
  dining3: "https://images.unsplash.com/photo-1617806118233-18e1de247200?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200",
  // Solace Coffee Table
  table: "https://images.unsplash.com/photo-1576864333210-6fbc08b1bb2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200",
  table2: "https://images.unsplash.com/photo-1692262089751-7e26b69ad8d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200",
  table3: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200",
  // Lina Oak Chair
  chair: "https://images.unsplash.com/photo-1720391793902-06a80038b1ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200",
  chair2: "https://images.unsplash.com/photo-1592078615290-033ee584e267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200",
  chair3: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200",
  // Haven Bedside Table
  bedside: "/images/singlesleghbed.jpeg",
  bedside2: "/images/singlesleghbed2.jpeg",
  bedside3: "/images/doublesleghbed.jpeg",
  // Mira Occasional Chair
  occasional: "https://images.unsplash.com/photo-1750639258774-9a714379a093?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200",
  occasional2: "https://images.unsplash.com/photo-1720391793902-06a80038b1ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200",
  occasional3: "https://images.unsplash.com/photo-1592078615290-033ee584e267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200",
  // Atelier Console
  console: "/images/sofa.jpg",
  console2: "https://images.unsplash.com/photo-1719899913493-1e508c3833e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200",
  console3: "https://images.unsplash.com/photo-1597072689227-8882273e8f6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1200",
  // Category images
  bedroom: "/images/bedroom.jpg",
};

const products: Product[] = [
  {
    slug: "modern-oak-king-bed",
    name: "Modern Sleigh Bed",
    category: "Bedroom",
    basePrice: 220,
    variants: [
      {
        size: "Single",
        price: 220,
        image: images.bedSingle,
        altImage: images.bedSingle2,
        thirdImage: images.bedSingle3,
        specs: { Dimensions: "3' × 6'3\"", Material: "Wooden slatted", Color: "Natural Oak" },
      },
      {
        size: "Small Double",
        price: 235,
        image: images.bedDouble,
        altImage: images.bedDouble2,
        thirdImage: images.bedDouble3,
        specs: { Dimensions: "4' × 6'3\"", Material: "Wooden slatted", Color: "Natural Oak" },
      },
      {
        size: "Double",
        price: 250,
        image: images.bedDouble,
        altImage: images.bedDouble2,
        thirdImage: images.bedDouble3,
        specs: { Dimensions: "4'6\" × 6'3\"", Material: "Wooden slatted", Color: "Natural Oak" },
      },
      {
        size: "King",
        price: 280,
        image: images.bedKing,
        altImage: images.bedKing2,
        thirdImage: images.bedKing3,
        specs: { Dimensions: "5' × 6'6\"", Material: "Wooden slatted", Color: "Natural Oak" },
      },
      {
        size: "Super King",
        price: 330,
        image: images.bedSuperKing,
        altImage: images.bedSuperKing2,
        thirdImage: images.bedSuperKing3,
        specs: { Dimensions: "6' × 6'6\"", Material: "Wooden slatted", Color: "Natural Oak" },
      },
      // {
      //   size: "Emperor",
      //   price: 380,
      //   image: images.bedEmperor,
      //   altImage: images.bedEmperor2,
      //   thirdImage: images.bedEmperor3,
      //   specs: { Dimensions: "6'6\" × 6'6\"", Weight: "85 kg", Material: "Solid Wood", Color: "Natural Oak", Finish: "Natural Wood" },
      // },
    ],
    description: "A timeless wooden bed designed with clean proportions and a warm natural finish.",
    isNew: true,
  },
  {
    slug: "arizona-bed",
    name: "Arizona Bed",
    category: "Bedroom",
    basePrice: 240,
    variants: [
      {
        size: "Single",
        price: 240,
        image: images.arizonaSingle,
        altImage: images.arizonaSingle2,
        thirdImage: images.arizonaSingle3,
        specs: { Dimensions: "3' × 6'3\"", Material: "Wooden slatted", Color: "Natural Oak" },
      },
      {
        size: "Small Double",
        price: 255,
        image: images.arizonaDouble,
        altImage: images.arizonaDouble2,
        thirdImage: images.arizonaDouble3,
        specs: { Dimensions: "4' × 6'3\"", Material: "Wooden slatted", Color: "Natural Oak" },
      },
      {
        size: "Double",
        price: 270,
        image: images.arizonaDouble,
        altImage: images.arizonaDouble2,
        thirdImage: images.arizonaDouble3,
        specs: { Dimensions: "4'6\" × 6'3\"", Material: "Wooden slatted", Color: "Natural Oak" },
      },
      {
        size: "King",
        price: 300,
        image: images.arizonaKing,
        altImage: images.arizonaKing2,
        thirdImage: images.arizonaKing3,
        specs: { Dimensions: "5' × 6'6\"", Material: "Wooden slatted", Color: "Natural Oak" },
      },
      {
        size: "Super King",
        price: 350,
        image: images.arizonaSuperKing,
        altImage: images.arizonaSuperKing2,
        thirdImage: images.arizonaSuperKing3,
        specs: { Dimensions: "6' × 6'6\"", Material: "Wooden slatted", Color: "Natural Oak" },
      },
    ],
    description: "A robust and stylish bed with a distinctive Arizona-inspired design, perfect for modern bedrooms.",
    isNew: true,
  },
  {
    slug: "elara-lounge-sofa",
    name: "Elara Lounge Sofa",
    category: "Living Room",
    basePrice: 128000,
    variants: [
      {
        size: "3 Seater",
        price: 128000,
        image: images.sofa,
        altImage: images.sofa2,
        thirdImage: images.sofa3,
        specs: { Material: "Solid Wood Frame", Seats: "3 Seater", Dimensions: "88 × 36 in", Color: "Warm Ivory", Fabric: "Textured Weave" },
      },
    ],
    description: "A generous contemporary sofa with soft lines and a calm, inviting profile.",
    isNew: true,
  },
  {
    slug: "arco-dining-table",
    name: "Arco Dining Table",
    category: "Dining",
    basePrice: 96000,
    variants: [
      {
        size: "Standard",
        price: 96000,
        image: images.dining,
        altImage: images.dining2,
        thirdImage: images.dining3,
        specs: { Material: "Oak Veneer", Dimensions: "72 × 36 in", Shape: "Rectangular", Color: "Smoked Oak", Finish: "Matte" },
      },
    ],
    description: "A beautifully balanced dining table made for unhurried gatherings.",
  },
  {
    slug: "solace-coffee-table",
    name: "Solace Coffee Table",
    category: "Tables",
    basePrice: 42000,
    variants: [
      {
        size: "Standard",
        price: 42000,
        image: images.table,
        altImage: images.table2,
        thirdImage: images.table3,
        specs: { Material: "Solid Wood", Dimensions: "42 × 24 in", Shape: "Organic", Color: "Walnut", Finish: "Satin" },
      },
    ],
    description: "A grounded coffee table with sculptural presence and natural warmth.",
    isNew: true,
  },
  {
    slug: "lina-oak-chair",
    name: "Lina Oak Chair",
    category: "Seating",
    basePrice: 28500,
    variants: [
      {
        size: "Standard",
        price: 28500,
        image: images.chair,
        altImage: images.chair2,
        thirdImage: images.chair3,
        specs: { Material: "Solid Oak", Dimensions: "31 × 20 in", Color: "Natural", Finish: "Hand-rubbed", Condition: "New" },
      },
    ],
    description: "A refined dining chair with an honest silhouette and thoughtful comfort.",
  },
  {
    slug: "haven-bedside-table",
    name: "Haven Bedside Table",
    category: "Bedroom",
    basePrice: 32000,
    variants: [
      {
        size: "Standard",
        price: 32000,
        image: images.bedside,
        altImage: images.bedside2,
        thirdImage: images.bedside3,
        specs: { Material: "Oak Veneer", Dimensions: "22 × 18 in", Color: "Light Oak", Finish: "Matte", Condition: "New" },
      },
    ],
    description: "A quiet bedside companion with generous storage and beautiful grain.",
  },
  {
    slug: "mira-occasional-chair",
    name: "Mira Occasional Chair",
    category: "Seating",
    basePrice: 47500,
    variants: [
      {
        size: "Standard",
        price: 47500,
        image: images.occasional,
        altImage: images.occasional2,
        thirdImage: images.occasional3,
        specs: { Material: "Wood Frame", Dimensions: "30 × 32 in", Color: "Sand", Fabric: "Performance Bouclé", Condition: "New" },
      },
    ],
    description: "An accent chair with soft geometry, made for slow and comfortable moments.",
  },
  {
    slug: "atelier-console",
    name: "Atelier Console",
    category: "Tables",
    basePrice: 58000,
    variants: [
      {
        size: "Standard",
        price: 58000,
        image: images.console,
        altImage: images.console2,
        thirdImage: images.console3,
        specs: { Material: "Solid Wood", Dimensions: "54 × 14 in", Color: "Honey Oak", Finish: "Natural Oil", Condition: "New" },
      },
    ],
    description: "A slender oak console that brings effortless order to an entrance or living space.",
  },
];

export { images, products };
export type { Product, ProductVariant };