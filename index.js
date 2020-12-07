const express = require('express');
const router = require('./src/routes/volunteer.route');
const bodyParse = require('body-parser');
var cors = require('cors')
    // const dotenv = require('dotenv');
    // dotenv.config({ path: './.env'});

// console.log(loggedInUser.id); // logged in user value

//create express app
const app = express();

//set up server port
const port = process.env.port || 5053;


app.use(express.static('./public'));

//parse request data content type application/x-www-form-rulencoded
app.use(bodyParse.urlencoded({ extended: false }));

//parse request data content type application/x-www-form-rulencoded
app.use(bodyParse.json());


// //define root route
// app.get('/',(req, res)=>{
//     res.send('hnji kive o');
// })



//import authentication route
const loginRoutes = require('./src/routes/login.route');
app.use('/api/v1/login', cors(), loginRoutes);

const logoutRoutes = require('./src/routes/logout.route');
app.use('/api/v1/logout', cors(), logoutRoutes);

const forgotRoutes = require('./src/routes/forgot.route');
app.use('/api/v1/forgot', cors(), forgotRoutes);

const registerRoutes = require('./src/routes/register.route');
app.use('/api/v1/register', cors(), registerRoutes);


//import volunteer route
const volunteerRoutes = require('./src/routes/volunteer.route');
//create volunteer routes
app.use('/api/v1/volunteers', cors(), volunteerRoutes);


const needyPeopleRoutes = require('./src/routes/needyPeople.route');
app.use('/api/v1/needy', cors(), needyPeopleRoutes);









//listen to the port
app.listen(port, () => {
    console.log(`express is running at ${port}`);
})