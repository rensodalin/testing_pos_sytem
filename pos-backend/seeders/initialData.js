const db = require("../models");
const Category = db.Category;
const MenuItem = db.MenuItem;
const User = db.User;
const Table = db.Table;
const bcrypt = require("bcryptjs");

const seedInitialData = async () => {
  try {
    console.log("🌱 Starting database seeding...");

    // Create categories
    const categories = [
      { name: "Hot Drinks", icon: "☕", bgColor: "#b73e3e", sortOrder: 1 },
      { name: "Cold Drinks", icon: "🥤", bgColor: "#5b45b0", sortOrder: 2 },
      { name: "Fresh Juices", icon: "🧃", bgColor: "#7f167f", sortOrder: 3 },
      { name: "Smoothies", icon: "🥤", bgColor: "#735f32", sortOrder: 4 },
      { name: "Alcoholic Drinks", icon: "🍺", bgColor: "#1d2569", sortOrder: 5 },
      { name: "Special Drinks", icon: "🍹", bgColor: "#285430", sortOrder: 6 },
      { name: "Energy Drinks", icon: "⚡", bgColor: "#b73e3e", sortOrder: 7 }
    ];

    const createdCategories = [];
    for (const categoryData of categories) {
      const [category, created] = await Category.findOrCreate({
        where: { name: categoryData.name },
        defaults: categoryData
      });
      createdCategories.push(category);
      if (created) {
        console.log(`✅ Created category: ${category.name}`);
      }
    }

    // Create menu items
    const menuItems = [
      // Hot Drinks
      { name: "Masala Chai", price: 50, categoryId: 1, isPopular: true },
      { name: "Black Coffee", price: 80, categoryId: 1 },
      { name: "Cappuccino", price: 120, categoryId: 1, isPopular: true },
      { name: "Latte", price: 140, categoryId: 1 },
      { name: "Hot Chocolate", price: 100, categoryId: 1 },
      { name: "Green Tea", price: 60, categoryId: 1 },

      // Cold Drinks
      { name: "Lemon Soda", price: 80, categoryId: 2 },
      { name: "Mango Lassi", price: 120, categoryId: 2 },
      { name: "Cold Coffee", price: 150, categoryId: 2, isPopular: true },
      { name: "Fresh Lime Water", price: 60, categoryId: 2 },
      { name: "Iced Tea", price: 100, categoryId: 2 },
      { name: "Coca Cola", price: 70, categoryId: 2 },

      // Fresh Juices
      { name: "Orange Juice", price: 120, categoryId: 3 },
      { name: "Apple Juice", price: 110, categoryId: 3 },
      { name: "Pomegranate Juice", price: 160, categoryId: 3 },

      // Smoothies
      { name: "Banana Smoothie", price: 180, categoryId: 4 },
      { name: "Berry Blast Smoothie", price: 200, categoryId: 4, isPopular: true },
      { name: "Mango Smoothie", price: 190, categoryId: 4 },
      { name: "Chocolate Smoothie", price: 220, categoryId: 4 },
      { name: "Green Smoothie", price: 210, categoryId: 4 },

      // Alcoholic Drinks
      { name: "Beer", price: 200, categoryId: 5 },
      { name: "Whiskey", price: 500, categoryId: 5 },
      { name: "Vodka", price: 450, categoryId: 5 },
      { name: "Rum", price: 350, categoryId: 5 },
      { name: "Tequila", price: 600, categoryId: 5 },
      { name: "Cocktail", price: 500, categoryId: 5 },

      // Special Drinks
      { name: "Mojito", price: 250, categoryId: 6, isPopular: true },
      { name: "Virgin Pina Colada", price: 280, categoryId: 6 },
      { name: "Blue Lagoon", price: 220, categoryId: 6 },
      { name: "Shirley Temple", price: 180, categoryId: 6 },
      { name: "Arnold Palmer", price: 150, categoryId: 6 },

      // Energy Drinks
      { name: "Red Bull", price: 120, categoryId: 7 },
      { name: "Monster Energy", price: 140, categoryId: 7 },
      { name: "Protein Shake", price: 200, categoryId: 7 },
      { name: "Sports Drink", price: 80, categoryId: 7 }
    ];

    for (const itemData of menuItems) {
      const [menuItem, created] = await MenuItem.findOrCreate({
        where: { 
          name: itemData.name,
          categoryId: itemData.categoryId
        },
        defaults: itemData
      });
      if (created) {
        console.log(`✅ Created menu item: ${menuItem.name}`);
      }
    }

    // Create default admin user
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const [adminUser, adminCreated] = await User.findOrCreate({
      where: { email: "admin@cafio.com" },
      defaults: {
        name: "Admin User",
        email: "admin@cafio.com",
        phone: "1234567890",
        password: hashedPassword,
        role: "admin"
      }
    });

    if (adminCreated) {
      console.log("✅ Created admin user: admin@cafio.com");
    }

    // Create default staff user
    const [staffUser, staffCreated] = await User.findOrCreate({
      where: { email: "staff@cafio.com" },
      defaults: {
        name: "Staff User",
        email: "staff@cafio.com",
        phone: "9876543210",
        password: hashedPassword,
        role: "staff"
      }
    });

    if (staffCreated) {
      console.log("✅ Created staff user: staff@cafio.com");
    }

    // Create tables
    const tables = [];
    for (let i = 1; i <= 15; i++) {
      tables.push({
        tableNo: i,
        seats: i <= 5 ? 4 : i <= 10 ? 6 : i <= 12 ? 2 : i <= 14 ? 3 : 6,
        status: "Available",
        initial: "-"
      });
    }

    for (const tableData of tables) {
      const [table, created] = await Table.findOrCreate({
        where: { tableNo: tableData.tableNo },
        defaults: tableData
      });
      if (created) {
        console.log(`✅ Created table: ${table.tableNo}`);
      }
    }

    console.log("🎉 Database seeding completed successfully!");
    console.log("\n📋 Default Login Credentials:");
    console.log("Admin: admin@cafio.com / admin123");
    console.log("Staff: staff@cafio.com / admin123");

  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
};

module.exports = seedInitialData; 