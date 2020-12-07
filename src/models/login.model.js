var dbConn = require('../../config/db.config');


exports.login = (username, password, type, result) => {

    if (type == 'volunteer') {

        dbConn.query("SELECT * FROM `volunteers` WHERE `username` = ?", [username], async (err, res) => {
            if (err) {
                result(null, err);
            } else {
                result(null, res);
            }
        })
    } else if (type == 'needy') {
        dbConn.query("SELECT * FROM `needyPeople` WHERE `username` = ?", [username], async (err, res) => {
            if (err) {
                result(null, err);
            } else {
                result(null, res);
            }
        })
    } else {
        result(null, {});
    }


}