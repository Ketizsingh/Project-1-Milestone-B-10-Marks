const express = require('express');
const router = express.Router();
require('dotenv').config()
const jwt = require('jsonwebtoken');


exports.authenticatToken = (req, res, next) => {

    const token = req.headers['authorization'];
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        global.loggedInUser = user['result_sql'][0];
        next()
    })
}