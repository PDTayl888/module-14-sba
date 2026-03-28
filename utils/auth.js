const jwt = require("jsonwebtoken");
const User = require("../models/User");

const secret = process.env.JWT_SECRET;

const token = (userId) => {
  try {
let token = req.headers.authorization;

if (!token) {
  return res.status(403).json({ message: "NO TOKEN"});
}
token = token.split(' ').pop().trim();

const decodec = jwt.
  } catch (console) {

  }
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "2d" });
};
