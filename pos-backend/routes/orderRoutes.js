const express = require("express");
const router = express.Router();
const { createOrder, getOrdersByStatus } = require("../controllers/orderController");

// ✅ These must be functions — no typos!
router.post("/", createOrder);
router.get("/", getOrdersByStatus);

module.exports = router;
