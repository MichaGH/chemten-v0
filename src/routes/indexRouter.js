const express = require('express');
const router = express.Router();

const Compound = require('../models/compoundSchema');

const getShowcaseCompounds = async(req, res) => {
    try {
        const flagshipCompounds = await Compound.find().limit(5);
        const latestCompounds = await Compound.find().sort({ createdAt: -1 }).limit(5);
        res.render('pages/home', {flagshipCompounds, latestCompounds, pageStylesheets: []})

    } catch (error) {

    }
}


router.get('/about', async (req, res) => {
    res.render('pages/about');
})

router.get('/', getShowcaseCompounds);


/*
router.get('/', (req, res) => {
    res.render('pages/home', {})
})
*/

module.exports = router
