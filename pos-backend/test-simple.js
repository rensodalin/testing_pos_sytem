// Simple test to isolate the issue
console.log("🔍 Testing imports...");

try {
  console.log("1. Testing authMiddleware...");
  const authMiddleware = require("./middleware/authMiddleware");
  console.log("✅ authMiddleware imported:", typeof authMiddleware);
  
  console.log("2. Testing orderController...");
  const orderController = require("./controllers/orderController");
  console.log("✅ orderController imported:", typeof orderController);
  console.log("✅ createOrder function:", typeof orderController.createOrder);
  
  console.log("3. Testing menuController...");
  const menuController = require("./controllers/menuController");
  console.log("✅ menuController imported:", typeof menuController);
  
  console.log("4. Testing models...");
  const db = require("./models");
  console.log("✅ Models imported successfully");
  
  console.log("5. Testing routes...");
  const orderRoutes = require("./routes/orderRoutes");
  console.log("✅ Order routes imported successfully");
  
  console.log("6. Testing menu routes...");
  const menuRoutes = require("./routes/menuRoutes");
  console.log("✅ Menu routes imported successfully");
  
  console.log("\n🎉 All imports successful!");
  
} catch (error) {
  console.error("❌ Error during import:", error.message);
  console.error("Stack trace:", error.stack);
} 