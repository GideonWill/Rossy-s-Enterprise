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
  },
  {
    id: "p36",
    name: "Azzaro Perfume",
    price: 1200,
    priceStr: "GH₵1,200.00",
    image: "/Azzaro Perfume.jpg",
    isOutOfStock: false,
    category: "Gifts For Him"
  },
  {
    id: "p37",
    name: "Bleu De Chanel",
    price: 2500,
    priceStr: "GH₵2,500.00",
    image: "/Bleu De Chanel.jpg",
    isOutOfStock: false,
    category: "Gifts For Him"
  },
  {
    id: "p38",
    name: "FOGG Scent Perfume",
    price: 350,
    priceStr: "GH₵350.00",
    image: "/FOGG Scent Perfume.jpg",
    isOutOfStock: false,
    category: "Gifts For Him"
  },
  {
    id: "p39",
    name: "Forever Wanted Perfume",
    price: 1800,
    priceStr: "GH₵1,800.00",
    image: "/Forever Wanted Perfume.jpg",
    isOutOfStock: false,
    category: "Gifts For Him"
  },
  {
    id: "p40",
    name: "Gentlemen Givenchy",
    price: 2100,
    priceStr: "GH₵2,100.00",
    image: "/Gentlemen Givenchy.jpg",
    isOutOfStock: false,
    category: "Gifts For Him"
  },
  {
    id: "p41",
    name: "Gucci Guilty",
    price: 2300,
    priceStr: "GH₵2,300.00",
    image: "/Gucci Guilty.jpg",
    isOutOfStock: false,
    category: "Gifts For Him"
  },
  {
    id: "p42",
    name: "Versace Eros Perfume",
    price: 1950,
    priceStr: "GH₵1,950.00",
    image: "/Versace Eros Perfume.jpg",
    isOutOfStock: false,
    category: "Gifts For Him"
  },
  {
    id: "p43",
    name: "Valentino Perfume",
    price: 2600,
    priceStr: "GH₵2,600.00",
    image: "/Valentino Perfume.jpg",
    isOutOfStock: false,
    category: "Gifts For Him"
  },
  {
    id: "p44",
    name: "Spice Bomb Perfume",
    price: 1750,
    priceStr: "GH₵1,750.00",
    image: "/Spice Bomb Perfume.jpg",
    isOutOfStock: false,
    category: "Gifts For Him"
  },
  {
    id: "p45",
    name: "Sauvage Perfume",
    price: 2800,
    priceStr: "GH₵2,800.00",
    image: "/Sauvage Perfume.jpg",
    isOutOfStock: false,
    category: "Gifts For Him"
  },
  {
    id: "p46",
    name: "Hugo Boss Perfume",
    price: 1600,
    priceStr: "GH₵1,600.00",
    image: "/Hugo Boss Perfume.jpg",
    isOutOfStock: false,
    category: "Gifts For Him"
  },
  {
    id: "p47",
    name: "Luxury Pink Rose & Skincare Set",
    price: 1250,
    priceStr: "GH₵1,250.00",
    image: "/Gift for her package set1.jpg",
    isOutOfStock: false,
    category: "Gifts For Her"
  },
  {
    id: "p48",
    name: "Premium Pamper Box with Chocolates",
    price: 1850,
    priceStr: "GH₵1,850.00",
    image: "/Gift for her package set2.jpg",
    isOutOfStock: false,
    category: "Gifts For Her"
  },
  {
    id: "p49",
    name: "Elegant Satin & Fragrance Gift Set",
    price: 950,
    priceStr: "GH₵950.00",
    image: "/Gift for her package set3.jpg",
    isOutOfStock: false,
    category: "Gifts For Her"
  },
  {
    id: "p50",
    name: "Ultimate Relaxation Spa & Treats Box",
    price: 2100,
    priceStr: "GH₵2,100.00",
    image: "/Gift for her package set4.jpg",
    isOutOfStock: false,
    category: "Gifts For Her"
  },
  {
    id: "p51",
    name: "Classic Beauty Collection Package",
    price: 1500,
    priceStr: "GH₵1,500.00",
    image: "/Gift for her package set5.jpg",
    isOutOfStock: false,
    category: "Gifts For Her"
  },
  {
    id: "p52",
    name: "Special Mum Relaxation Box",
    price: 1300,
    priceStr: "GH₵1,300.00",
    image: "/Mother's day Package 1.jpg",
    isOutOfStock: false,
    category: "Mothers Day / Gifts For Mum"
  },
  {
    id: "p53",
    name: "Luxury Mother's Pamper Treats",
    price: 2400,
    priceStr: "GH₵2,400.00",
    image: "/Mother's day Package 2.jpg",
    isOutOfStock: false,
    category: "Mothers Day / Gifts For Mum"
  },
  {
    id: "p54",
    name: "Premium Mother's Day Skincare Basket",
    price: 1850,
    priceStr: "GH₵1,850.00",
    image: "/Mother's day Package 3.jpg",
    isOutOfStock: false,
    category: "Mothers Day / Gifts For Mum"
  },
  {
    id: "p55",
    name: "Elegant Mum Gift Hamper & Fragrance",
    price: 3100,
    priceStr: "GH₵3,100.00",
    image: "/Mother's day Package 4.jpg",
    isOutOfStock: false,
    category: "Mothers Day / Gifts For Mum"
  },
  {
    id: "p56",
    name: "Ultimate Queen Mother Celebration Box",
    price: 4500,
    priceStr: "GH₵4,500.00",
    image: "/Mother's day Package 5.jpg",
    isOutOfStock: false,
    category: "Mothers Day / Gifts For Mum"
  },
  {
    id: "p57",
    name: "Classic Gentleman's Gift Box",
    price: 1200,
    priceStr: "GH₵1,200.00",
    image: "/Fathers Day Package 1.jpg",
    isOutOfStock: false,
    category: "Father's Day/ Gifts For Dad"
  },
  {
    id: "p58",
    name: "Executive Dad Grooming Set",
    price: 1800,
    priceStr: "GH₵1,800.00",
    image: "/Fathers Day Package 2.jpg",
    isOutOfStock: false,
    category: "Father's Day/ Gifts For Dad"
  },
  {
    id: "p59",
    name: "Premium Watch & Wallet Collection",
    price: 2500,
    priceStr: "GH₵2,500.00",
    image: "/Fathers Day Package 3.jpg",
    isOutOfStock: false,
    category: "Father's Day/ Gifts For Dad"
  },
  {
    id: "p60",
    name: "Luxury Father's Pamper Hamper",
    price: 3200,
    priceStr: "GH₵3,200.00",
    image: "/Fathers Day Package 4.jpg",
    isOutOfStock: false,
    category: "Father's Day/ Gifts For Dad"
  },
  {
    id: "p61",
    name: "Ultimate Best Dad Survival Kit",
    price: 1550,
    priceStr: "GH₵1,550.00",
    image: "/Fathers Day Package 5.jpg",
    isOutOfStock: false,
    category: "Father's Day/ Gifts For Dad"
  },
  {
    id: "p62",
    name: "Elite Father's Day Celebration Package",
    price: 4000,
    priceStr: "GH₵4,000.00",
    image: "/Fathers Day Package 6.jpg",
    isOutOfStock: false,
    category: "Father's Day/ Gifts For Dad"
  },
  {
    id: "p63",
    name: "Classic Fluffy Teddy Bear",
    price: 450,
    priceStr: "GH₵450.00",
    image: "/Teddy bear package 1.jpg",
    isOutOfStock: false,
    category: "Teddy Bears"
  },
  {
    id: "p64",
    name: "Giant Cuddly Bear",
    price: 900,
    priceStr: "GH₵900.00",
    image: "/Teddy bear package 2.jpg",
    isOutOfStock: false,
    category: "Teddy Bears"
  },
  {
    id: "p65",
    name: "Cute Pink Ribbon Bear",
    price: 600,
    priceStr: "GH₵600.00",
    image: "/Teddy bear package 3.jpg",
    isOutOfStock: false,
    category: "Teddy Bears"
  },
  {
    id: "p66",
    name: "Romantic Love Teddy Set",
    price: 1100,
    priceStr: "GH₵1,100.00",
    image: "/Teddy bear package 4.jpg",
    isOutOfStock: false,
    category: "Teddy Bears"
  },
  {
    id: "p67",
    name: "Premium Soft Snuggle Bear",
    price: 750,
    priceStr: "GH₵750.00",
    image: "/Teddy bear package 5.jpg",
    isOutOfStock: false,
    category: "Teddy Bears"
  },
  {
    id: "p68",
    name: "Jumbo Celebration Bear",
    price: 1400,
    priceStr: "GH₵1,400.00",
    image: "/Teddy bear package 6.jpg",
    isOutOfStock: false,
    category: "Teddy Bears"
  },
  {
    id: "p69",
    name: "Luxury Huggable Bear",
    price: 850,
    priceStr: "GH₵850.00",
    image: "/Teddy bear package 7.jpg",
    isOutOfStock: false,
    category: "Teddy Bears"
  },
  {
    id: "p70",
    name: "Elite Gentleman's Grooming & Fragrance Box",
    price: 1200,
    priceStr: "GH₵1,200.00",
    image: "/perfume bath and body for men package 1.jpg",
    isOutOfStock: false,
    category: "Perfume, Bath & Body For Him"
  },
  {
    id: "p71",
    name: "Ultimate Male Pamper & Scent Collection",
    price: 1350,
    priceStr: "GH₵1,350.00",
    image: "/perfume bath and body for men package 2.jpg",
    isOutOfStock: false,
    category: "Perfume, Bath & Body For Him"
  },
  {
    id: "p72",
    name: "Sophisticated Man's Bath & Body Set",
    price: 1100,
    priceStr: "GH₵1,100.00",
    image: "/perfume bath and body for men package 3.jpg",
    isOutOfStock: false,
    category: "Perfume, Bath & Body For Him"
  },
  {
    id: "p73",
    name: "Premium Masculine Fragrance & Care Package",
    price: 1500,
    priceStr: "GH₵1,500.00",
    image: "/perfume bath and body for men package 4.jpg",
    isOutOfStock: false,
    category: "Perfume, Bath & Body For Him"
  },
  {
    id: "p74",
    name: "Modern Man's Luxury Grooming Essentials",
    price: 1450,
    priceStr: "GH₵1,450.00",
    image: "/perfume bath and body for men package 5.jpg",
    isOutOfStock: false,
    category: "Perfume, Bath & Body For Him"
  },
  {
    id: "p75",
    name: "Classic Male Fragrance & Body Ritual",
    price: 1250,
    priceStr: "GH₵1,250.00",
    image: "/perfume bath and body for men package 6.jpg",
    isOutOfStock: false,
    category: "Perfume, Bath & Body For Him"
  },
  {
    id: "p76",
    name: "Executive Scent & Skincare Selection for Him",
    price: 1600,
    priceStr: "GH₵1,600.00",
    image: "/perfume bath and body for men package 7.jpg",
    isOutOfStock: false,
    category: "Perfume, Bath & Body For Him"
  },
  {
    id: "p77",
    name: "Queen's Luxury Bath & Spa Collection",
    price: 1200,
    priceStr: "GH₵1,200.00",
    image: "/women body and bath package 1.jpg",
    isOutOfStock: false,
    category: "Perfume, Bath & Body For Her"
  },
  {
    id: "p78",
    name: "Elegant Floral Spa & Fragrance Delight",
    price: 1450,
    priceStr: "GH₵1,450.00",
    image: "/women body and bath package 2.jpg",
    isOutOfStock: false,
    category: "Perfume, Bath & Body For Her"
  },
  {
    id: "p79",
    name: "Ultimate Relaxation Bath & Body Hamper",
    price: 1100,
    priceStr: "GH₵1,100.00",
    image: "/women body and bath package 3.jpg",
    isOutOfStock: false,
    category: "Perfume, Bath & Body For Her"
  },
  {
    id: "p80",
    name: "Premium Rose & Vanilla Spa Ritual",
    price: 1850,
    priceStr: "GH₵1,850.00",
    image: "/women body and bath package 4.jpg",
    isOutOfStock: false,
    category: "Perfume, Bath & Body For Her"
  },
  {
    id: "p81",
    name: "Radiant Beauty Bath & Skincare Box",
    price: 950,
    priceStr: "GH₵950.00",
    image: "/women body and bath package 5.jpg",
    isOutOfStock: false,
    category: "Perfume, Bath & Body For Her"
  },
  {
    id: "p82",
    name: "Divine Goddess Scent & Spa Selection",
    price: 2100,
    priceStr: "GH₵2,100.00",
    image: "/women body and bath package 6.jpg",
    isOutOfStock: false,
    category: "Perfume, Bath & Body For Her"
  },
  {
    id: "p83",
    name: "Serene Lavender & Jasmine Pamper Set",
    price: 1350,
    priceStr: "GH₵1,350.00",
    image: "/women body and bath package 7.jpg",
    isOutOfStock: false,
    category: "Perfume, Bath & Body For Her"
  }
];
