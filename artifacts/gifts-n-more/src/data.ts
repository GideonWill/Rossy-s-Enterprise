export interface Product {
  id: string;
  name: string;
  price: number;
  priceStr: string;
  image: string;
  isOutOfStock: boolean;
  category: string;
  isFeatured?: boolean;
}

export const heroImage = "https://static.wixstatic.com/media/93ba99_0546803116844e9e938bdde5aefd823e~mv2.jpg/v1/fill/w_1905,h_631,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/93ba99_0546803116844e9e938bdde5aefd823e~mv2.jpg";

export const products: Product[] = [
  {
    id: "p1",
    name: "Performance Polo Shirt XL Size",
    price: 350,
    priceStr: "GH₵350.00",
    image: "https://static.wixstatic.com/media/93ba99_b8f1843b7866470c83e7ac2c39dcde97~mv2.jpeg/v1/fill/w_401,h_534,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/93ba99_b8f1843b7866470c83e7ac2c39dcde97~mv2.jpeg",
    isOutOfStock: false,
    category: "Fashion & Accessories",
    isFeatured: true
  },
  {
    id: "p2",
    name: "Lexiart Polo Shirt Medium Size",
    price: 350,
    priceStr: "GH₵350.00",
    image: "https://static.wixstatic.com/media/93ba99_15fca383db984c9cb470e933b5c7410b~mv2.jpeg/v1/fill/w_401,h_534,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/93ba99_15fca383db984c9cb470e933b5c7410b~mv2.jpeg",
    isOutOfStock: false,
    category: "Fashion & Accessories",
    isFeatured: true
  },
  {
    id: "p3",
    name: "She's A Lady Gift Package",
    price: 1028,
    priceStr: "GH₵1,028.00",
    image: "https://static.wixstatic.com/media/93ba99_d0e0f69d4c9c4b78a383e5c5a45f0beb~mv2.jpeg/v1/fill/w_401,h_534,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/93ba99_d0e0f69d4c9c4b78a383e5c5a45f0beb~mv2.jpeg",
    isOutOfStock: false,
    category: "Gift Packages",
    isFeatured: true
  },
  {
    id: "p4",
    name: "Cozy Adult Memory Foam Slippers",
    price: 199,
    priceStr: "GH₵199.00",
    image: "https://static.wixstatic.com/media/93ba99_95e2c0333e2746c9ab727433f4d42267~mv2.jpeg/v1/fill/w_401,h_534,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/93ba99_95e2c0333e2746c9ab727433f4d42267~mv2.jpeg",
    isOutOfStock: true,
    category: "Fashion & Accessories",
    isFeatured: true
  },
  {
    id: "p5",
    name: "Stitch Key Chain with 3 lip balm Set",
    price: 110,
    priceStr: "GH₵110.00",
    image: "https://static.wixstatic.com/media/93ba99_a448a4d8f73e49de826542d13decdff5~mv2.jpeg/v1/fill/w_401,h_534,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/93ba99_a448a4d8f73e49de826542d13decdff5~mv2.jpeg",
    isOutOfStock: false,
    category: "Jewelry"
  },
  {
    id: "p6",
    name: "Johnson Parker Hand Cream and Body Oil Set",
    price: 99,
    priceStr: "GH₵99.00",
    image: "https://static.wixstatic.com/media/93ba99_9b5bb32b82c14a358d5de221c70386e6~mv2.jpeg/v1/fill/w_401,h_534,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/93ba99_9b5bb32b82c14a358d5de221c70386e6~mv2.jpeg",
    isOutOfStock: false,
    category: "Home & Fragrance"
  },
  {
    id: "p7",
    name: "SHOWHOUSE NOIR & BLANC Scented Reed Diffuser",
    price: 190,
    priceStr: "GH₵190.00",
    image: "https://static.wixstatic.com/media/93ba99_570d8d7fe68c4e3580c3b789b927c7fb~mv2.jpeg/v1/fill/w_401,h_534,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/93ba99_570d8d7fe68c4e3580c3b789b927c7fb~mv2.jpeg",
    isOutOfStock: false,
    category: "Home & Fragrance"
  },
  {
    id: "p8",
    name: "Blue Black Tommy Hilfiger Polo Shirt",
    price: 580,
    priceStr: "GH₵580.00",
    image: "https://static.wixstatic.com/media/93ba99_3f53013057da4cb7b39882a509b76a64~mv2.jpeg/v1/fill/w_401,h_534,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/93ba99_3f53013057da4cb7b39882a509b76a64~mv2.jpeg",
    isOutOfStock: false,
    category: "Fashion & Accessories"
  },
  {
    id: "p9",
    name: "Tommy Hilfiger Tote Bag",
    price: 980,
    priceStr: "GH₵980.00",
    image: "https://static.wixstatic.com/media/93ba99_78890b5ffd7a420fb9ac1d78467cb803~mv2.jpeg/v1/fill/w_401,h_534,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/93ba99_78890b5ffd7a420fb9ac1d78467cb803~mv2.jpeg",
    isOutOfStock: false,
    category: "Fashion & Accessories"
  },
  {
    id: "p10",
    name: "Luxie 3 wick huge scented candle",
    price: 450,
    priceStr: "GH₵450.00",
    image: "https://static.wixstatic.com/media/93ba99_d3156e6d44a54710988d26007b610717~mv2.jpeg/v1/fill/w_401,h_534,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/93ba99_d3156e6d44a54710988d26007b610717~mv2.jpeg",
    isOutOfStock: false,
    category: "Home & Fragrance"
  },
  {
    id: "p11",
    name: "Love Mummy Hamper",
    price: 1150,
    priceStr: "GH₵1,150.00",
    image: "https://static.wixstatic.com/media/93ba99_611139be8efe4df58d7fc3c758f70547~mv2.jpg/v1/fill/w_401,h_534,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/93ba99_611139be8efe4df58d7fc3c758f70547~mv2.jpg",
    isOutOfStock: false,
    category: "Gift Packages"
  },
  {
    id: "p12",
    name: "CZ clear stone gold Bracelet",
    price: 250,
    priceStr: "GH₵250.00",
    image: "https://static.wixstatic.com/media/93ba99_51410a21a18d453db3d77bdde1abd3f2~mv2.jpg/v1/fill/w_401,h_401,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/93ba99_51410a21a18d453db3d77bdde1abd3f2~mv2.jpg",
    isOutOfStock: true,
    category: "Jewelry"
  },
  {
    id: "p13",
    name: "Rihanna Reb'l Fleur Perfume Set",
    price: 2020,
    priceStr: "GH₵2,020.00",
    image: "https://static.wixstatic.com/media/93ba99_d1cfa1447dbc4e45bf142d715798baed~mv2.jpeg/v1/fill/w_401,h_534,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/93ba99_d1cfa1447dbc4e45bf142d715798baed~mv2.jpeg",
    isOutOfStock: true,
    category: "Gift Packages"
  },
  {
    id: "p14",
    name: "Clothe, Scarf, Twix Mum delight package",
    price: 423,
    priceStr: "GH₵423.00",
    image: "https://static.wixstatic.com/media/93ba99_d671e04c57df45a6a7172ff332fe2902~mv2.jpeg/v1/fill/w_401,h_534,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/93ba99_d671e04c57df45a6a7172ff332fe2902~mv2.jpeg",
    isOutOfStock: false,
    category: "Gift Packages"
  },
  {
    id: "p15",
    name: "Beautiful Unique tea cup Mug",
    price: 95,
    priceStr: "GH₵95.00",
    image: "https://static.wixstatic.com/media/93ba99_d5ea500099fc4e16832db573f280d532~mv2.jpeg/v1/fill/w_401,h_534,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/93ba99_d5ea500099fc4e16832db573f280d532~mv2.jpeg",
    isOutOfStock: false,
    category: "Mugs & Tea Sets"
  },
  {
    id: "p16",
    name: "Beautiful Unique tea cup set",
    price: 250,
    priceStr: "GH₵250.00",
    image: "https://static.wixstatic.com/media/93ba99_edaf1ab1feba49a09bcf57e412844813~mv2.jpeg/v1/fill/w_401,h_401,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/93ba99_edaf1ab1feba49a09bcf57e412844813~mv2.jpeg",
    isOutOfStock: false,
    category: "Mugs & Tea Sets"
  },
  {
    id: "p17",
    name: "Hallmark Medium Gift Boxes with Lids",
    price: 28,
    priceStr: "GH₵28.00",
    image: "https://static.wixstatic.com/media/93ba99_1ef9e3f722b849a6b90792ec5e484ed1~mv2.jpeg/v1/fill/w_401,h_401,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/93ba99_1ef9e3f722b849a6b90792ec5e484ed1~mv2.jpeg",
    isOutOfStock: false,
    category: "Gift Boxes"
  },
  {
    id: "p18",
    name: "Rosegold Large Gift Box with Lids",
    price: 30,
    priceStr: "GH₵30.00",
    image: "https://static.wixstatic.com/media/93ba99_83297ed2e0ca442da585a4698e288390~mv2.jpeg/v1/fill/w_401,h_401,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/93ba99_83297ed2e0ca442da585a4698e288390~mv2.jpeg",
    isOutOfStock: false,
    category: "Gift Boxes"
  },
  {
    id: "p19",
    name: "Round Shaped Gift Box",
    price: 40,
    priceStr: "From GH₵40.00",
    image: "https://static.wixstatic.com/media/93ba99_a1b5eff68aea4903924dbdf3c7675179~mv2.jpeg/v1/fill/w_401,h_900,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/93ba99_a1b5eff68aea4903924dbdf3c7675179~mv2.jpeg",
    isOutOfStock: false,
    category: "Gift Boxes"
  },
  {
    id: "p20",
    name: "Pretty Lady Package for Her",
    price: 330,
    priceStr: "GH₵330.00",
    image: "https://static.wixstatic.com/media/93ba99_2ff491b74b074765b46796f7ec214e88~mv2.jpeg/v1/fill/w_401,h_534,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/93ba99_2ff491b74b074765b46796f7ec214e88~mv2.jpeg",
    isOutOfStock: true,
    category: "Gift Packages"
  }
];

export const categories = [
  "Gift Packages",
  "Fashion & Accessories",
  "Home & Fragrance",
  "Jewelry",
  "Gift Boxes",
  "Mugs & Tea Sets"
];
