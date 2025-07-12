const Sequelize = require("sequelize");
const config = require("../config/db.config");

let sequelize;

if (config.dialect === "sqlite") {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: config.storage,
    logging: false,
  });
} else {
  sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    dialect: config.dialect,
    logging: false,
  });
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require("./User")(sequelize, Sequelize.DataTypes);
db.Category = require("./Category")(sequelize, Sequelize.DataTypes);
db.MenuItem = require("./MenuItem")(sequelize, Sequelize.DataTypes);
db.Table = require("./Table")(sequelize, Sequelize.DataTypes);
db.Order = require("./Order")(sequelize, Sequelize.DataTypes);
db.OrderItem = require("./OrderItem")(sequelize, Sequelize.DataTypes);
db.Payment = require("./Payment")(sequelize, Sequelize.DataTypes);

// Define associations
// User associations
db.User.hasMany(db.Order, { foreignKey: 'customerId', as: 'orders' });
db.User.hasMany(db.Order, { foreignKey: 'staffId', as: 'staffOrders' });

// Category associations
db.Category.hasMany(db.MenuItem, { foreignKey: 'categoryId', as: 'menuItems' });
db.MenuItem.belongsTo(db.Category, { foreignKey: 'categoryId', as: 'category' });

// Table associations
db.Table.hasMany(db.Order, { foreignKey: 'tableId', as: 'orders' });
db.Order.belongsTo(db.Table, { foreignKey: 'tableId', as: 'table' });

// Order associations
db.Order.belongsTo(db.User, { foreignKey: 'customerId', as: 'customer' });
db.Order.belongsTo(db.User, { foreignKey: 'staffId', as: 'staff' });
db.Order.hasMany(db.OrderItem, { foreignKey: 'orderId', as: 'orderItems' });
db.Order.hasOne(db.Payment, { foreignKey: 'orderId', as: 'payment' });

// OrderItem associations
db.OrderItem.belongsTo(db.Order, { foreignKey: 'orderId', as: 'order' });
db.OrderItem.belongsTo(db.MenuItem, { foreignKey: 'menuItemId', as: 'menuItem' });

// Payment associations
db.Payment.belongsTo(db.Order, { foreignKey: 'orderId', as: 'order' });

module.exports = db;
