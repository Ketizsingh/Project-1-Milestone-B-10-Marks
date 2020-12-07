//get all volunteer list
const VolunteerModel = require('../models/volunteer.model');

exports.getEmoployeeList = (req, res) => {

    // console.log('all volunteer listed called');

    VolunteerModel.getAllVolunteers((err, volunteers) => {
        console.log(`we are here`);
        if (err)
            res.send(err);
        console.log('Volunteers', volunteers);
        res.send(volunteers);
    })
}

//get volunteer by id

exports.getVolunteerById = (req, res) => {
    VolunteerModel.getVolunteerByID(req.params.id, (err, volunteer) => {
        if (err)
            res.send(err);
        console.log('Volunteers', volunteer);
        res.send(volunteer);
    })
}

//create new volunteer
exports.createNewVolunteer = (req, res) => {

    const volunteerReqData = new VolunteerModel(req.body);
    console.log(`volunteerReqData`, volunteerReqData);
    //check null
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.send(400).send({
            success: false,
            message: 'Please fill all fields'
        });
    } else {
        VolunteerModel.createVolunteer(volunteerReqData, (err, volunteer) => {
            if (err)
                res.send(err);
            res.json({
                status: true,
                message: 'Volunteer Created Successfully',
                data: volunteer.insertId
            })


        });
        console.log('valid data');
    }
}



//update volunteer 
exports.updateVolunteer = (req, res) => {

    const volunteerReqData = new VolunteerModel(req.body);
    console.log(`volunteerReqData update`, volunteerReqData);
    //check null
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.send(400).send({
            success: false,
            message: 'Please fill all fields'
        });
    } else {
        VolunteerModel.updateVolunteer(req.params.id, volunteerReqData, (err, volunteer) => {
            if (err)
                res.send(err);
            res.json({
                status: true,
                message: 'Volunteer updated Successfully'
            })
        });
        console.log('valid data');
    }

}

// delete volunteer
exports.deleteVolunteer = (req, res) => {



    VolunteerModel.deleteVolunteer(req.params.id, (err, volunteer) => {
        if (err)
            res.send(err);
        res.json({
            success: true,
            message: 'Volunteer deleted successully!'
        });
    })


}