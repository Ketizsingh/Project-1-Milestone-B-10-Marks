var dbConn = require('../../config/db.config');
const bcrypt = require('bcrypt');

exports.forgot = (accountType, resetType, resetValue, result) => {

    if (accountType == 'volunteer') {

        if (resetType == 'username') {
            //email

            dbConn.query("SELECT * FROM `volunteers` WHERE `email` = ?", [resetValue], async (err, res) => {
                if (err) {
                    result(null, err);
                } else {

                    result(null, res);
                }
            })


        } else if (resetType == 'password') {

            //username
            dbConn.query("SELECT * FROM `volunteers` WHERE `username` = ?", [resetValue], async (err, res) => {
                if (err) {
                    result(null, err);
                } else {

                    result(null, res);
                }
            })


        }

    } else if (accountType == 'needy') {


        if (resetType == 'username') {
            //email
            dbConn.query("SELECT * FROM `needyPeople` WHERE `email` = ?", [resetValue], async (err, res) => {
                if (err) {
                    result(null, err);
                } else {

                    result(null, res);
                }
            })


        } else if (resetType == 'password') {

            //username
            dbConn.query("SELECT * FROM `needyPeople` WHERE `username` = ?", [resetValue], async (err, res) => {
                if (err) {
                    result(null, err);
                } else {

                    result(null, res);
                }
            })


        }

    } else {
        result(null, {});
    }




}




exports.setpassword = (id, accountType, password, result) => {

    console.log(id, password, accountType)

    if (accountType == 'needy') {

        password = bcrypt.hashSync(password, 10);

        dbConn.query("UPDATE `needyPeople` SET `password` = ? WHERE `needyPeople`.`id` = ?", [password, id], async (err, res) => {
            if (err) {
                result(null, err);
            } else {

                result(null, res);
            }
        })



    } else if (accountType == 'volunteer') {

        password = bcrypt.hashSync(password, 10);

        dbConn.query("UPDATE `volunteers` SET `password` = ? WHERE `volunteers`.`id` = ?", [password, id], async (err, res) => {
            if (err) {
                result(null, err);
            } else {

                result(null, res);
            }
        })


    }






}