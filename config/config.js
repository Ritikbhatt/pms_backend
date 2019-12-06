var mysql = require('mysql');
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'databasename'
});
/**sanjeev local DB */
// var con = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'mydb'
// });

con.connect(function (err) {
    if (!err) {
        console.log("Database connected");
    } else {
        console.log("Error Connecting Database");
    }
});

module.exports=con;