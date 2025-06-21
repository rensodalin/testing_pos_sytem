import express from "express";
import cors from "cors";
import { pool, testConnection } from "./utils/database.js";
// import articleRouter from "./routes/articleRoutes.js";

const app = express();
app.use("/api/user" , require("./routes/userRoute.js"));

// Enable CORS for all routes and origins
app.use(cors());

// Enable json serialization
app.use(express.json());

// Test the connection when server starts
testConnection();

// Make pool available to routes
app.locals.db = pool;

// Basic health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Test database route
app.get('/api/test-db', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT 1 as test');
    res.json({ 
      status: 'success', 
      message: 'Database connection working',
      data: rows 
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'error', 
      message: 'Database connection failed',
      error: error.message 
    });
  }
});

// Uncomment when you create the routes
// app.use("/api/articles", articleRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔧 Database test: http://localhost:${PORT}/api/test-db`);
});