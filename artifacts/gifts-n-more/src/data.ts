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

export const heroImage = "/hero_banner.png"; // Placeholder, will be overriden in Home.tsx or used as fallback

export const categories = [
  "Gifts For Her",
  "Gifts For Him",
  "Jewelery",
  "Mothers Day / Gifts For Mum",
  "Father's Day/ Gifts For Dad",
  "Graduation / Congratulation Packages",
  "Ramadan",
  "Valentine’s Day",
  "Teddy Bears",
  "Perfume, Bath & Body For Him",
  "Perfume, Bath & Body For Her",
  "Other Gift Items",
  "Christmas Gifts & Hampers",
  "Bouquets",
  "Chocolate & Drinks",
  "Anniversary",
  "Kids Gifts",
  "Sorry Gifts",
  "Cakes Tools",
  "Balloons",
  "Gift Boxes",
  "Packaging Accessories",
  "Birthdays Cards",
  "Christmas Cards",
  "Congratulations Cards",
  "Anniversary Cards",
  "Valentine’s Day Cards",
  "Sympathy Cards",
  "Thank You Cards",
  "Blank Cards",
  "Good luck Cards",
  "Get Well Soon Cards"
];

export const products: Product[] = [
  {
    id: "p1",
    name: "Premium Men's Watch & Accessories Box Set",
    price: 950,
    priceStr: "GH₵950.00",
    image: "/him_1.png",
    isOutOfStock: false,
    category: "Gifts For Him",
    isFeatured: true
  },
  {
    id: "p2",
    name: "Classic Leather Gentlemen's Gift Box",
    price: 850,
    priceStr: "GH₵850.00",
    image: "/him_2.png",
    isOutOfStock: false,
    category: "Father's Day/ Gifts For Dad",
    isFeatured: true
  },
  {
    id: "p3",
    name: "She’s A Lady Gift Package",
    price: 1028,
    priceStr: "GH₵1,028.00",
    image: "https://static.wixstatic.com/media/93ba99_d0e0f69d4c9c4b78a383e5c5a45f0beb~mv2.jpeg/v1/fill/w_401,h_534,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/93ba99_d0e0f69d4c9c4b78a383e5c5a45f0beb~mv2.jpeg",
    isOutOfStock: false,
    category: "Gifts For Her",
    isFeatured: true
  },
  {
    id: "p4",
    name: "Luxury Gold Necklace & Earring Set",
    price: 499,
    priceStr: "GH₵499.00",
    image: "/jewelry_1.jpg",
    isOutOfStock: false,
    category: "Jewelery",
    isFeatured: true
  },
  {
    id: "p5",
    name: "Golden Sun Pendant and Earring Combo",
    price: 310,
    priceStr: "GH₵310.00",
    image: "/jewelry_2.png",
    isOutOfStock: false,
    category: "Jewelery"
  },
  {
    id: "p6",
    name: "Johnson Parker Hand Cream and Body Oil Set",
    price: 99,
    priceStr: "GH₵99.00",
    image: "https://static.wixstatic.com/media/93ba99_9b5bb32b82c14a358d5de221c70386e6~mv2.jpeg/v1/fill/w_401,h_534,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/93ba99_9b5bb32b82c14a358d5de221c70386e6~mv2.jpeg",
    isOutOfStock: false,
    category: "Perfume, Bath & Body For Her"
  },
  {
    id: "p7",
    name: "Bold Geometric Gold Choker Set",
    price: 520,
    priceStr: "GH₵520.00",
    image: "/jewelry_3.jpg",
    isOutOfStock: false,
    category: "Jewelery"
  },
  {
    id: "p8",
    name: "Luxury Sunglasses & Wallet Set",
    price: 680,
    priceStr: "GH₵680.00",
    image: "/him_3.png",
    isOutOfStock: false,
    category: "Gifts For Him"
  },
  {
    id: "p9",
    name: "Men's Premium Watch & Chain Box",
    price: 1150,
    priceStr: "GH₵1,150.00",
    image: "/jewelry_4.png",
    isOutOfStock: false,
    category: "Jewelery"
  },
  {
    id: "p10",
    name: "Luxie 3 wick huge scented candle in gold color metal container",
    price: 450,
    priceStr: "GH₵450.00",
    image: "https://static.wixstatic.com/media/93ba99_d3156e6d44a54710988d26007b610717~mv2.jpeg/v1/fill/w_401,h_534,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/93ba99_d3156e6d44a54710988d26007b610717~mv2.jpeg",
    isOutOfStock: false,
    category: "Anniversary"
  },
  {
    id: "p11",
    name: "Love Mummy Hamper",
    price: 1150,
    priceStr: "GH₵1,150.00",
    image: "https://static.wixstatic.com/media/93ba99_611139be8efe4df58d7fc3c758f70547~mv2.jpg/v1/fill/w_401,h_534,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/93ba99_611139be8efe4df58d7fc3c758f70547~mv2.jpg",
    isOutOfStock: false,
    category: "Mothers Day / Gifts For Mum"
  },
  {
    id: "p12",
    name: "OLEVS Classic Blue & Gold Men's Watch",
    price: 450,
    priceStr: "GH₵450.00",
    image: "/jewelry_5.jpg",
    isOutOfStock: false,
    category: "Jewelery"
  },
  {
    id: "p13",
    name: "Amore690 Grooming & Fragrance Box for Men",
    price: 1200,
    priceStr: "GH₵1,200.00",
    image: "/him_4.png",
    isOutOfStock: false,
    category: "Gifts For Him"
  },
  {
    id: "p14",
    name: "Clothe, Scarf, Twix Mum delight package",
    price: 423,
    priceStr: "GH₵423.00",
    image: "https://static.wixstatic.com/media/93ba99_d671e04c57df45a6a7172ff332fe2902~mv2.jpeg/v1/fill/w_401,h_534,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/93ba99_d671e04c57df45a6a7172ff332fe2902~mv2.jpeg",
    isOutOfStock: false,
    category: "Mothers Day / Gifts For Mum"
  },
  {
    id: "p15",
    name: "Beautiful Unique tea cup Mug with matching gift bag",
    price: 95,
    priceStr: "GH₵95.00",
    image: "https://static.wixstatic.com/media/93ba99_d5ea500099fc4e16832db573f280d532~mv2.jpeg/v1/fill/w_401,h_534,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/93ba99_d5ea500099fc4e16832db573f280d532~mv2.jpeg",
    isOutOfStock: false,
    category: "Thank You Cards"
  },
  {
    id: "p16",
    name: "Sexy Man Parfum & Accessories Combo",
    price: 750,
    priceStr: "GH₵750.00",
    image: "/him_5.jpg",
    isOutOfStock: false,
    category: "Perfume, Bath & Body For Him"
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
    category: "Packaging Accessories"
  },
  {
    id: "p20",
    name: "Pretty Lady Package for Her Clutch purse, Unique Mug and Chocolate",
    price: 330,
    priceStr: "GH₵330.00",
    image: "https://static.wixstatic.com/media/93ba99_2ff491b74b074765b46796f7ec214e88~mv2.jpeg/v1/fill/w_401,h_534,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/93ba99_2ff491b74b074765b46796f7ec214e88~mv2.jpeg",
    isOutOfStock: true,
    category: "Gifts For Her"
  },
  {
    id: "p21",
    name: "Classic Red Rose Graduation Bouquet",
    price: 350,
    priceStr: "GH₵350.00",
    image: "/grad_1.png",
    isOutOfStock: false,
    category: "Graduation / Congratulation Packages"
  },
  {
    id: "p22",
    name: "Elegant Black & Red Rose Graduation Special",
    price: 450,
    priceStr: "GH₵450.00",
    image: "/grad_2.jpg",
    isOutOfStock: false,
    category: "Graduation / Congratulation Packages"
  },
  {
    id: "p23",
    name: "Heart-Shaped Bouquet with Grand Balloons & Teddy",
    price: 1500,
    priceStr: "GH₵1,500.00",
    image: "/grad_3.jpg",
    isOutOfStock: false,
    category: "Graduation / Congratulation Packages"
  },
  {
    id: "p24",
    name: "Extravagant Grand Rose Bouquet & Luxury Gift",
    price: 2500,
    priceStr: "GH₵2,500.00",
    image: "/grad_4.png",
    isOutOfStock: false,
    category: "Graduation / Congratulation Packages"
  },
  {
    id: "p25",
    name: "Luxury Raymond Watch & Perfume Congratulation Box",
    price: 1150,
    priceStr: "GH₵1,150.00",
    image: "/grad_5.jpg",
    isOutOfStock: false,
    category: "Graduation / Congratulation Packages",
    isFeatured: true
  },
  {
    id: "p26",
    name: "Luxury Ramadan Essentials Hamper",
    price: 650,
    priceStr: "GH₵650.00",
    image: "/ramadan_1.jpg",
    isOutOfStock: false,
    category: "Ramadan"
  },
  {
    id: "p27",
    name: "Premium Ramadan Snack & Nuts Basket",
    price: 850,
    priceStr: "GH₵850.00",
    image: "/ramadan_2.jpg",
    isOutOfStock: false,
    category: "Ramadan"
  },
  {
    id: "p28",
    name: "Fresh Fruits Iftar Basket with Watermelon",
    price: 550,
    priceStr: "GH₵550.00",
    image: "/ramadan_3.jpg",
    isOutOfStock: false,
    category: "Ramadan"
  },
  {
    id: "p29",
    name: "Grand Fruit & Snack Iftar Basket with Bananas",
    price: 750,
    priceStr: "GH₵750.00",
    image: "/ramadan_4.jpg",
    isOutOfStock: false,
    category: "Ramadan"
  },
  {
    id: "p30",
    name: "Classic Fresh Apples & Grapes Ramadan Treat",
    price: 450,
    priceStr: "GH₵450.00",
    image: "/ramadan_5.jpg",
    isOutOfStock: false,
    category: "Ramadan",
    isFeatured: true
  },
  {
    id: "p31",
    name: "Love Custom Photo Box & Red Roses",
    price: 950,
    priceStr: "GH₵950.00",
    image: "/val_1.png",
    isOutOfStock: false,
    category: "Valentine’s Day"
  },
  {
    id: "p32",
    name: "Heart Box with Teddy Bear & Jewelry",
    price: 1150,
    priceStr: "GH₵1,150.00",
    image: "/val_2.jpg",
    isOutOfStock: false,
    category: "Valentine’s Day"
  },
  {
    id: "p33",
    name: "Romantic Heart Box with Teddy & Chocolates",
    price: 850,
    priceStr: "GH₵850.00",
    image: "/val_3.png",
    isOutOfStock: false,
    category: "Valentine’s Day"
  },
  {
    id: "p34",
    name: "Grand Red Bear with Perfume & Roses",
    price: 3200,
    priceStr: "GH₵3,200.00",
    image: "/val_4.jpg",
    isOutOfStock: false,
    category: "Valentine’s Day"
  },
  {
    id: "p35",
    name: "Men's Luxury Valentine Grooming & Rose Box",
    price: 1550,
    priceStr: "GH₵1,550.00",
    image: "/val_5.png",
    isOutOfStock: false,
    category: "Valentine’s Day",
    isFeatured: true
  }
];
