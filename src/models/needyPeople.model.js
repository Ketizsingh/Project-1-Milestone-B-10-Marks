var dbConn = require('../../config/db.config');
const bcrypt = require('bcrypt');
let NeedyPeople = function (needyPeople, bcrypt_pass = true, profile_update = false) {

    if (profile_update) {
        this.name = needyPeople.name;
        this.email = needyPeople.email;
        this.username = needyPeople.username;
        this.address = needyPeople.address;
    } else {
        this.id = needyPeople.id;
        this.name = needyPeople.name;
        this.email = needyPeople.email;
        this.username = needyPeople.username;
        if (!bcrypt_pass) {
            this.password = needyPeople.password;
        } else {
            this.password = bcrypt.hashSync(needyPeople.password, 10);
        }

        this.address = needyPeople.address;
        this.status = needyPeople.status ? needyPeople.status : 1;
        this.created_at = new Date();
        this.updated_at = new Date();
    }



}

//get all needyPeoples
NeedyPeople.getAllNeedyPeoples = (result) => {
    dbConn.query('SELECT * FROM needyPeople', (err, res) => {
        if (err) {
            console.log('Error while fetching needyPeoples', err);
            result(null, err);
        } else {
            console.log('needyPeoples fetched successfully');
            result(null, res);
        }
    })
}


//get needyPeople by ID
NeedyPeople.getNeedyPeopleByID = (id, result) => {
    dbConn.query('select * from needyPeople where id=?', id, (err, res) => {
        if (err) {
            console.log('Error fetching needyPeoples', err);
            result(null, err);
        } else {
            console.log('id is', id);
            result(null, res);
        }
    })
}

//Create new needyPeoplee
NeedyPeople.createNeedyPeople = (emoloyeeRequestData, result) => {
    dbConn.query('INSERT INTO needyPeople SET ?', emoloyeeRequestData, (err, res) => {
        if (err) {
            console.log('Error creating needyPeople', err);

            result(null, err);
        } else {
            console.log('new needyPeople created successfully :)');
            // result(null,{status:true, message:'NeedyPeople created Successfully', insertId: res.id});
            result(null, res);
        }
    })
}


//Update new needyPeoplee
NeedyPeople.updateNeedyPeople = (id, needyPeopleReqData, result) => {


    dbConn.query("UPDATE needyPeople SET ? WHERE id = ?", [needyPeopleReqData, id], (err, res) => {
        if (err) {
            console.log('Error while updating the needyPeople');
            result(null, err);
            console.log(err);
        } else {
            console.log("NeedyPeople updated successfully");
            result(null, res);
        }
    });
}


//delete needyPeople
NeedyPeople.deleteNeedyPeople = (id, result) => {

    dbConn.query("UPDATE needyPeople SET status=? WHERE id = ?", [0, id], (err, res) => {
        if (err) {
            console.log('Error while deleting the needyPeople');
            result(null, err);
        } else {
            console.log("NeedyPeople deleted successfully");
            result(null, res);
        }
    });
}

module.exports = NeedyPeople;