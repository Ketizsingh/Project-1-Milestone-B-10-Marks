const express = require('express');
const router = express.Router();
const forgotController = require('../controllers/forgot.controller');


//forgot
router.post('/', forgotController.forgot);




module.exports = router;