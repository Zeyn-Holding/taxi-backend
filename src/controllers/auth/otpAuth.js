const User = require('../../models/User');
const smsService = require('../../services/sms');
const { generateOTP, generateToken } = require('../../utils/auth');

exports.sendOTP = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const otp = generateOTP();
    
    // Store OTP in session/cache (implement proper OTP storage)
    const sent = await smsService.sendOTP(phoneNumber, otp);
    
    if (!sent) {
      return res.status(400).json({ message: 'Failed to send OTP' });
    }
    
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending OTP' });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { phoneNumber, otp, role } = req.body;
    
    // Verify OTP (implement proper OTP verification)
    // For now, assuming OTP is valid
    
    let user = await User.findOne({ phoneNumber });
    
    if (!user) {
      user = await User.create({
        phoneNumber,
        role: ['customer', 'driver'].includes(role) ? role : 'customer',
        isVerified: true
      });
    }
    
    const token = generateToken(user._id);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying OTP' });
  }
};