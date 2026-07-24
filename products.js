// ZORO Wear - Premium Product Database
const products = [
  {
    id: "zw-001",
    name: "Adidas Heavyweight Oversized Tee",
    price: 299,
    originalPrice: 399,
    rating: 4.9,
    category: "Oversized T-Shirts",
    sizes: ["M", "L", "XL", "XXL", "XXXL"],
    inStock: true,
    stockCount: 15,
    tag: "BEST SELLER",
    image: "./images/oversize-1.jpeg",
    hoverImage: "./images/oversize-1.jpeg",
    images: [
      "./images/oversize-1.jpeg"
    ],
    description: "Experience effortless style and all-day comfort with the Adidas Oversized T-Shirt. Designed with a relaxed fit and crafted from premium-quality cotton, this tee offers a soft, breathable feel that's perfect for everyday wear.",
    features: [
      "240 GSM Heavyweight Terry Cotton",
      "Signature Drop-Shoulder Relaxed Fit",
      "Pre-shrunk & Silicone Washed for ultra softness",
      "Minimalist tonal neck ribbing"
    ]
  },
  {
    id: "zw-002",
    name: "True Breed Graphic Tee",
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    category: "Oversized T-Shirts",
    sizes: ["M", "L", "XL", "XXL"],
    inStock: true,
    stockCount: 8,
    tag: "NEW DROP",
    image: "./images/oversize-2.jpeg",
    hoverImage: "./images/oversize-2.jpeg",
    images: [
      "./images/oversize-2.jpeg",
    ],
    description: "An absolute essential in deep true breed black. Features subtle typography art representing modern urban exploration. Heavy-knit feel designed to drape perfectly on the body.",
    features: [
      "240 GSM Premium Organic Cotton",
      "High-density silk-screen back print",
      "Ribbed crewneck collar",
      "Fade-resistant styling"
    ]
  },
  {
    id: "zw-003",
    name: "Brasil Oversized Tee",
    price: 299,
    originalPrice: 399,
    rating: 4.7,
    category: "Oversized T-Shirts",
    sizes: ["M", "L", "XL", "XXL"],
    inStock: true,
    stockCount: 12,
    tag: "LIMITED EDITION",
    image: "./images/oversize-3.jpeg",
    hoverImage: "./images/oversize-3.jpeg",
    images: [
      "./images/oversize-3.jpeg"
    ],
    description: "Dyed with natural minerals, the Brasil tee evokes an earthy warmth. The relaxed shoulder seams provide maximum comfort without sacrificing visual sharpness.",
    features: [
      "Natural mineral dye aesthetic",
      "Premium 100% long-staple cotton",
      "Unisex fit with extended sleeve styling",
      "Reinforced double-needle hem stitching"
    ]
  },
  {
    id: "zw-004",
    name: "Peanuts Oversize Tee",
    price: 299,
    originalPrice: 399,
    rating: 4.9,
    category: "Oversized T-Shirts",
    sizes: ["M", "L", "XL", "XXL"],
    inStock: true,
    stockCount: 4,
    tag: "NEW DROP",
    image: "./images/oversize-4.jpeg",
    hoverImage: "./images/oversize-4.jpeg",
    images: [
      "./images/oversize-4.jpeg",
    ],
    description: "Dyed with natural minerals, the Brasil tee evokes an earthy warmth. The relaxed shoulder seams provide maximum comfort without sacrificing visual sharpness.",
    features: [
      "Natural mineral dye aesthetic",
      "Premium 100% long-staple cotton",
      "Unisex fit with extended sleeve styling",
      "Reinforced double-needle hem stitching"
    ]
  },
  {
    id: "zw-005",
    name: "Black Panther Oversize Tee",
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    category: "Oversized T-Shirts",
    sizes: [ "M", "L", "XL", "XXL"],
    inStock: true,
    stockCount: 19,
    tag: "BEST SELLER",
    image: "./images/oversize-5.jpeg",
    hoverImage: "./images/oversize-5.jpeg",
    images: [
      "./images/oversize-5.jpeg"
    ],
    description: "Dyed with natural minerals, the Black Panther tee evokes an earthy warmth. The relaxed shoulder seams provide maximum comfort without sacrificing visual sharpness.",
    features: [
      "Natural mineral dye aesthetic",
      "Premium 100% long-staple cotton",
      "Unisex fit with extended sleeve styling",
      "Reinforced double-needle hem stitching"
    ]
  },
  {
    id: "zw-006",
    name: "Messi Sport Jersey",
    price: 199,
    originalPrice:249,
    rating: 4.9,
    category: "Football Jerseys",
    sizes: ["M", "L", "XL"],
    inStock: true,
    stockCount: 6,
    tag: "LIMITED EDITION",
    image: "./images/jersey-1.jpeg",
    hoverImage: "./images/jersey-1.jpeg",
    images: [
      "./images/jersey-1.jpeg"
    ],
    description: "The ultimate cross-over between formal luxury and streetwear. Woven from premium breathable waffle-knit cotton, this collar shirt is exceptionally comfortable and elegantly fitted.",
    features: [
      "Vintage athletic jersey mesh",
      "Embossed custom sponsor typography",
      "Retro luxury collar and cuffs",
      "Slightly drop-tail design"
    ]
  },
  {
    id: "zw-007",
    name: "Ronaldo Sport Jersey",
    price: 199,
    originalPrice: 249,
    rating: 4.6,
    category: "Football Jerseys",
    sizes: ["M", "L", "XL"],
    inStock: true,
    stockCount: 11,
    tag: "TODAY'S DEAL",
    image: "./images/jersey-2.jpeg",
    hoverImage: "./images/jersey-2.jpeg",
    images: [
      "./images/jersey-2.jpeg"
    ],
    description: "Designed with a crisp stiff collar and invisible buttons, this clean structured polo provides a sharp modern frame. Ideal for dinner dates or premium workspaces.",
    features: [
      "Premium pique double-weave cotton",
      "Concealed snap-button placket",
      "Side slit ventilation detailing",
      "Anti-curl collar technology"
    ]
  },
  {
    id: "zw-008",
    name: "Plain collar T-Shirts",
    price: 249,
    originalPrice: 299,
    rating: 4.8,
    category: "Collar T-Shirts",
    sizes: ["S", "M", "L"],
    inStock: true,
    stockCount: 7,
    tag: "BEST SELLER",
    image: "./images/collartshirt.jpeg",
    hoverImage: "./images/collartshirt.jpeg",
    images: [
      "./images/collartshirt.jpeg"
    ],
    description: "Tailored joggers featuring heavyweight french terry fleece. A tapered leg silhouette meets relaxed thigh cuts, creating the perfect loungewear-to-street look.",
    features: [
      "320 GSM French Terry Fleece",
      "Flat-knit drawstring with custom metal tips",
      "Hidden side zip pockets for securing items",
      "Thick elasticated ankle cuffs"
    ]
  },
  {
    id: "zw-009",
    name: "3-Line Track",
    price: 199,
    originalPrice: 249,
    rating: 4.7,
    category: "Track Pants",
    sizes: ["M", "L", "XL"],
    inStock: true,
    stockCount: 5,
    tag: "NEW DROP",
    image: "./images/track-1.jpeg",
    hoverImage: "./images/track-1.jpeg",
    images: [
      "./images/track-1.jpeg"
    ],
    description: "Engineered nylon utility track pants featuring multi-pocket cargo storage. Water-repellent finishes and adjustable ankle toggles offer high functionality in modern techwear.",
    features: [
      "Water-repellent stretch nylon fabrication",
      "Ergonomic multi-pocket utility system",
      "Ankle drawcords for flexible styling",
      "Comfort-stretch elastic waistband"
    ]
  },
  {
    id: "zw-010",
    name: "3-Line Shorts",
    price: 149,
    originalPrice: 199,
    rating: 4.8,
    category: "Shorts",
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    stockCount: 14,
    tag: "LIMITED EDITION",
    image: "./images/shorts-1.jpeg",
    hoverImage: "./images/shorts-1.jpeg",
    images: [
      "./images/shorts-1.jpeg"
    ],
    description: "Crafted from pure organic French linen, these lounge shorts feature a breathable construction, customized double lining, and raw-edge seam details for effortless casual dressing.",
    features: [
      "100% French Organic Linen",
      "Soft breathable mesh lining",
      "Aesthetic drawstrings with golden tips",
      "Twin back patch pockets"
    ]
  },
  {
    id: "zw-011",
    name: "Classic Round Neck Tee",
    price: 249,
    originalPrice: 299,
    rating: 4.7,
    category: "Round Neck",
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    stockCount: 4,
    tag: "BEST SELLER",
    image: "./images/roundneck-main.jpeg",
    hoverImage: "./images/roundneck-1.jpeg",
    images: [
      "./images/roundneck-1.jpeg",
    ],
    description: "A timeless classic round neck t-shirt crafted from premium cotton. Perfect for everyday wear with a comfortable regular fit that suits all occasions.",
    features: [
      "240 GSM Premium Cotton",
      "Classic round neck design",
      "Pre-shrunk fabric",
      "Double-stitched hem"
    ]
  },
  {
    id: "zw-012",
    name: "Classic Round Neck Tee",
    price: 249,
    originalPrice: 299,
    rating: 4.7,
    category: "Round Neck",
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    stockCount: 4,
    tag: "BEST SELLER",
    image: "./images/roundneck-main.jpeg",
    hoverImage: "./images/roundneck-2.jpeg",
    images: [
      "./images/roundneck-2.jpeg",
    ],
    description: "A timeless classic round neck t-shirt crafted from premium cotton. Perfect for everyday wear with a comfortable regular fit that suits all occasions.",
    features: [
      "240 GSM Premium Cotton",
      "Classic round neck design",
      "Pre-shrunk fabric",
      "Double-stitched hem"
    ]
  },
  {
    id: "zw-013",
    name: "Classic Round Neck Tee",
    price: 249,
    originalPrice: 299,
    rating: 4.7,
    category: "Round Neck",
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    stockCount: 4,
    tag: "BEST SELLER",
    image: "./images/roundneck-main.jpeg",
    hoverImage: "./images/roundneck-3.jpeg",
    images: [
      "./images/roundneck-3.jpeg",
    ],
    description: "A timeless classic round neck t-shirt crafted from premium cotton. Perfect for everyday wear with a comfortable regular fit that suits all occasions.",
    features: [
      "240 GSM Premium Cotton",
      "Classic round neck design",
      "Pre-shrunk fabric",
      "Double-stitched hem"
    ]
  },
  {
    id: "zw-014",
    name: "Classic Round Neck Tee",
    price: 249,
    originalPrice: 299,
    rating: 4.7,
    category: "Round Neck",
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    stockCount: 4,
    tag: "BEST SELLER",
    image: "./images/roundneck-main.jpeg",
    hoverImage: "./images/roundneck-4.jpeg",
    images: [
      "./images/roundneck-4.jpeg",
    ],
    description: "A timeless classic round neck t-shirt crafted from premium cotton. Perfect for everyday wear with a comfortable regular fit that suits all occasions.",
    features: [
      "240 GSM Premium Cotton",
      "Classic round neck design",
      "Pre-shrunk fabric",
      "Double-stitched hem"
    ]
  },
  {
    id: "zw-015",
    name: "Tecno Digital Print Tee",
    price: 199,
    originalPrice: 299,
    rating: 4.7,
    category: "Tecno",
    sizes: ["M", "L", "XL", "XXL"],
    inStock: true,
    stockCount: 10,
    tag: "NEW DROP",
    image: "./images/tecno-main.jpeg",
    hoverImage: "./images/tecno-1.jpeg",
    images: [
      "./images/tecno-1.jpeg",
    ],
    description: "Futuristic digital print design inspired by technology and innovation. Features bold graphics with a modern aesthetic.",
    features: [
      "240 GSM Tech Cotton",
      "Digital print technology",
      "Modern tech-inspired design",
      "Pre-shrunk fabric"
    ]
  },
  {
    id: "zw-016",
    name: "Tecno Digital Print Tee",
    price: 199,
    originalPrice: 299,
    rating: 4.7,
    category: "Tecno",
    sizes: ["M", "L", "XL", "XXL"],
    inStock: true,
    stockCount: 10,
    tag: "NEW DROP",
    image: "./images/tecno-main.jpeg",
    hoverImage: "./images/tecno-2.jpeg",
    images: [
      "./images/tecno-2.jpeg",
    ],
    description: "Futuristic digital print design inspired by technology and innovation. Features bold graphics with a modern aesthetic.",
    features: [
      "240 GSM Tech Cotton",
      "Digital print technology",
      "Modern tech-inspired design",
      "Pre-shrunk fabric"
    ]
  },
  {
    id: "zw-017",
    name: "Tecno Digital Print Tee",
    price: 199,
    originalPrice: 299,
    rating: 4.7,
    category: "Tecno",
    sizes: ["M", "L", "XL", "XXL"],
    inStock: true,
    stockCount: 10,
    tag: "NEW DROP",
    image: "./images/tecno-main.jpeg",
    hoverImage: "./images/tecno-3.jpeg",
    images: [
      "./images/tecno-3.jpeg"
    ],
    description: "Futuristic digital print design inspired by technology and innovation. Features bold graphics with a modern aesthetic.",
    features: [
      "240 GSM Tech Cotton",
      "Digital print technology",
      "Modern tech-inspired design",
      "Pre-shrunk fabric"
    ]
  },
  {
    id: "zw-018",
    name: "Tecno-Sport Performance Tee",
    price: 199,
    originalPrice: 299,
    rating: 4.9,
    category: "Tecno-Sport",
    sizes: ["M", "L", "XL", "XXL"],
    inStock: true,
    stockCount: 14,
    tag: "BEST SELLER",
    image: "./images/tecnosport-main.jpeg",
    hoverImage: "./images/tecnosport-1.jpeg",
    images: [
      "./images/tecnosport-1.jpeg"
    ],
    description: "High-performance sports tee with moisture-wicking technology. Designed for athletes and active individuals who demand the best.",
    features: [
      "260 GSM Performance Fabric",
      "Moisture-wicking technology",
      "Breathable mesh panels",
      "Anti-odor treatment"
    ]
  },
  {
    id: "zw-019",
    name: "Tecno-Sport Performance Tee",
    price: 199,
    originalPrice: 299,
    rating: 4.9,
    category: "Tecno-Sport",
    sizes: ["M", "L", "XL", "XXL"],
    inStock: true,
    stockCount: 14,
    tag: "BEST SELLER",
    image: "./images/tecnosport-main.jpeg",
    hoverImage: "./images/tecnosport-2.jpeg",
    images: [
      "./images/tecnosport-2.jpeg"
    ],
    description: "High-performance sports tee with moisture-wicking technology. Designed for athletes and active individuals who demand the best.",
    features: [
      "260 GSM Performance Fabric",
      "Moisture-wicking technology",
      "Breathable mesh panels",
      "Anti-odor treatment"
    ]
  },
  {
    id: "zw-020",
    name: "Tecno-Sport Performance Tee",
    price: 199,
    originalPrice: 299,
    rating: 4.9,
    category: "Tecno-Sport",
    sizes: ["M", "L", "XL", "XXL"],
    inStock: true,
    stockCount: 14,
    tag: "BEST SELLER",
    image: "./images/tecnosport-main.jpeg",
    hoverImage: "./images/tecnosport-3.jpeg",
    images: [
      "./images/tecnosport-3.jpeg"
    ],
    description: "High-performance sports tee with moisture-wicking technology. Designed for athletes and active individuals who demand the best.",
    features: [
      "260 GSM Performance Fabric",
      "Moisture-wicking technology",
      "Breathable mesh panels",
      "Anti-odor treatment"
    ]
  },
  {
    id: "zw-021",
    name: "Tecno-Sport Performance Tee",
    price: 199,
    originalPrice: 299,
    rating: 4.9,
    category: "Tecno-Sport",
    sizes: ["M", "L", "XL", "XXL"],
    inStock: true,
    stockCount: 14,
    tag: "BEST SELLER",
    image: "./images/tecnosport-main.jpeg",
    hoverImage: "./images/tecnosport-4.jpeg",
    images: [
      "./images/tecnosport-4.jpeg"
    ],
    description: "High-performance sports tee with moisture-wicking technology. Designed for athletes and active individuals who demand the best.",
    features: [
      "260 GSM Performance Fabric",
      "Moisture-wicking technology",
      "Breathable mesh panels",
      "Anti-odor treatment"
    ]
  },
];
