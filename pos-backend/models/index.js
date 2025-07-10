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
db.User = require("./User")(sequelize, Sequelize);

module.exports = db;
