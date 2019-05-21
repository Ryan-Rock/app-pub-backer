
const mysql = require('mysql');
var db={};
db.query = function sqlback(sql,params,callback){
    var connection = mysql.createConnection({
        host     : 'www.tutuzm.cn',
        port: '3306',     
        user     : 'root',
        password : '1234',
        database : 'comcox',
        dateStrings: true              
    });
    connection.connect(function(err){
        if(err){
            console.log('数据库连接失败');
            throw err;
        }
    });
    connection.query(sql,params,function(err,results,fields){
        if(err){
            console.log('数据库操作失败');
            throw err;
        }
        var results=JSON.stringify(results);
          results=JSON.parse(results)
        callback(results)
    });
    connection.end(function(err){
        if(err){
            return;
        }else{
            console.log('数据库连接关闭')
        }
    })
}
// db.query('SELECT name from userinfo where name="xuezhr" ', function (result) {
   
//     console.log('The solution is: ',result);
//   });
module.exports= db;