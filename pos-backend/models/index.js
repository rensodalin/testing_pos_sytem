const User = require('./userModel');
const Table = require('./tableModel');
const Order = require('./orderModel');
const Payment = require('./paymentModel');

// Define associations after all models are loaded
const setupAssociations = () => {
    // Table-Order relationship
    Table.hasMany(Order, { 
        foreignKey: 'tableId', 
        as: 'orders',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    });
    Order.belongsTo(Table, { 
        foreignKey: 'tableId', 
        as: 'table',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
    });

    // Order-Payment relationship (optional)
    Order.hasOne(Payment, { 
        foreignKey: 'orderId', 
        sourceKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
    Payment.belongsTo(Order, { 
        foreignKey: 'orderId', 
        targetKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });
};

// Setup associations
setupAssociations();

module.exports = {
    User,
    Table,
    Order,
    Payment
}; 