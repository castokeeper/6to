export interface Hotspot {
  id: string;
  x: number; // percentage
  y: number; // percentage
  item: string;
  source: string;
  price?: string;
}

export interface Post {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  author: {
    name: string;
    avatar: string;
  };
  likes: number;
  isLiked: boolean;
  tags: string[];
  materials: string[];
  hotspots: Hotspot[];
  aspectRatio: number; // width/height
  createdAt: string;
}

export interface MoodBubble {
  id: string;
  name: string;
  imageUrl: string;
  postCount: number;
}

export const categories = [
  "all spaces",
  "living room",
  "bedroom",
  "kitchen",
  "bathroom",
  "velvets",
  "brutalist",
  "scandinavian",
  "bohemian",
  "mid-century",
  "japandi",
  "industrial"
];

export const moodBubbles: MoodBubble[] = [
  { id: "1", name: "warm tones", imageUrl: "https://images.unsplash.com/photo-1615877514364-19934dc4143b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", postCount: 24 },
  { id: "2", name: "minimalist", imageUrl: "https://images.unsplash.com/photo-1705321963943-de94bb3f0dd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", postCount: 18 },
  { id: "3", name: "textured", imageUrl: "https://images.unsplash.com/photo-1758855284310-ba961fb5fa2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", postCount: 32 },
  { id: "4", name: "monochrome", imageUrl: "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", postCount: 15 },
  { id: "5", name: "organic", imageUrl: "https://images.unsplash.com/photo-1709346739762-e8ecacc96e0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", postCount: 27 }
];

