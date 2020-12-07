const jwt = require('jsonwebtoken');
exports.logout = async (req, res) => {

    console.log('dfghj');
    const token = req.headers['authorization'];

    //we cannot delete token from jsonwebtoken. So we are sending a fake response

    res.json({
        status: true,
        message: 'You are successfully logged out'
    })




}