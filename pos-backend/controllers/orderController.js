const db = require("../models");
const Order = db.Order;
const OrderItem = db.OrderItem;
const Payment = db.Payment;
const Table = db.Table;
const User = db.User;
const MenuItem = db.MenuItem;
const { Op } = require("sequelize");

// Create a new order
// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const {
      customerName,
      customer, // Handle old frontend format
      customerPhone,
      phone, // Handle old frontend format
      customerId,
      staffId,
      tableId,
      tableNo,
      guests,
      orderType,
      items,
      notes,
      paymentMethod,
      paymentStatus,
      total, // Handle frontend total
      status // Handle frontend status
    } = req.body;

    // Normalize field names for compatibility
    const normalizedCustomerName = customerName || customer;
    const normalizedCustomerPhone = customerPhone || phone;

    // Validate required fields
    if (!normalizedCustomerName || !normalizedCustomerPhone) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: customerName and customerPhone are required"
      });
    }

    // Handle different item formats
    let processedItems = [];
    let subtotal = 0;

    if (items && items.length > 0) {
      // Process items - handle both frontend and backend formats
      for (const item of items) {
        let menuItem;
        
        // Try to find menu item by different possible ID fields
        if (item.menuItemId) {
          menuItem = await MenuItem.findByPk(item.menuItemId);
        } else if (item.id) {
          menuItem = await MenuItem.findByPk(item.id);
        }
        
        if (!menuItem) {
          return res.status(400).json({
            success: false,
            message: `Menu item not found for item: ${item.name || item.menuItemId || item.id}`
          });
        }
        
        const quantity = item.quantity || 1;
        const itemTotal = menuItem.price * quantity;
        subtotal += itemTotal;
        
        processedItems.push({
          menuItemId: menuItem.id,
          quantity: quantity,
          unitPrice: menuItem.price,
          totalPrice: itemTotal,
          notes: item.notes || ""
        });
      }
    } else {
      // If no items provided, use the total from frontend or default to 0
      subtotal = total || 0;
    }

    const taxRate = 5.25; // 5.25% tax rate
    const taxAmount = (subtotal * taxRate) / 100;
    const totalAmount = subtotal + taxAmount;

    // Generate order number manually to ensure it's set
    const orderNumber = `ORD${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Create order with generated orderNumber
    const order = await Order.create({
      orderNumber, // ✅ Manually set orderNumber
      customerName: normalizedCustomerName,
      customerPhone: normalizedCustomerPhone,
      customerId,
      staffId,
      tableId,
      tableNo,
      guests: guests || 1,
      orderType: orderType || 'dine-in',
      subtotal,
      taxAmount,
      totalAmount,
      notes,
      status: status || (paymentStatus === 'paid' ? 'confirmed' : 'pending'),
      paymentStatus: paymentStatus || 'pending'
    });

    // Payment creation temporarily disabled to avoid database issues
    // await Payment.create({ ... });

    // Update table status if dine-in order
    if (orderType === 'dine-in' && tableId) {
      try {
        const table = await Table.findByPk(tableId);
        if (table) {
          table.status = 'Booked';
          table.initial = getInitials(normalizedCustomerName);
          await table.save();
        }
      } catch (tableError) {
        console.warn("Table update failed:", tableError.message);
        // Continue without updating table
      }
    }

    // Create order items only if we have processed items
    if (processedItems.length > 0) {
      for (const item of processedItems) {
        await OrderItem.create({
          orderId: order.id,
          ...item
        });
      }
    }

    // Fetch complete order with associations
    const completeOrder = await Order.findByPk(order.id, {
      include: [
        {
          model: OrderItem,
          as: 'orderItems',
          include: [{
            model: MenuItem,
            as: 'menuItem',
            attributes: ['id', 'name', 'price', 'image']
          }]
        }
      ]
    });

    // Transform order to match frontend expectations
    const orderData = completeOrder.toJSON();
    const transformedOrder = {
      id: orderData.id,
      customer: orderData.customerName,           // ✅ Map customerName to customer
      phone: orderData.customerPhone,             // ✅ Map customerPhone to phone
      status: orderData.status,
      guests: orderData.guests,
      tableNo: orderData.tableNo,
      total: orderData.totalAmount,
      orderType: orderData.orderType,
      paymentStatus: orderData.paymentStatus,
      createdAt: orderData.createdAt,
      updatedAt: orderData.updatedAt,
      dateTime: orderData.createdAt,              // ✅ Map createdAt to dateTime for frontend
      // Keep original fields for backward compatibility
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      totalAmount: orderData.totalAmount,
      // Include associations
      orderItems: orderData.orderItems || [],
      items: orderData.orderItems || []          // ✅ Map orderItems to items for frontend
    };

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: transformedOrder
    });

  } catch (error) {
    console.error("Error creating order:", error);
    console.error("Error stack:", error.stack);
    console.error("Request body:", req.body);
    res.status(500).json({
      success: false,
      message: "Error creating order",
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// Test endpoint for debugging
exports.testOrderCreation = async (req, res) => {
  try {
    console.log("Test order creation - Request body:", req.body);
    
    // Test database connection
    try {
      await db.sequelize.authenticate();
      console.log("✅ Database connection successful");
    } catch (dbError) {
      console.error("❌ Database connection failed:", dbError);
      return res.status(500).json({
        success: false,
        message: "Database connection failed",
        error: dbError.message
      });
    }
    
    // Try to create a minimal order
    const testOrder = await Order.create({
      orderNumber: `TEST${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      customerName: "Test Customer",
      customerPhone: "1234567890",
      guests: 1,
      orderType: "dine-in",
      subtotal: 0,
      taxAmount: 0,
      totalAmount: 0,
      status: "pending",
      paymentStatus: "pending"
    });
    
    console.log("Test order created successfully:", testOrder.toJSON());
    
    // Note: Payment creation is temporarily disabled due to database schema issues
    
    res.status(200).json({
      success: true,
      message: "Test order created successfully (without payment)",
      data: testOrder
    });
  } catch (error) {
    console.error("Test order creation failed:", error);
    res.status(500).json({
      success: false,
      message: "Test order creation failed",
      error: error.message,
      stack: error.stack
    });
  }
};


