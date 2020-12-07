const VolunteerModel = require('../models/volunteer.model');
const NeedyPeopleModel = require('../models/needyPeople.model');
var validator = require('validator');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {


    // const {name,username,email,password,address} = req.body;

    if (req.body.type == 'volunteer') {
        const volunteerReqData = new VolunteerModel(req.body);
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({
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

        }
    } else if (req.body.type == 'needy') {

        const needyPeopleReqData = new NeedyPeopleModel(req.body);

        console.log(req.body.password, req.body.confirmpassword)

        if (!validator.isByteLength(req.body.name, {
                min: 3,
                max: 40
            }) == true) {

            res.status(400).send({
                success: false,
                message: 'Name should be between 3 and 40 char long.'
            });
        } else if (!validator.isEmail(req.body.email) == true) {

            res.status(400).send({
                success: false,
                message: 'Please fill correct Email address'
            });
        } else if (!validator.isByteLength(req.body.username, {
                min: 5,
                max: 10
            }) == true || !validator.isAlphanumeric(req.body.username) == true) {

            res.status(400).send({
                success: false,
                message: 'Username in should be alphanumeric and between 5 and 12 char long.'
            });
        } else if (!validator.isByteLength(req.body.password, {
                min: 8,
                max: 12
            }) == true) {

            res.status(400).send({
                success: false,
                message: 'Password in not strong. It should be between 8 and 12 char long.'
            });
        } else if (!validator.equals(req.body.password, req.body.confirmpassword) == true) {

            res.status(400).send({
                success: false,
                message: 'Password dosent match with the Confirmed password'
            });
        } else if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.status(400).send({
                success: false,
                message: 'Please fill the form again.'
            });
        } else {
            NeedyPeopleModel.createNeedyPeople(needyPeopleReqData, (err, needys) => {
                if (err)
                    res.send(err);
                res.json({
                    status: true,
                    message: 'Needy People Created Successfully',
                    data: needys.insertId
                })
            });

        }


    } else {
        res.status(400).json({
            status: false,
            message: 'Internal error, contact admin.'
        })
    }
}