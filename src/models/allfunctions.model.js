var dbConn = require('../../config/db.config');


exports.setLoginHistory = (usedID, userType, result) => {
    const timestamp = new Date();
    dbConn.query("INSERT INTO loginHistory SET ?", {
        timestamp: timestamp,
        user_id: usedID,
        user_type: userType
    }, async (err, res) => {
        if (err) {
            result(null, err);
        } else {
            result(null, res);
        }
    })
}



exports.getLoginHistory = (user_id, result) => {
    const timestamp = new Date();
    dbConn.query("SELECT * FROM `loginHistory` WHERE `user_id` = ? ORDER BY `id` DESC", [user_id], async (err, res) => {
        if (err) {
            result(null, err);
        } else {
            result(null, res);
        }
    })
}