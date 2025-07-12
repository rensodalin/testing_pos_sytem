const { Order, Table } = require("../models");

const getInitials = (name) => {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
};

exports.createOrder = async (req, res) => {
  try {
    let { customer, phone, guests, tableId, tableNo } = req.body;

    console.log("📥 Incoming Order Body:", req.body);

    if (!customer || !phone || !tableId || !tableNo || guests === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

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

    const initials = getInitials(customer);
    const table = await Table.findByPk(tableId);

    if (table) {
      table.status = "Booked";
      table.initial = initials;
      await table.save();
    }

    console.log("✅ Order created:", newOrder);
    return res.status(201).json(newOrder);

  } catch (error) {
    console.error("❌ Backend error while creating order:", error);
    return res.status(500).json({ message: "Server error while creating order" });
  }
};

// ✅ Add placeholder for getting orders (you can update this logic later)
exports.getOrdersByStatus = async (req, res) => {
  try {
    const orders = await Order.findAll();
    return res.json(orders);
  } catch (error) {
    console.error("❌ Failed to fetch orders:", error);
    return res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// ✅ Add placeholder for updating status (you can update this logic later)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    return res.json({ message: "Order status updated", order });
  } catch (error) {
    console.error("❌ Failed to update status:", error);
    return res.status(500).json({ message: "Failed to update order status" });
  }
};
