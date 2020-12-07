const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/volunteer.controller');
const security = require('../models/authentication.module');


//get all the volunteer list
router.get('/', security.authenticatToken, volunteerController.getEmoployeeList);

router.get('/:id', security.authenticatToken, volunteerController.getVolunteerById);

router.post('/', security.authenticatToken, volunteerController.createNewVolunteer);

router.put('/:id', security.authenticatToken, volunteerController.updateVolunteer);

router.delete('/:id', security.authenticatToken, volunteerController.deleteVolunteer);

module.exports = router;