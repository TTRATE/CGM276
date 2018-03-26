var express = require('express');
var app = express();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'pannawatdata.ck2codzcnj4m.ap-southeast-1.rds.amazonaws.com',
    user: 'pannawat',
    password: 'ttr987654321',
    database: 'PannawatData'

});

connection.connect(function (err) {
    if (err) {
        console.log('Error Connecting', err.stack);
        return;
    }
    console.log('Connected as id', connection.threadId);

});

app.get('/user/add/user', function (req, res) {
    var name = req.query.name;
    var password = req.query.pass;

    var user = [[name,password]];
    InsertUser(user,function(err,resualt){

        res.end(resualt)
    });
  
});


app.get('/user/:name', function (req, res) {

    var name = req.params.name;

    console.log(name);
    queryAllUser(name,function(err,resualt){
        
        res.end(resualt);
       
    });
});


var server = app.listen(8081, function () {
    console.log('Server Running');

})

function queryAllUser(name,callback) {
    var json = '';
    var sql = 'SELECT * FROM user WHERE Name = ?'
    connection.query(sql,[name], function (err, rows, fields) {
        if (err) throw err;

        json = JSON.stringify(rows);

        callback(null,json);
    });
}

function InsertUser(user,callback) {
    var sql = 'INSERT INTO user(name,password) values ?';
    connection.query(sql,[user], function (err) {
       // console.log("Connection : ");

       var res = '[{"success" : "true"}]'
        if (err) {

            res = '[{"success" : "false"}]'
        
            throw err;
        }

        callback(null,res);
 
 
    });
}