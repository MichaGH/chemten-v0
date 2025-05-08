const express = require('express');
const router = express.Router();

// Get Controllers
const adminCompoundController = require('../../controllers/admin/adminCompoundController');
const adminController = require('../../controllers/admin/adminController');
const adminUploadController = require('../../controllers/admin/adminUploadController');;

// Auth middleware (custom)
const ensureAdmin = require('../../middleware/auth');
const upload = require('../../middleware/uploadMiddleware');

// Initiate .env 
const dotenv = require('dotenv');
dotenv.config();


//! Dashboard and login/logout
// Login page
router.get('/login', adminController.getLoginPage);

// Handle login form submission
router.post('/login', adminController.submitLogin);

// Protected dashboard
router.get('/', ensureAdmin, adminController.getAdminDashboard);// PUT ENSURE ADMIN 

// Logout
router.get('/logout', adminController.adminLogout);

//! Compounds
// All compounds table
router.get('/compounds', ensureAdmin, adminCompoundController.getPaginatedCompoundsAdmin);  // PUT ENSURE ADMIN 
//! router.get('/compounds', ensureAdmin, adminCompoundController.getPaginatedCompoundsAdmin);
// PUT ENSURE ADMIN 

// Get New Compound Form
router.get('/compounds/new', ensureAdmin, adminCompoundController.getNewCompoundFormAdmin); // PUT ENSURE ADMIN 

// Post New Compound
router.post('/compounds/new', ensureAdmin, adminCompoundController.submitNewCompoundAdmin);     // PUT ENSURE ADMIN 

// Get Edit Compound Form
router.get('/compounds/edit/:casNumber', ensureAdmin, adminCompoundController.getEditCompoundFormAdmin);// PUT ENSURE ADMIN 

// Get Single Compound By Cas
router.get('/compounds/:casNumber', ensureAdmin, adminCompoundController.getCompoundByCasAdmin);// PUT ENSURE ADMIN 

//! Uploads

router.get('/structures', ensureAdmin, adminUploadController.getUploadStructurePage);// PUT ENSURE ADMIN 

router.post('/structures/upload', ensureAdmin, upload.single('structureImage'), adminUploadController.uploadStructure);// PUT ENSURE ADMIN 

module.exports = router;
