const express = require('express');
const compoundController = require('../controllers/compoundController');
const router = express.Router();

router.get('/', compoundController.getPaginatedCompounds);
router.get('/new', compoundController.getNewCompoundForm);
router.post('/new', compoundController.submitCompoundForm);
// test
router.get('/filldummydb', compoundController.fillDummyDb);
router.get('/dbreset', compoundController.emptyOutDb)

router.get('/:casNumber', compoundController.getCompoundByCas)



module.exports = router;