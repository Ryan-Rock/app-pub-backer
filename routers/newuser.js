const express = require('express')
const app = express()
const router = express.Router()
const mysql = require('./utils/db.js')
var bodyParser = require('body-parser');//body-parser中间件来解析请求体
var unlencodeParser=bodyParser.urlencoded({extended:false})
var allowCrossDomain = function (req, res, next) {
 res.header('Last-Modified', (new Date()).toUTCString());//自定义中间件，设置跨域需要的响应头。
 next();
};
app.use(router)
app.use(allowCrossDomain);//运用跨域的中间件
app.use(bodyParser.json());//运用中间件，对请求体的文本进行解析
router.use(function timeLog(req, res, next) {
    next();
});
router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
function abc(){
    // router.get('/',(req,res) => {
 
    //     var  sql = 'SELECT * FROM userinfo ';
    //     var  result= mysql.query(sql,function(result){
            
    //     })
    //     console.log(result)
    // });
    mysql.query('SELECT name from userinfo ', function (result) {
   
        // console.log('The solution is: ',result);
        var arr= result;
        console.log(arr)
      });
}
abc()


