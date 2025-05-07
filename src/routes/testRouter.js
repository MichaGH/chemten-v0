const express = require('express');
const testController = require('../controllers/testController.js');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("pages/tests/index");
})
router.get('/new', testController.getTestForm);
router.post('/new', testController.submitTestForm);

module.exports = router
// 177,32 €
// vs 7307042258

// 55,37