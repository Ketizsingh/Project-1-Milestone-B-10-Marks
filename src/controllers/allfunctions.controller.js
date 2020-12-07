const allfunctions = require('../models/allfunctions.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



exports.setLoginHistory = async (usedID, userType, req, res) => {

    allfunctions.setLoginHistory(usedID, userType, (err, result) => {
        if (err)
            console.log(err);
        console.log(result);

    })
}



exports.getLoginHistory = async (usedID, req, res) => {

    allfunctions.getLoginHistory(usedID, (err, result) => {
        if (err)
            console.log(err);
        console.log(result);

    })
}