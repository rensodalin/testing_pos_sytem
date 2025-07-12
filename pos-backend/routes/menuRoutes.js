const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");
const authMiddleware = require("../middleware/authMiddleware");

// Test endpoint
router.get("/test", (req, res) => {
  res.json({ 
    success: true, 
    message: "Menu routes are working!",
    timestamp: new Date().toISOString()
  });
});

// Category routes
router.post("/categories", authMiddleware, menuController.createCategory);
router.get("/categories", menuController.getAllCategories);
router.get("/categories/:id", menuController.getCategoryById);
router.put("/categories/:id", authMiddleware, menuController.updateCategory);
router.delete("/categories/:id", authMiddleware, menuController.deleteCategory);

// Menu item routes
router.post("/items", authMiddleware, menuController.createMenuItem);
router.get("/items", menuController.getAllMenuItems);
router.get("/items/popular", menuController.getPopularMenuItems);
router.get("/items/:id", menuController.getMenuItemById);
router.put("/items/:id", authMiddleware, menuController.updateMenuItem);
router.delete("/items/:id", authMiddleware, menuController.deleteMenuItem);

module.exports = router; 