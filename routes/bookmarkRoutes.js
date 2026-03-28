const express = require('express');
const Bookmark = require('../models/Bookmark');
const { authMiddleware } = require('../utils/auth');

const router = express.Router();

router.use(authMiddleware);

router.post('/', async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}


router.get('/', async (req, res) => {
    try {
        
    } catch (error) {
        
    }

}


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