const { Order } = require("../models");

exports.createOrder = async (req, res) => {
  try {
    let { customer, phone, guests, tableId, tableNo } = req.body;

    console.log("📥 Incoming Order Body:", req.body);

    // Validate required fields
    if (!customer || !phone || !tableId || !tableNo || guests === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Convert guests and tableId to numbers
    guests = parseInt(guests);
    tableId = parseInt(tableId);

    if (isNaN(guests) || isNaN(tableId)) {
      return res.status(400).json({ message: "Invalid guests or tableId value" });
    }

    const newOrder = await Order.create({
      customer,
      phone,
      guests,
      tableId,
      tableNo,
      status: "In Progress",
    });

    console.log("✅ Order created:", newOrder);

    return res.status(201).json(newOrder);
  } catch (error) {
    console.error("❌ Backend error while creating order:", error);
    return res.status(500).json({ message: "Server error while creating order" });
  }
};

exports.getOrdersByStatus = async (req, res) => {
  try {
    const status = req.query.status;

    let orders;
    if (status && status !== "all") {
      orders = await Order.findAll({ where: { status } });
    } else {
      orders = await Order.findAll();
    }

    return res.status(200).json(orders);
  } catch (error) {
    console.error("❌ Backend error while fetching orders:", error);
    return res.status(500).json({ message: "Server error while fetching orders" });
  }
};
