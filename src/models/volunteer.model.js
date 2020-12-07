var dbConn = require('../../config/db.config');
const bcrypt = require('bcrypt');

let Volunteer = function (volunteer) {
    this.id = volunteer.id;
    this.name = volunteer.name;
    this.email = volunteer.email;
    this.username = volunteer.username;
    this.password = bcrypt.hashSync(volunteer.password, 10, (err, res) => {
        if (volunteer.password == 'undefined') res(volunteer.password)
    });
    this.friends_list = volunteer.friends_list;
    this.address = volunteer.address;
    this.status = volunteer.status ? volunteer.status : 1;
    this.created_at = new Date();
    this.updated_at = new Date();

}

//get all volunteers
Volunteer.getAllVolunteers = (result) => {
    dbConn.query('SELECT * FROM volunteers', (err, res) => {
        if (err) {
            console.log('Error while fetching volunteers', err);
            result(null, err);
        } else {
            console.log('volunteers fetched successfully');
            result(null, res);
        }
    })
}


//get volunteer by ID
Volunteer.getVolunteerByID = (id, result) => {
    dbConn.query('select * from volunteers where id=?', id, (err, res) => {
        if (err) {
            console.log('Error fetching volunteers', err);
            result(null, err);
        } else {
            console.log('id is', id);
            result(null, res);
        }
    })
}

//Create new volunteere
Volunteer.createVolunteer = (emoloyeeRequestData, result) => {
    dbConn.query('INSERT INTO volunteers SET ?', emoloyeeRequestData, (err, res) => {
        if (err) {
            console.log('Error creating volunteer', err);

            result(null, err);
        } else {
            console.log('new volunteer created successfully :)');
            // result(null,{status:true, message:'Volunteer created Successfully', insertId: res.id});
            result(null, res);
        }
    })
}


//Update new volunteere
Volunteer.updateVolunteer = (id, volunteerReqData, result) => {
    dbConn.query("UPDATE volunteers SET name=?,email=?,username=?,password=?,friends_list=?,address=?,status=?,updated_at=? WHERE id = ?", [volunteerReqData.name, volunteerReqData.email, volunteerReqData.username, volunteerReqData.password, volunteerReqData.friends_list, volunteerReqData.address, volunteerReqData.status, volunteerReqData.updated_at, id], (err, res) => {
        if (err) {
            console.log('Error while updating the volunteer');
            result(null, err);
        } else {
            console.log("Volunteer updated successfully");
            result(null, res);
        }
    });
}


//delete volunteer
Volunteer.deleteVolunteer = (id, result) => {

    dbConn.query("UPDATE volunteers SET status=? WHERE id = ?", [0, id], (err, res) => {
        if (err) {
            console.log('Error while deleting the volunteer');
            result(null, err);
        } else {
            console.log("Volunteer deleted successfully");
            result(null, res);
        }
    });
}

module.exports = Volunteer;