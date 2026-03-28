const express = require('express');
const Bookmark = require('../models/Bookmark');
const { authMiddleware } = require('../utils/auth');

const router = express.Router();

router.use(authMiddleware);

router.post('/', async (req, res) => {


router.get('/', async (req, res) => {


    router.get('/:id', async (req, res) => {


        router.put('/:id', async (req, res) => {


            router.delete('/:id', async (req, res) => {


                module.exports = router;