export const mockPosts: Post[] = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1705321963943-de94bb3f0dd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtaW5pbWFsaXN0JTIwbGl2aW5nJTIwcm9vbXxlbnwxfHx8fDE3NzYzMTU3NDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Monochrome Serenity",
    description: "A study in restraint—where light and shadow define the space. Featuring custom oak joinery and hand-tufted wool.",
    author: {
      name: "Elena Martinez",
      avatar: "EM"
    },
    likes: 342,
    isLiked: false,
    tags: ["living room", "minimalist", "scandinavian"],
    materials: ["oak veneer", "linen", "wool", "concrete"],
    hotspots: [
      { id: "h1", x: 30, y: 45, item: "Modular Sofa", source: "Muuto", price: "$3,200" },
      { id: "h2", x: 60, y: 70, item: "Coffee Table", source: "Custom", price: "$1,800" },
      { id: "h3", x: 15, y: 30, item: "Pendant Light", source: "Flos" }
    ],
    aspectRatio: 1.5,
    createdAt: "2026-04-14"
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1758855284310-ba961fb5fa2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnRlcmlvciUyMGRlc2lnbiUyMGJlZHJvb20lMjB2ZWx2ZXR8ZW58MXx8fHwxNzc2MzYwNTU5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Velvet Dreams",
    description: "Luxurious tactility meets muted elegance. Deep emerald velvet against warm oak creates an intimate refuge.",
    author: {
      name: "James Liu",
      avatar: "JL"
    },
    likes: 518,
    isLiked: true,
    tags: ["bedroom", "velvets", "mid-century"],
    materials: ["velvet", "brass", "oak", "marble"],
    hotspots: [
      { id: "h4", x: 50, y: 60, item: "Velvet Headboard", source: "Anthropologie", price: "$1,450" },
      { id: "h5", x: 25, y: 40, item: "Brass Sconce", source: "West Elm" }
    ],
    aspectRatio: 0.8,
    createdAt: "2026-04-13"
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1761683369185-20ab99d43889?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicnV0YWxpc3QlMjBhcmNoaXRlY3R1cmUlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzYzNDg1MDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Concrete Poetry",
    description: "Raw materiality as art. Exposed aggregate walls frame minimalist furnishings in this brutalist haven.",
    author: {
      name: "Sofia Andersen",
      avatar: "SA"
    },
    likes: 289,
    isLiked: false,
    tags: ["brutalist", "industrial"],
    materials: ["concrete", "steel", "leather"],
    hotspots: [
      { id: "h6", x: 40, y: 55, item: "Leather Chair", source: "Fritz Hansen", price: "$2,100" }
    ],
    aspectRatio: 1.33,
    createdAt: "2026-04-12"
  },
  {
    id: "4",
    imageUrl: "https://images.unsplash.com/photo-1665771080265-62e101266dd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2FuZGluYXZpYW4lMjBraXRjaGVuJTIwZGVzaWdufGVufDF8fHx8MTc3NjI1MTE0Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Nordic Light",
    description: "A kitchen where function and beauty converge. White oak cabinetry paired with honed marble counters.",
    author: {
      name: "Lars Bergström",
      avatar: "LB"
    },
    likes: 421,
    isLiked: true,
    tags: ["kitchen", "scandinavian"],
    materials: ["oak", "marble", "ceramic", "brass"],
    hotspots: [
      { id: "h7", x: 50, y: 50, item: "Pendant Lights", source: "Muuto", price: "$890" },
      { id: "h8", x: 70, y: 60, item: "Bar Stools", source: "Hay" }
    ],
    aspectRatio: 1.5,
    createdAt: "2026-04-11"
  },
  {
    id: "5",
    imageUrl: "https://images.unsplash.com/photo-1615877514364-19934dc4143b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib2hlbWlhbiUyMGludGVyaW9yJTIwc3R5bGluZ3xlbnwxfHx8fDE3NzYyNjg1MDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Layered Narratives",
    description: "Bohemian eclecticism with a modern edit. Vintage textiles and artisan ceramics compose a lived-in sanctuary.",
    author: {
      name: "Amara Singh",
      avatar: "AS"
    },
    likes: 612,
    isLiked: false,
    tags: ["bohemian", "living room"],
    materials: ["rattan", "jute", "terracotta", "cotton"],
    hotspots: [
      { id: "h9", x: 35, y: 40, item: "Rattan Chair", source: "Vintage" },
      { id: "h10", x: 55, y: 65, item: "Kilim Rug", source: "Etsy", price: "$780" }
    ],
    aspectRatio: 1.2,
    createdAt: "2026-04-10"
  },
  {
    id: "6",
    imageUrl: "https://images.unsplash.com/photo-1709346739762-e8ecacc96e0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWRjZW50dXJ5JTIwbW9kZXJuJTIwZnVybml0dXJlfGVufDF8fHx8MTc3NjMyODM5NXww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Mid-Century Revival",
    description: "Classic silhouettes reinterpreted. Walnut credenza and sculptural seating anchor this timeless composition.",
    author: {
      name: "Marcus Chen",
      avatar: "MC"
    },
    likes: 395,
    isLiked: true,
    tags: ["mid-century", "living room"],
    materials: ["walnut", "teak", "leather", "brass"],
    hotspots: [
      { id: "h11", x: 45, y: 50, item: "Lounge Chair", source: "Herman Miller", price: "$4,200" },
      { id: "h12", x: 70, y: 55, item: "Credenza", source: "West Elm", price: "$1,999" }
    ],
    aspectRatio: 1.4,
    createdAt: "2026-04-09"
  },
  {
    id: "7",
    imageUrl: "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmRpJTIwaW50ZXJpb3IlMjBkZXNpZ258ZW58MXx8fHwxNzc2MzQ1MDgzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Wabi-Sabi Essence",
    description: "Japanese minimalism meets Scandinavian warmth. Natural linen, ceramic, and paper create meditative calm.",
    author: {
      name: "Yuki Tanaka",
      avatar: "YT"
    },
    likes: 478,
    isLiked: false,
    tags: ["japandi", "living room"],
    materials: ["linen", "ceramic", "paper", "ash wood"],
    hotspots: [
      { id: "h13", x: 40, y: 45, item: "Paper Lamp", source: "Isamu Noguchi", price: "$650" },
      { id: "h14", x: 60, y: 70, item: "Low Table", source: "Custom" }
    ],
    aspectRatio: 1.5,
    createdAt: "2026-04-08"
  },
  {
    id: "8",
    imageUrl: "https://images.unsplash.com/photo-1652716279221-439c33c3b835?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwbG9mdCUyMGludGVyaW9yfGVufDF8fHx8MTc3NjMxMTM2NHww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Industrial Loft",
    description: "Urban edge softened by natural textures. Exposed brick and steel beams contrast plush textiles.",
    author: {
      name: "Alex Rodriguez",
      avatar: "AR"
    },
    likes: 356,
    isLiked: true,
    tags: ["industrial", "living room"],
    materials: ["brick", "steel", "leather", "wool"],
    hotspots: [
      { id: "h15", x: 50, y: 55, item: "Industrial Shelving", source: "Restoration Hardware" }
    ],
    aspectRatio: 0.75,
    createdAt: "2026-04-07"
  },
  {
    id: "9",
    imageUrl: "https://images.unsplash.com/photo-1658760046471-896cbc719c9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYXRocm9vbSUyMG1hcmJsZXxlbnwxfHx8fDE3NzYzMDk0OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Marble Sanctuary",
    description: "Opulent yet serene. Book-matched marble slabs and brushed brass fixtures define luxury.",
    author: {
      name: "Isabella Costa",
      avatar: "IC"
    },
    likes: 523,
    isLiked: false,
    tags: ["bathroom"],
    materials: ["marble", "brass", "glass"],
    hotspots: [
      { id: "h16", x: 50, y: 50, item: "Freestanding Tub", source: "Waterworks", price: "$8,500" }
    ],
    aspectRatio: 1.33,
    createdAt: "2026-04-06"
  },
  {
    id: "10",
    imageUrl: "https://images.unsplash.com/photo-1730832970158-152ffa2307e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwcmVhZGluZyUyMG5vb2t8ZW58MXx8fHwxNzc2MzIyMjAxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Reading Retreat",
    description: "A corner dedicated to quiet contemplation. Soft lighting and tactile fabrics encourage slow living.",
    author: {
      name: "Olivia Park",
      avatar: "OP"
    },
    likes: 445,
    isLiked: true,
    tags: ["living room", "scandinavian"],
    materials: ["wool", "linen", "oak"],
    hotspots: [
      { id: "h17", x: 40, y: 50, item: "Reading Chair", source: "Article", price: "$1,299" }
    ],
    aspectRatio: 0.8,
    createdAt: "2026-04-05"
  },
  {
    id: "11",
    imageUrl: "https://images.unsplash.com/photo-1685644201646-9e836c398c92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBkaW5pbmclMjByb29tfGVufDF8fHx8MTc3NjMwMjA0M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Dining Elegance",
    description: "Contemporary dining space with architectural lighting and sculptural furniture pieces.",
    author: {
      name: "David Kim",
      avatar: "DK"
    },
    likes: 387,
    isLiked: false,
    tags: ["kitchen"],
    materials: ["oak", "steel", "glass"],
    hotspots: [
      { id: "h18", x: 50, y: 40, item: "Chandelier", source: "Roll & Hill", price: "$3,800" }
    ],
    aspectRatio: 1.5,
    createdAt: "2026-04-04"
  },
  {
    id: "12",
    imageUrl: "https://images.unsplash.com/photo-1769008301910-c69807d0c736?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZW50cnl3YXklMjBkZXNpZ258ZW58MXx8fHwxNzc2MjY4NTE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "First Impressions",
    description: "An entryway that sets the tone. Clean lines and curated objects welcome with intention.",
    author: {
      name: "Emma Wilson",
      avatar: "EW"
    },
    likes: 298,
    isLiked: false,
    tags: ["minimalist"],
    materials: ["marble", "oak", "brass"],
    hotspots: [
      { id: "h19", x: 30, y: 50, item: "Console Table", source: "CB2", price: "$899" }
    ],
    aspectRatio: 1.2,
    createdAt: "2026-04-03"
  }
];
