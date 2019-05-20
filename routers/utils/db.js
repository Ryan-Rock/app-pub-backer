
const mysql = require('mysql');
var db={};
db.query = function sqlback(sqllan,fn){
    var connection = mysql.createConnection({
        host     : 'www.tutuzm.cn',
        port: '3306',     
        user     : 'root',
        password : '1234',
        database : 'commox'              
    });
    connection.connect(function(err){
        if(err){
            console.log(err);
            return;
        }
    });
    var sql = sqllan;
    if(!sql) return;
    connection.query(sql,function(err,rows,fields){
        if(err){
            console.log(err);
            return;
        }
        var results=JSON.stringify(rows);
        JSON.parse(results)
        fn(results);
    });
    connection.end(function(err){
        if(err){
            return;
        }else{
            console.log('连接关闭')
        }
    })
}
// db.query('SELECT name from userinfo where name="xue" ', function (result) {
   
//     console.log('The solution is: ',result);
//   });
module.exports= db;