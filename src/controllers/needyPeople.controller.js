//get all needyPeople list
const NeedyPeopleModel = require('../models/needyPeople.model');
const allfunctions = require('../models/allfunctions.model');
const jwt = require('jsonwebtoken');







exports.getEmoployeeList = (req, res) => {


    NeedyPeopleModel.getAllNeedyPeoples((err, needyPeoples) => {
        if (err)
            res.send(err);
        const token = req.headers['authorization'];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {




            allfunctions.getLoginHistory(decoded.result_sql[0].id, (err, loginHistoryData) => {
                if (err)
                    console.log(err)

                NeedyPeopleModel.getNeedyPeopleByID(decoded.result_sql[0].id, (err, needyPeople) => {
                    if (err)
                        res.send(err);
                    const userDetails = needyPeople[0];
                    res.send({
                        userDetails,
                        needyPeoples,
                        loginHistoryData
                    });
                })
            })

        });

    })
}

//get needyPeople by id

exports.getNeedyPeopleById = (req, res) => {
    NeedyPeopleModel.getNeedyPeopleByID(req.params.id, (err, needyPeople) => {
        if (err)
            res.send(err);
        res.send(needyPeople[0]);

    })
}

//create new needyPeople
exports.createNewNeedyPeople = (req, res) => {




    const needyPeopleReqData = new NeedyPeople(req.body);
    //check null
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.send(400).send({
            success: false,
            message: 'Please fill all fields'
        });
    } else {
        NeedyPeopleModel.createNeedyPeople(needyPeopleReqData, (err, needyPeople) => {
            if (err) {
                res.send(err);
            } else {
                res.json({
                    status: true,
                    message: 'NeedyPeople Created Successfully',
                    data: needyPeople.insertId
                })
            }




        });
    }
}



//update needyPeople 
exports.updateNeedyPeople = (req, res) => {

    const needyPeopleReqData = new NeedyPeopleModel(req.body, true, true);
    //check null
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.send(400).send({
            success: false,
            message: 'Please fill all fields'
        });
    } else {
        NeedyPeopleModel.updateNeedyPeople(req.params.id, needyPeopleReqData, (err, needyPeople) => {
            if (err)
                res.send(err);
            res.json({
                status: true,
                message: 'NeedyPeople updated Successfully'
            })
        });
    }

}

// delete needyPeople
exports.deleteNeedyPeople = (req, res) => {



    NeedyPeopleModel.deleteNeedyPeople(req.params.id, (err, needyPeople) => {
        if (err)
            res.send(err);
        res.json({
            success: true,
            message: 'NeedyPeople deleted successully!'
        });
    })


}