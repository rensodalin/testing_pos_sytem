module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("Order", {
      customer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      guests: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tableId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tableNo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("In Progress", "Ready", "Completed"),
        defaultValue: "In Progress",
      },
    });
    
  
    return Order;
  };
  