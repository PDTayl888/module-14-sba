const express = require('express');
const Bookmark = require('../models/Bookmark');
const { authMiddleware } = require('../utils/auth');

const router = express.Router();

router.use(authMiddleware);

router.post('/', async (req, res) => {
    const { title, url} = req.body;
    try {
        const bookmark = await Bookmark.create({
            title, 
            url,
            user: req.user._id
        });
        res.status(201).json(bookmark);
    } catch (error) {
        res.status(500).json({ message: 'SERVER ERROR', error: error.message});
    }
});


router.get('/', async (req, res) => {
    try {
        const bookmarks = await Bookmark.find({ user: req.user._id });
        res.json(bookmarks);
    } catch (error) {
          res.status(500).json({ message: 'SERVER ERROR', error: error.message});
    }

});


    router.get('/:id', async (req, res) => {
    try {
        
    } catch (error) {
        
    }

    }


        router.put('/:id', async (req, res) => {
    try {
        
    } catch (error) {
        
    }

        }


            router.delete('/:id', async (req, res) => {
    try {
        
    } catch (error) {
        
    }

            }


                module.exports = router;