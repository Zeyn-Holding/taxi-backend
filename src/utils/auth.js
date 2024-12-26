const jwt = require('jsonwebtoken');

exports.generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

exports.generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};