const express = require("express");
const Bookmark = require("../models/Bookmark");
const { authMiddleware } = require("../utils/auth");

const router = express.Router();

router.use(authMiddleware);

router.post("/", async (req, res) => {
  const { title, url } = req.body;
  try {
    const bookmark = await Bookmark.create({
      title,
      url,
      user: req.user._id,
    });
    res.status(201).json(bookmark);
  } catch (error) {
    res.status(500).json({
      message: "SERVER ERROR",
      error: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.user._id });
    res.json(bookmarks);
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const bookmark = await Bookmark.findById(req.params.id);
    if (!bookmark) {
      return res.status(404).json({ message: "BOOKMARD NOT FOUND" });
    }

    if (bookmark.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "NOT AUTHORIZED" });
    }
    res.json(bookmark);
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR", error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    let bookmark = await Bookmark.findById(req.params.id);
    if (!bookmark) {
      return res.status(404).json({ message: "NOT FOUND" });
    }
    if (bookmark.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "NOT AUTHORIZED" });
    }

    bookmark = await Bookmark.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(bookmark);
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR", error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let bookmark = await Bookmark.findById(req.params.id);
    if (!bookmark) {
      return res.status(404).json({ message: "NOT FOUND" });
    }
    if (bookmark.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "NOT AUTHORIZED" });
    }
    await bookmark.deleteOne();
    res.json({ message: `DELETED: ${bookmark.title}` });
  } catch (error) {
    res.status(500).json({ message: "SERVER ERROR", error: error.message });
  }
});

module.exports = router;
