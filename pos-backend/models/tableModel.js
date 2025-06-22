const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Table = sequelize.define("Table", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tableNo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "Available"
    },
    seats: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    currentOrderId: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    timestamps: true,
    tableName: 'tables'
});

module.exports = Table;