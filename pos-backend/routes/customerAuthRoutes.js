const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Fix routes: remove /customer prefix here since mounted in server.js at /api/auth/customer
router.post("/register", authController.registerCustomer);
router.post("/login", authController.loginCustomer);



module.exports = router;

