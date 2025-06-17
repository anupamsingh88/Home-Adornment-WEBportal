import { Product, ProductCategory } from '@/types';

// Featured products (shown on homepage)
export const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Ceramic Decorative Vase",
    category: "wall-decor",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80",
    popularity: 98,
    date: "2023-03-15"
  },
  {
    id: 2,
    name: "Modern Pendant Light",
    category: "lighting",
    price: 1499.99,
    image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
    popularity: 92,
    date: "2023-04-20"
  },
  {
    id: 3,
    name: "Coffee Table",
    category: "furniture-accents",
    price: 1999.99,
    image: "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/west-elm/kos-indooroutdoor-concrete-coffee-table-h13196/0/juZSQ-GvVh-13341520_1.jpg",
    popularity: 95,
    date: "2023-02-10"
  },
  {
    id: 4,
    name: "Macrame Wall Hanging",
    category: "wall-decor",
    price: 1799.99,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80",
    popularity: 88,
    date: "2023-01-05"
  }
];

// All products
export const products: Product[] = [
  ...featuredProducts,
  {
    id: 5,
    name: "Abstract Wall Art",
    category: "wall-decor",
    price: 1499.99,
    image: "https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    popularity: 85,
    date: "2023-05-12"
  },
  {
    id: 6,
    name: "Staggered Glass USB Table Lamp",
    category: "lighting",
    price: 2099.99,
    image: "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/resize-w:1280/west-elm/69924431331/3/1WakwYwt4B-7517911_4.jpg?dpr=1",
    popularity: 90,
    date: "2023-06-20"
  },
  {
    id: 7,
    name: "Fiddle Leaf Fig Plant",
    category: "indoor-plants",
    price: 5998.99,
    image: "https://images.unsplash.com/photo-1560343776-97e7d202ff0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1028&q=80",
    popularity: 93,
    date: "2023-03-28"
  },
  {
    id: 8,
    name: "Geometric Area Rug",
    category: "rugs-carpets",
    price: 1999.99,
    image: "https://images.unsplash.com/photo-1597791023847-a698a56f8225?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fEdlb21ldHJpYyUyMEFyZWElMjBSdWd8ZW58MHx8MHx8fDA%3D",
    popularity: 87,
    date: "2023-04-15"
  },
  {
    id: 9,
    name: "Decorative Mirror",
    category: "wall-decor",
    price: 1599.99,
    image: "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/resize-w:1280/west-elm/white-plaster-arch-wall-mirror-d16503/0/l26BxBDR0W-9521310_1.jpg?dpr=1",
    popularity: 89,
    date: "2023-02-25"
  },
  {
    id: 10,
    name: "Velvet Blackout Curtains",
    category: "curtains-blinds",
    price: 2299.99,
    image: "https://media.istockphoto.com/id/1308789388/photo/angular-cornice-with-drapes-and-white-curtain-or-tulle-interior-details-close-up-white-wall.jpg?s=612x612&w=0&k=20&c=nNDdj2tVweUuCGFsyngWA4CZWxxL34PaHzEm_1nQAlk=",
    popularity: 84,
    date: "2023-01-15"
  },
  {
    id: 11,
    name: "Ceramic Planter Set",
    category: "indoor-plants",
    price: 4099.99,
    image: "https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    popularity: 91,
    date: "2023-05-05"
  },
  {
    id: 12,
    name: "Floating Shelves Set",
    category: "furniture-accents",
    price: 3999.99,
    image: "https://plus.unsplash.com/premium_photo-1726869746318-017138da49b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fEZsb2F0aW5nJTIwU2hlbHZlcyUyMFNldHxlbnwwfHwwfHx8MA%3D%3D",
    popularity: 88,
    date: "2023-06-10"
  },
  {
    id: 13,
    name: "Handwoven Wall Tapestry",
    category: "wall-decor",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    popularity: 83,
    date: "2023-03-02"
  },
  {
    id: 14,
    name: "Crystal Chandelier",
    category: "lighting",
    price: 349.99,
    image: "https://media.istockphoto.com/id/623756060/photo/crystal-chandelier.webp?a=1&b=1&s=612x612&w=0&k=20&c=qhMbw0ZWBw0_SymBM6u-AOCTzieHTA7jlC0lPAQHqEs=",
    popularity: 82,
    date: "2023-02-18"
  },
  {
    id: 15,
    name: "Fiona Table Lamp",
    category: "lighting",
    price: 3499.99,
    image: "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/resize-w:1280/west-elm/fiona-table-lamp-h12085/0/MX6yVF6Opl-9573697_1.jpg?dpr=1",
    popularity: 82,
    date: "2023-02-18"
  },
  {
    id: 16,
    name: "Tufted Ottoman",
    category: "furniture-accents",
    price: 129.99,
    image: "https://media.istockphoto.com/id/1933464436/photo/a-set-of-isolated-elegant-living-room-furniture-4-books-and-plaid-with-tassels-on-a-beige.webp?a=1&b=1&s=612x612&w=0&k=20&c=DhQpZSugaPvY3kadZ6H0jGHJ3HQ3TDd2zsWqHW0PHNU=",
    popularity: 86,
    date: "2023-04-30"
  },
  {
    id: 17,
    name: "Monstera Deliciosa Plant",
    category: "indoor-plants",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80",
    popularity: 94,
    date: "2023-01-25"
  },
  {
    id: 18,
    name: "Persian Style Area Rug",
    category: "rugs-carpets",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1600166898405-da9535204843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    popularity: 81,
    date: "2023-05-20"
  },
  {
    id: 19,
    name: "Roman Blinds",
    category: "curtains-blinds",
    price: 639.99,
    image: "https://media.istockphoto.com/id/465513841/photo/roman-blind.webp?a=1&b=1&s=612x612&w=0&k=20&c=zYP1curkzsV9HQcp5P16ZkuT7RK6TUgVQw9WHD0QoVA=",
    popularity: 80,
    date: "2023-06-05"
  },
  {
    id: 20,
    name: "Shower Curtains",
    category: "curtains-blinds",
    price: 449.99,
    image: "https://images.unsplash.com/photo-1659624393906-31c3c0481654?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8SUtFQSUyME1BSkdVTEwlMjBSb29tJTIwRGFya2VuaW5nJTIwQ3VydGFpbnN8ZW58MHx8MHx8fDA%3D",
    popularity: 80,
    date: "2023-06-05"
  },


  {
    id: 21,
    name: "Wooden Wall Clock",
    category: "wall-decor",
    price: 6999.99,
    image: "https://plus.unsplash.com/premium_photo-1677666509970-a5b723ab3e40?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHdvb2RlbiUyMHdhbGwlMjBjbG9ja3xlbnwwfHwwfHx8MA%3D%3D",
    popularity: 87,
    date: "2023-03-18"
  },
  {
    id: 22,
    name: "Floor Lamp with Reading Light",
    category: "lighting",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    popularity: 85,
    date: "2023-04-10"
  },
    {
    id: 23,
    name: "Asymmetry Ceramic Table Lamp, Large",
    category: "lighting",
    price: 1099.99,
    image: "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/west-elm/asymmetry-ceramic-table-lamp-large-w37114744/0/7wPHX7kg_f-8353708_1.jpg",
    popularity: 90,
    date: "2023-06-20"
  },
];
