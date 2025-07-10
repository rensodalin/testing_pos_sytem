// module.exports = (sequelize, DataTypes) => {
//     const User = sequelize.define("User", {
//       name: { type: DataTypes.STRING, allowNull: false },
//       email: { type: DataTypes.STRING, allowNull: false, unique: true },
//       phone: DataTypes.STRING,
//       password: { type: DataTypes.STRING, allowNull: false },
//       role: DataTypes.STRING, // Admin, Waiter, Customer, etc.
//       address: DataTypes.STRING,
//       preferences: DataTypes.JSON,
//       loyaltyPoints: {
//         type: DataTypes.INTEGER,
//         defaultValue: 0
//       }
//     });
  
//     return User;
//   };



module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    phone: DataTypes.STRING,
    password: { type: DataTypes.STRING, allowNull: false },
    role: DataTypes.STRING,
    address: DataTypes.STRING,
    preferences: DataTypes.JSON,
    loyaltyPoints: { type: DataTypes.INTEGER, defaultValue: 0 },
  });
  return User;
};