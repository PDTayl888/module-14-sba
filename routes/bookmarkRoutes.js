const express = require('express');
const Bookmark = require('../models/Bookmark');
const { authMiddleware } = require('../utils/auth');

const router = express.Router();

router.use(authMiddleware);