// Get all orders with filters
exports.getAllOrders = async (req, res) => {
  try {
    const {
      status,
      paymentStatus,
      orderType,
      startDate,
      endDate,
      customerName,
      page = 1,
      limit = 20
    } = req.query;

    const whereClause = {};
    
    if (status) {
      whereClause.status = status;
    }
    
    if (paymentStatus) {
      whereClause.paymentStatus = paymentStatus;
    }
    
    if (orderType) {
      whereClause.orderType = orderType;
    }
    
    if (customerName) {
      whereClause.customerName = {
        [Op.iLike]: `%${customerName}%`
      };
    }
    
    if (startDate && endDate) {
      whereClause.createdAt = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }

    const offset = (page - 1) * limit;

    // First, try to get orders with basic info only
    const orders = await Order.findAndCountAll({
      where: whereClause,
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    // If successful, try to get with associations
    let ordersWithAssociations = [];
    try {
      ordersWithAssociations = await Order.findAll({
        where: whereClause,
        include: [
          {
            model: OrderItem,
            as: 'orderItems',
            required: false,
            include: [{
              model: MenuItem,
              as: 'menuItem',
              attributes: ['id', 'name', 'price'],
              required: false
            }]
          }
        ],
        order: [['createdAt', 'DESC']],
        limit: parseInt(limit),
        offset: parseInt(offset)
      });
    } catch (associationError) {
      console.warn("Association error, returning basic order data:", associationError.message);
      // If associations fail, return basic order data
      ordersWithAssociations = orders.rows;
    }

    // Transform orders to match frontend expectations
    const transformedOrders = ordersWithAssociations.map(order => {
      const orderData = order.toJSON();
      
      // Map backend fields to frontend expected fields
      return {
        id: orderData.id,
        customer: orderData.customerName,           // ✅ Map customerName to customer
        phone: orderData.customerPhone,             // ✅ Map customerPhone to phone
        status: orderData.status,
        guests: orderData.guests,
        tableNo: orderData.tableNo,
        total: orderData.totalAmount,
        orderType: orderData.orderType,
        paymentStatus: orderData.paymentStatus,
        createdAt: orderData.createdAt,
        updatedAt: orderData.updatedAt,
        dateTime: orderData.createdAt,              // ✅ Map createdAt to dateTime for frontend
        // Keep original fields for backward compatibility
        customerName: orderData.customerName,
        customerPhone: orderData.customerPhone,
        totalAmount: orderData.totalAmount,
        // Include associations
        orderItems: orderData.orderItems || [],
        items: orderData.orderItems || []          // ✅ Map orderItems to items for frontend
      };
    });

    res.status(200).json({
      success: true,
      data: transformedOrders,
      pagination: {
        total: orders.count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(orders.count / limit)
      }
    });

  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
      error: error.message
    });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByPk(id, {
      include: [
        {
          model: OrderItem,
          as: 'orderItems',
          include: [{
            model: MenuItem,
            as: 'menuItem',
            attributes: ['id', 'name', 'price', 'image', 'description']
          }]
        },
        {
          model: Payment,
          as: 'payment'
        },
        {
          model: Table,
          as: 'table'
        },
        {
          model: User,
          as: 'customer',
          attributes: ['id', 'name', 'phone', 'email']
        },
        {
          model: User,
          as: 'staff',
          attributes: ['id', 'name']
        }
      ]
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });

  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching order",
      error: error.message
    });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, estimatedTime } = req.body;

    const order = await Order.findByPk(id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    const updateData = { status };
    
    if (status === 'completed') {
      updateData.completedAt = new Date();
      
      // Reset table status when order is completed
      if (order.tableId) {
        try {
          const table = await Table.findByPk(order.tableId);
          if (table) {
            table.status = 'Available';
            table.initial = '-';
            await table.save();
          }
        } catch (tableError) {
          console.warn("Table reset failed:", tableError.message);
          // Continue without resetting table
        }
      }
    }
    
    if (estimatedTime) {
      updateData.estimatedTime = new Date(estimatedTime);
    }

    await order.update(updateData);

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order
    });

  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({
      success: false,
      message: "Error updating order status",
      error: error.message
    });
  }
};

