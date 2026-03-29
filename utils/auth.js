const jwt = require("jsonwebtoken");
const User = require("../models/User");

const secret = process.env.JWT_SECRET;

function signToken(userId) {
    return jwt.sign({ id: userId }, secret, { expiresIn: process.env.EXP });
}

async function authMiddleware(req, res, next) {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(403).json({ message: "NO TOKEN" });
    }
    token = token.split(" ").pop().trim();

    const decoded = jwt.verify(token, secret);
    const currentUser = await User.findById(decoded.id).select("-password");

    if (!currentUser) {
      return res.status(401).json({ message: "NOT A USER" });
    }

    req.user = currentUser;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
}

module.exports = { signToken, authMiddleware };
