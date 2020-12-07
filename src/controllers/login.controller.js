const loginModel = require('../models/login.model');
const allfunctions = require('../models/allfunctions.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.login = async (req, res) => {


    const {
        username,
        password,
        type,
        remember
    } = req.body;

    const tokenExpireTime = ((remember == 'true')) ? '360d' : '30m'; // if "remember me" checked, token is for 360days else 30 minutes
    // const type = ((typed == 'needy')) ? 'needy' : 'volunteer';


    loginModel.login(username, password, type, (err, result_sql) => {
        if (err) {
            res.status(400).err;
        } else {
            // if(res.length > 0 || !(await bcrypt.compare(password,res[0]['password'])))
            if (result_sql.length > 0 && bcrypt.compareSync(password, result_sql[0]['password'])) {
                const accessToken = jwt.sign({
                    result_sql
                }, process.env.ACCESS_TOKEN_SECRET, {

                    expiresIn: tokenExpireTime // expires in 24hrs


                })

                allfunctions.setLoginHistory(result_sql[0]['id'], type, (err, result_sql) => {
                    if (err)
                        console.log(err)
                    console.log(result_sql)

                })

                res.json({
                    status: true,
                    message: 'You are successfully logged in',
                    id: result_sql[0]['id'],
                    accessToken: accessToken
                })


            } else {
                res.status(401).json({
                    status: false,
                    message: 'Please provide correct username and password!'
                })
            }
        }
    })
}