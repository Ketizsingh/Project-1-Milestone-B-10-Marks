const mysql = require('mysql');
require('dotenv').config();
//new mysql db connection

const dbConn = mysql.createConnection({
    
    // socketPath : process.env.SOCKET_PATH,
    // host : process.env.HOST,
    // port : process.env.PORT,
    // user : process.env.USER,
    // password : process.env.PASSWORD,
    // database : process.env.DATABASE
    
    host: 'localhost',
    port:'3306',
    user:'root',
    password:'gobabygo',
    database:'showel_angels'
});

dbConn.connect(function(error){
    if(error) throw error;
    console.log('database connected successfully!!');
})


module.exports=dbConn;