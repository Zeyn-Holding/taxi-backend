const express = require("express");
const router = express.Router();
const otpAuth = require("../controllers/auth/otpAuth");
const emailAuth = require("../controllers/auth/emailAuth");

// OTP routes (for customers and drivers)
router.post("/otp/send", otpAuth.sendOTP);
router.post("/otp/verify", otpAuth.verifyOTP);

// Email routes (for admin, operator, insertionAgent)
router.post("/register", emailAuth.register);
router.post("/login", emailAuth.login);

module.exports = router;
