const OTP = require("../models/OTP");

async function storeOTP(phoneNumber, otp) {
  // Remove any existing OTP for this phone number
  await OTP.deleteOne({ phoneNumber });

  // Store new OTP
  await OTP.create({ phoneNumber, otp });
}

async function verifyOTP(phoneNumber, otp) {
  const otpDoc = await OTP.findOne({ phoneNumber });

  if (!otpDoc) {
    return false;
  }

  const isValid = otpDoc.otp === otp;

  if (isValid) {
    await OTP.deleteOne({ phoneNumber });
  }

  return isValid;
}

module.exports = {
  storeOTP,
  verifyOTP,
};
