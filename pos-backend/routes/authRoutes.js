// const express = require("express");
// const router = express.Router();
// const authController = require("../controllers/authController");

// router.post("/login", authController.login);

// module.exports = router;

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Mounted at /api/auth/customer in server.js
router.post("/register", authController.registerStaff);
router.post("/login", authController.loginStaff);
router.post("/register", authController.registerCustomer);
router.post("/login", authController.loginCustomer);

module.exports = router;




