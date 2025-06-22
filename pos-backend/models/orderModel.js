const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Order = sequelize.define("Order", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    customerDetails: {
        type: DataTypes.JSON,
        allowNull: false,
        validate: {
            isValidCustomerDetails(value) {
                if (!value.name || !value.phone || !value.guests) {
                    throw new Error('Customer details must include name, phone, and guests');
                }
            }
        }
    },
    orderStatus: {
        type: DataTypes.STRING,
        allowNull: false
    },
    orderDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    bills: {
        type: DataTypes.JSON,
        allowNull: false,
        validate: {
            isValidBills(value) {
                if (!value.total || !value.tax || !value.totalWithTax) {
                    throw new Error('Bills must include total, tax, and totalWithTax');
                }
            }
        }
    },
    items: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    tableId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: true
    },
    paymentData: {
        type: DataTypes.JSON,
        defaultValue: {}
    }
}, {
    timestamps: true,
    tableName: 'orders'
});

module.exports = Order;