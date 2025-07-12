const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrdersByStatus,
  updateOrderStatus, // ✅ don't forget this
} = require("../controllers/orderController");

router.post("/", createOrder);
router.get("/", getOrdersByStatus);
router.patch("/:id/status", updateOrderStatus); // ✅ for "Mark as Ready"

module.exports = router;

