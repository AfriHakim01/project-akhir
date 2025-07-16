const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_TOKEN;

const generateToken = (payload) => jwt.sign(payload, JWT_KEY);
const verifyToken = (token) => jwt.verify(token, JWT_KEY);

module.exports = {
  generateToken,
  verifyToken,
};
