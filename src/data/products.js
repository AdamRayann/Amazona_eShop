const products = [
  {
    id: 1,
    name: "Premium Cat Food",
    description: "High-quality nutrition for your cat.",
    price: 15.99,
    type: "cat",
    category: "food",
    image: "/images/products/food/food-cat1.jpg"
  },
  {
    id: 2,
    name: "Premium Cat Food",
    description: "High-quality nutrition for your cat.",
    price: 15.99,
    type: "cat",
    category: "food",
    image: "/images/products/food/food-cat2.jpg"
  },
  {
    id: 3,
    name: "Premium Cat Food",
    description: "High-quality nutrition for your cat.",
    price: 15.99,
    type: "cat",
    category: "food",
    image: "/images/products/food/food-cat1.jpg"
  },
  {
    id: 4,
    name: "Premium Cat Food",
    description: "High-quality nutrition for your cat.",
    price: 15.99,
    type: "cat",
    category: "food",
    image: "/images/products/food/food-cat1.jpg"
  },
  {
    id: 5,
    name: "Premium Cat Food",
    description: "High-quality nutrition for your cat.",
    price: 15.99,
    type: "cat",
    category: "food",
    image: "/images/products/food/food-cat1.jpg"
  },
  {
    id: 6,
    name: "Premium Cat Food",
    description: "High-quality nutrition for your cat.",
    price: 15.99,
    type: "cat",
    category: "food",
    image: "/images/products/food/food-cat1.jpg"
  },
  {
    id: 7,
    name: "Premium Dog Food",
    description: "High-quality nutrition for your dog.",
    price: 15.99,
    type: "dog",
    category: "food",
    image: "/images/products/food/food-dog1.jpg"
  },
  {
    id: 8,
    name: "Premium Dog Food",
    description: "High-quality nutrition for your dog.",
    price: 15.99,
    type: "dog",
    category: "food",
    image: "/images/products/food/food-dog2.jpg"
  },
  {
    id: 9,
    name: "Premium Dog Food",
    description: "High-quality nutrition for your dog.",
    price: 15.99,
    type: "dog",
    category: "food",
    image: "/images/products/food/food-dog3.jpg"
  },
  {
    id: 10,
    name: "Premium Dog Food",
    description: "High-quality nutrition for your dog.",
    price: 15.99,
    type: "dog",
    category: "food",
    image: "/images/products/food/food-dog4.jpg"
  },
  {
    id: 11,
    name: "Premium Dog Food",
    description: "High-quality nutrition for your dog.",
    price: 15.99,
    type: "dog",
    category: "food",
    image: "/images/products/food/food-dog5.jpg"
  },
  {
    id: 12,
    name: "Premium Dog Food",
    description: "High-quality nutrition for your dog.",
    price: 15.99,
    type: "dog",
    category: "food",
    image: "/images/products/food/food-dog6.jpg"
  },
  {
    id: 13,
    name: "Premium Dog Food",
    description: "High-quality nutrition for your dog.",
    price: 15.99,
    type: "dog",
    category: "food",
    image: "/images/products/food/food-dog7.jpg"
  },
  {
    id: 14,
    name: "Premium Dog Food",
    description: "High-quality nutrition for your dog.",
    price: 15.99,
    type: "dog",
    category: "food",
    image: "/images/products/food/food-dog8.jpg"
  },
  {
    id: 15,
    name: "Premium Dog Food",
    description: "High-quality nutrition for your dog.",
    price: 15.99,
    type: "dog",
    category: "food",
    image: "/images/products/food/food-dog9.jpg"
  },
  {
    id: 16,
    name: "Premium Dog Food",
    description: "High-quality nutrition for your dog.",
    price: 15.99,
    type: "dog",
    category: "food",
    image: "/images/products/food/food-dog10.jpg"
  },
  {
    id: 17,
    name: "Premium Dog Cage",
    description: "High-quality Cage.",
    price: 15.99,
    type: "dog",
    category: "cage",
    image: "/images/products/cages/cage1.jpg"
  },
  {
    id: 18,
    name: "Premium Dog Food",
    description: "High-quality nutrition for your dog.",
    price: 15.99,
    type: "dog",
    category: "cage",
    image: "/images/products/cages/cage2.jpg"
  },
  {
    id: 19,
    name: "Premium Dog Food",
    description: "High-quality nutrition for your dog.",
    price: 15.99,
    type: "dog",
    category: "cage",
    image: "/images/products/cages/cage3.jpg"
  },
  {
    id: 20,
    name: "Premium Dog Food",
    description: "High-quality nutrition for your dog.",
    price: 15.99,
    type: "dog",
    category: "cage",
    image: "/images/products/cages/cage4.jpg"
  },
  {
    id: 21,
    name: "Premium Dog Food",
    description: "High-quality nutrition for your dog.",
    price: 15.99,
    type: "dog",
    category: "cage",
    image: "/images/products/cages/cage5.jpg"
  },
  {
    id: 22,
    name: "Premium Dog Food",
    description: "High-quality nutrition for your dog.",
    price: 15.99,
    type: "dog",
    category: "cage",
    image: "/images/products/cages/cage6.jpg"
  },
  {
    id: 23,
    name: "Premium Dog Food",
    description: "High-quality nutrition for your dog.",
    price: 15.99,
    type: "dog",
    category: "cage",
    image: "/images/products/cages/cage7.jpg"
  },
  {
    id: 24,
    name: "Premium Dog Food",
    description: "High-quality nutrition for your dog.",
    price: 15.99,
    type: "dog",
    category: "cage",
    image: "/images/products/cages/cage8.jpg"
  },
  {
    id: 25,
    name: "Premium Dog Food",
    description: "High-quality nutrition for your dog.",
    price: 15.99,
    type: "dog",
    category: "cage",
    image: "/images/products/cages/cage9.jpg"
  },
  {
    id: 26,
    name: "Premium Dog Food",
    description: "High-quality nutrition for your dog.",
    price: 15.99,
    type: "rodent",
    category: "cage",
    image: "/images/products/cages/cage10.jpg"
  },
  {
    id: 27,
    name: "Premium Dog Food",
    description: "High-quality nutrition for your dog.",
    price: 15.99,
    type: "dog",
    category: "cage",
    image: "/images/products/cages/cage11.jpg"
  },
  {
    id: 28,
    name: "Premium Dog Food",
    description: "High-quality nutrition for your dog.",
    price: 15.99,
    type: "dog",
    category: "accessory",
    image: "/images/products/accessories/accessorie1.jpg"
  },
  {
    id: 29,
    name: "Premium Dog Food",
    description: "High-quality nutrition for your dog.",
    price: 15.99,
    type: "dog",
    category: "accessory",
    image: "/images/products/accessories/accessorie2.jpg"
  },
  {
    id: 30,
    name: "Premium Dog Food",
    description: "High-quality nutrition for your dog.",
    price: 15.99,
    type: "dog",
    category: "accessory",
    image: "/images/products/accessories/accessorie3.jpg"
  },
  {
    id: 31,
    name: "Premium Dog Food",
    description: "High-quality nutrition for your dog.",
    price: 15.99,
    type: "dog",
    category: "accessory",
    image: "/images/products/accessories/accessorie4.jpg"
  },
  {
    id: 32,
    name: "Premium Dog Food",
    description: "High-quality nutrition for your dog.",
    price: 15.99,
    type: "dog",
    category: "accessory",
    image: "/images/products/accessories/accessorie5.jpg"
  },
  {
    id: 33,
    name: "Premium Dog Food",
    description: "High-quality nutrition for your dog.",
    price: 15.99,
    type: "dog",
    category: "accessory",
    image: "/images/products/accessories/accessorie6.jpg"
  },
  {
    id: 34,
    name: "Premium Dog Food",
    description: "High-quality nutrition for your dog.",
    price: 15.99,
    type: "dog",
    category: "accessory",
    image: "/images/products/accessories/accessorie7.jpg"
  },
  {
    id: 35,
    name: "Premium Dog Food",
    description: "High-quality nutrition for your dog.",
    price: 15.99,
    type: "dog",
    category: "accessory",
    image: "/images/products/accessories/accessorie8.jpg"
  },
  {
    id: 36,
    name: "Premium Dog Food",
    description: "High-quality nutrition for your dog.",
    price: 15.99,
    type: "dog",
    category: "accessory",
    image: "/images/products/accessories/accessorie9.jpg"
  },
  {
    id: 37,
    name: "Premium Dog Food",
    description: "High-quality nutrition for your dog.",
    price: 15.99,
    type: "bird",
    category: "accessory",
    image: "/images/products/accessories/accessorie10.jpg"
  },
  {
    id: 38,
    name: "Premium Dog Food",
    description: "High-quality nutrition for your dog.",
    price: 15.99,
    type: "dog",
    category: "accessory",
    image: "/images/products/accessories/accessorie11.jpg"
  },
  {
    id: 39,
    name: "Premium Dog Food",
    description: "High-quality nutrition for your dog.",
    price: 15.99,
    type: "dog",
    category: "accessory",
    image: "/images/products/accessories/accessorie12.jpg"
  },
  {
    id: 40,
    name: "Premium Dog Food",
    description: "High-quality nutrition for your dog.",
    price: 15.99,
    type: "dog",
    category: "accessory",
    image: "/images/products/accessories/accessorie13.jpg"
  },
  {
    id: 41,
    name: "Premium Dog Food",
    description: "High-quality nutrition for your dog.",
    price: 15.99,
    type: "dog",
    category: "accessory",
    image: "/images/products/accessories/accessorie14.jpg"
  },
  {
    id: 42,
    name: "Premium Dog Food",
    description: "High-quality nutrition for your dog.",
    price: 15.99,
    type: "dog",
    category: "accessory",
    image: "/images/products/accessories/accessorie15.jpg"
  },
  {
    id: 43,
    name: "Premium Dog Food",
    description: "High-quality nutrition for your dog.",
    price: 15.99,
    type: "dog",
    category: "accessory",
    image: "/images/products/accessories/accessorie16.jpg"
  },
  {
    id: 44,
    name: "Premium Dog Food",
    description: "High-quality nutrition for your dog.",
    price: 15.99,
    type: "dog",
    category: "accessory",
    image: "/images/products/accessories/accessorie17.jpg"
  },
  {
    id: 45,
    name: "Premium Dog Food",
    description: "High-quality nutrition for your dog.",
    price: 15.99,
    type: "dog",
    category: "accessory",
    image: "/images/products/accessories/accessorie18.jpg"
  },
  {
    id: 46,
    name: "Premium Dog Food",
    description: "High-quality nutrition for your dog.",
    price: 15.99,
    type: "dog",
    category: "accessory",
    image: "/images/products/accessories/accessorie19.jpg"
  },
  {
    id: 47,
    name: "Premium Dog Food",
    description: "High-quality nutrition for your dog.",
    price: 15.99,
    type: "dog",
    category: "accessory",
    image: "/images/products/accessories/accessorie20.jpg"
  },
  {
    id: 48,
    name: "Premium Dog Food",
    description: "High-quality nutrition for your dog.",
    price: 15.99,
    type: "dog",
    category: "accessory",
    image: "/images/products/accessories/accessorie21.jpg"
  }
  
  
];

export default products;
