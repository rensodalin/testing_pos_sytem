module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Table", {
    tableNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    seats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Available",
    },
    initial: {
      type: DataTypes.STRING,
      defaultValue: "-",
    },
  },
  );
};
