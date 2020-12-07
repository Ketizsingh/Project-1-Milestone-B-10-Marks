const express = require('express');
const router = express.Router();
const logoutController = require('../controllers/logout.controller');


//login
router.post('/', logoutController.logout);




module.exports = router;