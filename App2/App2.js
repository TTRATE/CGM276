var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pannawat',
    database: 'app'

});

connection.connect(function (err) {
    if (err) {
        console.log('Error Connecting', err.stack);
        return;
    }
    console.log('Connected as id', connection.threadId);

});


/*connection.query('SELECT * FROM user', function (err, rows, fields) {
    if (err) throw err;

    for (var i in rows) {
        console.log('user : ', rows[i].Name + 'score', rows[i].score);
    }
});*/

var values = { name: 'Tim', pass: '62273', score: 125 };
connection.query('INSERT INTO user SET ?', values, function (err, result) {
    if (err) throw err;
    console.log(result);
})

connection.end(function (err) {
    console.log('Terminated Connection');
});

console.log('App2: Test mysql running');