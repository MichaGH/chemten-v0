const express = require('express');
const compoundController = require('../controllers/compoundController');
const router = express.Router();

router.get('/', compoundController.getPaginatedCompounds);

router.get('/:casNumber', compoundController.getCompoundByCas)



module.exports = router;