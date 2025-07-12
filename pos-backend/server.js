// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import database models
const db = require("./models");

// Import seeder
const seedInitialData = require("./seeders/initialData");

// Import routes
const authRoutes = require("./routes/authRoutes");
const customerAuthRoutes = require("./routes/customerAuthRoutes");
const orderRoutes = require("./routes/orderRoutes");
const tableRoutes = require("./routes/tableRoutes");
const menuRoutes = require("./routes/menuRoutes");

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/auth/customer", customerAuthRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/menu", menuRoutes);

// Health check route
app.get("/", (req, res) => {
  res.json({ 
    message: "Coffee POS Backend API is running!",
    version: "1.0.0",
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Initialize database and start server
const PORT = process.env.PORT || 5000;

db.sequelize
  .sync({ force: false }) // Use normal sync to avoid data loss
  .then(async () => {
    console.log("✅ Database synced successfully");
    
    // Seed initial data
    await seedInitialData();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📊 API Documentation: http://localhost:${PORT}/api`);
    });
  })
  .catch((error) => {
    console.error("❌ Database sync error:", error);
  });
