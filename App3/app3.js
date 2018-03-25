var express = require('express');
var app = express();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pannawat',
    database: 'app1'

});

connection.connect(function (err) {
    if (err) {
        console.log('Error Connecting', err.stack);
        return;
    }
    console.log('Connected as id', connection.threadId);

});

/*app.get('/users', function (req, res) {
    //res.end('Noob');
    queryAllUser(function(err,resualt){
        res.end(resualt);
    });
});*/


app.get('/user/:name', function (req, res) {

    var name = req.params.name;


    console.log(name);
    queryUser(name)(function(err,resualt){
   
        res.end(resualt);
       
    });
});


var server = app.listen(8081, function () {
    console.log('Server Running');

})

/*function queryAllUser(callback) {
    var json = '';
    connection.query('SELECT * FROM user', function (err, rows, fields) {
        if (err) throw err;

        json = JSON.stringify(rows);

        callback(null,json);
    });
}*/

function queryUser(callback) {
    var json = '';
    connection.query("SELECT * FROM user WHERE name = ? ", function (err, rows, fields) {
        
        console.log("Connection : "+ callback);
        if (err) throw err;
        json = JSON.stringify(rows);

        callback(null,json);
 
 
    });
}