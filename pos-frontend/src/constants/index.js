import butterChicken from '../assets/images/butter-chicken-4.jpg';
import palakPaneer from '../assets/images/Saag-Paneer-1.jpg';
import biryani from '../assets/images/hyderabadibiryani.jpg';
import masalaDosa from '../assets/images/masala-dosa.jpg';
import choleBhature from '../assets/images/chole-bhature.jpg';
import rajmaChawal from '../assets/images/rajma-chawal-1.jpg';
import paneerTikka from '../assets/images/paneer-tika.webp';
import gulabJamun from '../assets/images/gulab-jamun.webp';
import pooriSabji from '../assets/images/poori-sabji.webp';
import roganJosh from '../assets/images/rogan-josh.jpg';
import pic1 from '../assets/images/pic1.jpg';
import pic2 from '../assets/images/pic2.jpg';
import pic3 from '../assets/images/pic3.jpg';
import pic4 from '../assets/images/pic4.jpg';
import pic5 from '../assets/images/pic5.jpg';
import pic6 from '../assets/images/pic6.jpg';
import pic7 from '../assets/images/pic7.jpg';
import pic8 from '../assets/images/pic8.jpg';
import pic9 from '../assets/images/pic9.jpg';
import pic10 from '../assets/images/pic10.jpg';



import { color } from 'framer-motion';

export const popularDishes = [
    {
      id: 1,
      image: pic1,
      name: 'Matcha Latte',
      numberOfOrders: 250,
    },
    {
      id: 2,
      image: pic2,
      name: ' Cappuccino',
      numberOfOrders: 190,
    },
    {
      id: 3,
      image: pic3,
      name: ' Mocha',
      numberOfOrders: 300,
    },
    {
      id: 4,
      image: pic4,
      name: ' Chai Latte',
      numberOfOrders: 220,
    },
    {
      id: 5,
      image: pic4,
      name: ' Caramel Macchiato',
      numberOfOrders: 270,
    },
    {
      id: 6,
      image: pic5,
      name: ' Samosa',
      numberOfOrders: 180,
    },
    {
      id: 7,
      image: pic7,
      name: ' Falafel',
      numberOfOrders: 210,
    },
    {
      id: 8,
      image: pic8,
      name: 'Gulab Jamun',
      numberOfOrders: 310,
    },
    {
      id: 9,
      image: pic9,
      name: 'Poori Sabji',
      numberOfOrders: 140,
    },
    {
      id: 10,
      image: roganJosh,
      name: 'Rogan Josh',
      numberOfOrders: 160,
    },
  ];