// Update payment status
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentStatus, transactionId, gatewayResponse } = req.body;

    const order = await Order.findByPk(id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    // Update order payment status
    await order.update({ paymentStatus });

    // Update payment record
    const payment = await Payment.findOne({ where: { orderId: id } });
    if (payment) {
      await payment.update({
        status: paymentStatus === 'paid' ? 'completed' : 'pending',
        transactionId,
        gatewayResponse
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment status updated successfully"
    });

  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(500).json({
      success: false,
      message: "Error updating payment status",
      error: error.message
    });
  }
};

// Get recent orders
exports.getRecentOrders = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const orders = await Order.findAll({
      include: [
        {
          model: OrderItem,
          as: 'orderItems',
          include: [{
            model: MenuItem,
            as: 'menuItem',
            attributes: ['id', 'name', 'price']
          }]
        },
        {
          model: Payment,
          as: 'payment'
        },
        {
          model: Table,
          as: 'table'
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit)
    });

    res.status(200).json({
      success: true,
      data: orders
    });

  } catch (error) {
    console.error("Error fetching recent orders:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching recent orders",
      error: error.message
    });
  }
};

// Get orders by status
exports.getOrdersByStatus = async (req, res) => {
  try {
    const { status } = req.params;

    const orders = await Order.findAll({
      where: { status },
      include: [
        {
          model: OrderItem,
          as: 'orderItems',
          include: [{
            model: MenuItem,
            as: 'menuItem',
            attributes: ['id', 'name', 'price']
          }]
        },
        {
          model: Payment,
          as: 'payment'
        },
        {
          model: Table,
          as: 'table'
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      success: true,
      data: orders
    });

  } catch (error) {
    console.error("Error fetching orders by status:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching orders by status",
      error: error.message
    });
  }
};

// Delete order
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByPk(id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    // Reset table status if this was a dine-in order
    if (order.tableId) {
      try {
        const table = await Table.findByPk(order.tableId);
        if (table) {
          table.status = 'Available';
          table.initial = '-';
          await table.save();
        }
      } catch (tableError) {
        console.warn("Table reset failed:", tableError.message);
        // Continue without resetting table
      }
    }

    // Delete related records
    await OrderItem.destroy({ where: { orderId: id } });
    await Payment.destroy({ where: { orderId: id } });
    await order.destroy();

    res.status(200).json({
      success: true,
      message: "Order deleted successfully"
    });

  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting order",
      error: error.message
    });
  }
};

// Complete order (sets status to completed and resets table)
exports.completeOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByPk(id);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    // Update order status to completed
    await order.update({ 
      status: 'completed',
      completedAt: new Date()
    });

    // Reset table status when order is completed
    if (order.tableId) {
      try {
        const table = await Table.findByPk(order.tableId);
        if (table) {
          table.status = 'Available';
          table.initial = '-';
          await table.save();
        }
      } catch (tableError) {
        console.warn("Table reset failed:", tableError.message);
        // Continue without resetting table
      }
    }

    res.status(200).json({
      success: true,
      message: "Order completed successfully",
      data: order
    });

  } catch (error) {
    console.error("Error completing order:", error);
    res.status(500).json({
      success: false,
      message: "Error completing order",
      error: error.message
    });
  }
};

// Helper function to get initials
const getInitials = (name) => {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
};
