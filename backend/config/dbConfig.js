var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: "root",
    password: "",
    database: "user_app"
})

module.exports = pool