export const tables = [
    { id: 1, name: "Table 1", status: "Booked", initial: "AM", seats: 4 },
    { id: 2, name: "Table 2", status: "Available", initial: "MB", seats: 6 },
    { id: 3, name: "Table 3", status: "Booked", initial: "JS", seats: 2 },
    { id: 4, name: "Table 4", status: "Available", initial: "HR", seats: 4 },
    { id: 5, name: "Table 5", status: "Booked", initial: "PL", seats: 3 },
    { id: 6, name: "Table 6", status: "Available", initial: "RT", seats: 4 },
    { id: 7, name: "Table 7", status: "Booked", initial: "LC", seats: 5 },
    { id: 8, name: "Table 8", status: "Available", initial: "DP", seats: 5 },
    { id: 9, name: "Table 9", status: "Booked", initial: "NK", seats: 6 },
    { id: 10, name: "Table 10", status: "Available", initial: "SB", seats: 6 },
    { id: 11, name: "Table 11", status: "Booked", initial: "GT", seats: 4 },
    { id: 12, name: "Table 12", status: "Available", initial: "JS", seats: 6 },
    { id: 13, name: "Table 13", status: "Booked", initial: "EK", seats: 2 },
    { id: 14, name: "Table 14", status: "Available", initial: "QN", seats: 6 },
    { id: 15, name: "Table 15", status: "Booked", initial: "TW", seats: 3 }
  ];
  
  export const hotDrinks = [
    {
      id: 1,
      name: "Masala Chai",
      price: 50,
      category: "Hot"
    },
    {
      id: 2,
      name: "Black Coffee",
      price: 80,
      category: "Hot"
    },
    {
      id: 3,
      name: "Cappuccino",
      price: 120,
      category: "Hot"
    },
    {
      id: 4,
      name: "Latte",
      price: 140,
      category: "Hot"
    },
    {
      id: 5,
      name: "Hot Chocolate",
      price: 100,
      category: "Hot"
    },
    {
      id: 6,
      name: "Green Tea",
      price: 60,
      category: "Hot"
    }
  ];
  
  export const coldDrinks = [
    {
      id: 1,
      name: "Lemon Soda",
      price: 80,
      category: "Cold"
    },
    {
      id: 2,
      name: "Mango Lassi",
      price: 120,
      category: "Cold"
    },
    {
      id: 3,
      name: "Cold Coffee",
      price: 150,
      category: "Cold"
    },
    {
      id: 4,
      name: "Fresh Lime Water",
      price: 60,
      category: "Cold"
    },
    {
      id: 5,
      name: "Iced Tea",
      price: 100,
      category: "Cold"
    },
    {
      id: 6,
      name: "Coca Cola",
      price: 70,
      category: "Cold"
    }
  ];
  
  export const juices = [
    {
      id: 1,
      name: "Orange Juice",
      price: 120,
      category: "Fresh"
    },
    {
      id: 2,
      name: "Apple Juice",
      price: 110,
      category: "Fresh"
    },
    {
      id: 3,
      name: "Pineapple Juice",
      price: 130,
      category: "Fresh"
    },
    {
      id: 4,
      name: "Watermelon Juice",
      price: 100,
      category: "Fresh"
    },
    {
      id: 5,
      name: "Mango Juice",
      price: 140,
      category: "Fresh"
    },
    {
      id: 6,
      name: "Pomegranate Juice",
      price: 160,
      category: "Fresh"
    }
  ];
  
  export const smoothies = [
    {
      id: 1,
      name: "Banana Smoothie",
      price: 180,
      category: "Blended"
    },
    {
      id: 2,
      name: "Berry Blast Smoothie",
      price: 200,
      category: "Blended"
    },
    {
      id: 3,
      name: "Mango Smoothie",
      price: 190,
      category: "Blended"
    },
    {
      id: 4,
      name: "Chocolate Smoothie",
      price: 220,
      category: "Blended"
    },
    {
      id: 5,
      name: "Green Smoothie",
      price: 210,
      category: "Blended"
    }
  ];
  
  export const alcoholicDrinks = [
    {
      id: 1,
      name: "Beer",
      price: 200,
      category: "Alcoholic"
    },
    {
      id: 2,
      name: "Whiskey",
      price: 500,
      category: "Alcoholic"
    },
    {
      id: 3,
      name: "Vodka",
      price: 450,
      category: "Alcoholic"
    },
    {
      id: 4,
      name: "Rum",
      price: 350,
      category: "Alcoholic"
    },
    {
      id: 5,
      name: "Tequila",
      price: 600,
      category: "Alcoholic"
    },
    {
      id: 6,
      name: "Cocktail",
      price: 400,
      category: "Alcoholic"
    }
  ];
  
  export const specialDrinks = [
    {
      id: 1,
      name: "Mojito",
      price: 250,
      category: "Mocktail"
    },
    {
      id: 2,
      name: "Virgin Pina Colada",
      price: 280,
      category: "Mocktail"
    },
    {
      id: 3,
      name: "Blue Lagoon",
      price: 220,
      category: "Mocktail"
    },
    {
      id: 4,
      name: "Shirley Temple",
      price: 180,
      category: "Mocktail"
    },
    {
      id: 5,
      name: "Arnold Palmer",
      price: 150,
      category: "Mocktail"
    }
  ];
  
  export const energyDrinks = [
    {
      id: 1,
      name: "Red Bull",
      price: 120,
      category: "Energy"
    },
    {
      id: 2,
      name: "Monster Energy",
      price: 140,
      category: "Energy"
    },
    {
      id: 3,
      name: "Protein Shake",
      price: 200,
      category: "Energy"
    },
    {
      id: 4,
      name: "Sports Drink",
      price: 80,
      category: "Energy"
    }
  ];
  
  export const menus = [
    { id: 1, name: "Hot Drinks", bgColor: "#b73e3e", icon: "☕", items: hotDrinks },
    { id: 2, name: "Cold Drinks", bgColor: "#5b45b0", icon: "🥤", items: coldDrinks },
    { id: 3, name: "Fresh Juices", bgColor: "#7f167f", icon: "🧃", items: juices },
    { id: 4, name: "Smoothies", bgColor: "#735f32", icon: "🥤", items: smoothies },
    { id: 5, name: "Alcoholic Drinks", bgColor: "#1d2569", icon: "🍺", items: alcoholicDrinks },
    { id: 6, name: "Special Drinks", bgColor: "#285430", icon: "🍹", items: specialDrinks },
    { id: 7, name: "Energy Drinks", bgColor: "#b73e3e", icon: "⚡", items: energyDrinks }
  ];

export const metricsData = [
  { title: "Revenue", value: "₹50,846.90", percentage: "12%", color: "#025cca", isIncrease: false },
  { title: "Outbound Clicks", value: "10,342", percentage: "16%", color: "#02ca3a", isIncrease: true },
  { title: "Total Customer", value: "19,720", percentage: "10%", color: "#f6b100", isIncrease: true },
  { title: "Event Count", value: "20,000", percentage: "10%", color: "#be3e3f", isIncrease: false },
];

export const itemsData = [
  { title: "Total Categories", value: "8", percentage: "12%", color: "#5b45b0", isIncrease: false },
  { title: "Total Dishes", value: "50", percentage: "12%", color: "#285430", isIncrease: true },
  { title: "Active Orders", value: "12", percentage: "12%", color: "#735f32", isIncrease: true },
  { title: "Total Tables", value: "10", color: "#7f167f"}
];

export const orders = [
  {
    id: "101",
    customer: "Amrit Raj",
    status: "Ready",
    dateTime: "January 18, 2025 08:32 PM",
    items: 8,
    tableNo: 3,
    total: 250.0,
  },
  {
    id: "102",
    customer: "John Doe",
    status: "In Progress",
    dateTime: "January 18, 2025 08:45 PM",
    items: 5,
    tableNo: 4,
    total: 180.0,
  },
  {
    id: "103",
    customer: "Emma Smith",
    status: "Ready",
    dateTime: "January 18, 2025 09:00 PM",
    items: 3,
    tableNo: 5,
    total: 120.0,
  },
  {
    id: "104",
    customer: "Chris Brown",
    status: "In Progress",
    dateTime: "January 18, 2025 09:15 PM",
    items: 6,
    tableNo: 6,
    total: 220.0,
  },
];