const jwt = require("jsonwebtoken");

// Basic middleware that allows all requests (for development)
const basicAuth = (req, res, next) => {
  // TODO: Add real authentication logic here
  console.log("🔐 Basic auth middleware - allowing request");
  next();
};

// JWT token verification middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided."
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_jwt_secret");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token."
    });
  }
};

// Role-based authorization middleware
const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Access denied. User not authenticated."
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Insufficient permissions."
      });
    }

    next();
  };
};

// Export the middleware functions
module.exports = basicAuth; // Default export for backward compatibility

// Named exports for specific middleware
module.exports.verifyToken = verifyToken;
module.exports.authorizeRole = authorizeRole;
module.exports.basicAuth = basicAuth;



