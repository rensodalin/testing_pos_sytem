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

// Pass Sequelize.DataTypes instead of Sequelize
db.User = require("./User")(sequelize, Sequelize.DataTypes);
db.Order = require("./Order")(sequelize, Sequelize.DataTypes);
db.Table = require("./Table")(sequelize, Sequelize.DataTypes);

module.exports = db;
