// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Import database models
const db = require("./models");

// Import routes
const authRoutes = require("./routes/authRoutes");
const customerAuthRoutes = require("./routes/customerAuthRoutes");
const orderRoutes = require("./routes/orderRoutes");
const tableRoutes = require("./routes/tableRoutes");
// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/auth/customer", customerAuthRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/tables", tableRoutes);
// Test route
app.get("/", (req, res) => {
  res.json({ message: "Coffee POS Backend API is running!" });
});

// Initialize database and start server
const PORT = process.env.PORT || 5000;

db.sequelize
  .sync({ force: false }) // or { alter: true } to update
  .then(() => {
    console.log("Database synced successfully");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database sync error:", error);
  });
