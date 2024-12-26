const axios = require("axios");

const config = {
  baseUrl: process.env.SMS_API_URL || "",
  apiKey: process.env.SMS_API_KEY || "",
  sender: process.env.SMS_SENDER || "",
};

async function sendSMS(phoneNumber, message) {
  try {
    // Placeholder URL structure - adjust according to Tunisie SMS API
    const url = `${config.baseUrl}?key=${
      config.apiKey
    }&phone=${phoneNumber}&message=${encodeURIComponent(message)}&sender=${
      config.sender
    }`;

    const response = await axios.get(url);
    return response.status === 200;
  } catch (error) {
    console.error("SMS sending error:", error);
    return false;
  }
}

async function sendOTP(phoneNumber, otp) {
  const message = `Your verification code is: ${otp}`;
  console.log(message);
  // return await sendSMS(phoneNumber, message);
}

module.exports = {
  sendOTP,
  sendSMS,
};
