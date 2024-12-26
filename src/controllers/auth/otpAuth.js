const User = require("../../models/User");
const smsService = require("../../services/sms");
const { storeOTP, verifyOTP } = require("../../services/otpService");
const { generateOTP, generateToken } = require("../../utils/auth");

exports.sendOTP = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    const otp = generateOTP();

    // Store OTP
    await storeOTP(phoneNumber, otp);

    // Send OTP via SMS
    const sent = await smsService.sendOTP(phoneNumber, otp);

    if (!sent) {
      return res.status(500).json({ message: "Failed to send OTP" });
    }

    res.status(200).json({
      message: "OTP sent successfully",
      expiresIn: 300, // 5 minutes
    });
  } catch (error) {
    console.error("Send OTP Error:", error);
    res.status(500).json({ message: "Error sending OTP" });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { phoneNumber, otp, role } = req.body;

    if (!phoneNumber || !otp || !role) {
      return res.status(400).json({
        message: "Phone number, OTP, and role are required",
      });
    }

    if (!["customer", "driver"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Verify OTP
    const isValid = await verifyOTP(phoneNumber, otp);
    if (!isValid) {
      return res.status(400).json({
        message: "Invalid or expired OTP",
      });
    }

    // Find or create user
    let user = await User.findOne({ phoneNumber });

    if (!user) {
      user = await User.create({
        phoneNumber,
        role,
        isVerified: true,
      });
    }

    const token = generateToken(user._id);
    res.status(200).json({
      token,
      user: {
        id: user._id,
        phoneNumber: user.phoneNumber,
        role: user.role,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error("Verify OTP Error:", error);
    res.status(500).json({ message: "Error verifying OTP" });
  }
};
