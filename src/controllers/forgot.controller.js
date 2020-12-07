const forgotModel = require('../models/forgot.model');
const allfunctions = require('../models/allfunctions.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.forgot = async (req, res) => {


    const {
        accountType,
        resetType,
        resetValue,
        newpassword
    } = req.body;




    forgotModel.forgot(accountType, resetType, resetValue, (err, result_sql) => {
        if (err) {
            res.json({
                status: false,
                message: 'Please provide correct details to reset ' + resetType + '!'
            })
        } else if (result_sql.length > 0) {

            if (resetType == 'username') {

                res.json({
                    status: true,
                    message: 'Congratulations, your account username is <strong>' + result_sql[0].username + '</strong>'
                })

            } else if (!newpassword == '' && resetType == 'password') {
                forgotModel.setpassword(result_sql[0].id, accountType, newpassword, (err, passwordResponse) => {
                    if (err)
                        res.json({
                            status: false,
                            message: err
                        })
                    res.json({
                        status: true,
                        message: 'Congratulations, password updated for ' + result_sql[0].name + '` account.'
                    })
                })
            } else {
                res.json({
                    status: true,
                    message: 'Awesome, you can reset your ' + resetType + '.'
                })
            }
            // setpassword = (accountType, resetType, resetValue, password, result)


        } else {
            res.json({
                status: false,
                message: 'Please provide correct details to reset ' + resetType + '!'
            })
        }
    })
}