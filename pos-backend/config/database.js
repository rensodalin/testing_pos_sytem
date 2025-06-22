const { Sequelize } = require("sequelize");
const config = require("./config");

const sequelize = new Sequelize(
    config.database.database,
    config.database.username,
    config.database.password,
    {
        host: config.database.host,
        port: config.database.port,
        dialect: config.database.dialect,
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        define: {
            charset: 'utf8mb4',
            collate: 'utf8mb4_unicode_ci'
        }
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log(`✅ Database Connected: ${config.database.host}:${config.database.port}`);
        
        // Sync all models with database - force: true for first time setup
        await sequelize.sync({ force: false, alter: true });
        console.log("✅ Database synchronized");
    } catch (error) {
        console.log(`❌ Database connection failed: ${error.message}`);
        process.exit();
    }
}

module.exports = { sequelize, connectDB };