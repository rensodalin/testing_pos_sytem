const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");

// Test endpoint
router.get("/test", (req, res) => {
  res.json({ 
    success: true, 
    message: "Order routes are working!",
    timestamp: new Date().toISOString()
  });
});

// Test order creation endpoint
router.post("/test-create", orderController.testOrderCreation);

// Create new order
router.post("/", orderController.createOrder);

// Get orders
router.get("/", authMiddleware, orderController.getAllOrders);
router.get("/recent", authMiddleware, orderController.getRecentOrders);
router.get("/status/:status", authMiddleware, orderController.getOrdersByStatus);
router.get("/:id", authMiddleware, orderController.getOrderById);

// Update orders
router.put("/:id/status", authMiddleware, orderController.updateOrderStatus);
router.put("/:id/payment", authMiddleware, orderController.updatePaymentStatus);

// Delete order
router.delete("/:id", authMiddleware, orderController.deleteOrder);

module.exports = router;

