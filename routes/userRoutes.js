const express = require("express");
const passport = require("passport");
const User = require("../models/User");

const { signToken } = require("../utils/auth");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "USER EXISTS" });

    const user = await User.create({ email, password });
    res.status(201).json({
      _id: user._id,
      email: user.email,
      token: signToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "SSERVER ERROR", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        email: user.email,
        token: signToken(user._id),
      });
    } else {
      res.status(401).json({ message: "INVALID EMAIL OR PASSWORD" });
    }
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR", error: error.message });
  }
});

router.get("/auth/github", passport.authenticate("github", { session: false }));

router.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    const token = signToken(req.user._id);
    res.redirect(`${process.env.FRONTEND_URL}/login?token=${token}`);
  },
);

module.exports = router;
