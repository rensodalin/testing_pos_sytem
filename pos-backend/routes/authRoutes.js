// const express = require("express");
// const router = express.Router();
// const authController = require("../controllers/authController");

// router.post("/login", authController.login);

// module.exports = router;

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register);  // ← rename your controller to match this
router.post("/login", authController.login);
router.post("/customer/register", authController.register); // uses same register function
router.post("/customer/login", authController.login);       // uses same login function
module.exports = router;



