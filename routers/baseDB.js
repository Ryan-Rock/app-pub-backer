const mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'www.tutuzm.cn',
    port: '3306',     
    user     : 'root',
    password : '1234',
    database : 'commox' 
                  
});
module.exports= connection