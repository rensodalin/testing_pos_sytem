module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    orderNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    customerPhone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    staffId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    tableId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    tableNo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    guests: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    orderType: {
      type: DataTypes.ENUM('dine-in', 'takeaway', 'delivery'),
      defaultValue: 'dine-in'
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'preparing', 'In Progress', 'ready', 'served', 'completed', 'cancelled'),
      defaultValue: 'pending'
    },
    paymentStatus: {
      type: DataTypes.ENUM('pending', 'paid', 'failed'),
      defaultValue: 'pending'
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    },
    taxAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    timestamps: true,
    tableName: 'orders',
    hooks: {
      beforeCreate: (order) => {
        if (!order.orderNumber) {
          order.orderNumber = `ORD${Date.now()}`;
        }
      }
    }
  });

  return Order;
};
  