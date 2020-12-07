const express = require('express');
const router = express.Router();
const needyPeopleController = require('../controllers/needyPeople.controller');
const security = require('../models/authentication.module');
//get all the needyPeople list
router.get('/', security.authenticatToken, needyPeopleController.getEmoployeeList);

router.get('/:id', security.authenticatToken, needyPeopleController.getNeedyPeopleById);

router.post('/', security.authenticatToken, needyPeopleController.createNewNeedyPeople);

router.put('/:id', security.authenticatToken, needyPeopleController.updateNeedyPeople);

router.delete('/:id', security.authenticatToken, needyPeopleController.deleteNeedyPeople);

module.exports = router;