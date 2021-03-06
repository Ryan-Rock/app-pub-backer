const express = require('express')
const app = express()
const path = require('path')
var db=require('./routers/utils/db');
var usersql=require('./routers/api/userinfo/login')
const axios = require('axios') //引入axios
const mysql = require('mysql');
var bodyParser = require('body-parser');//body-parser中间件来解析请求体
var unlencodeParser=bodyParser.urlencoded({extended:false})
var allowCrossDomain = function (req, res, next) {
 res.header('Last-Modified', (new Date()).toUTCString());//自定义中间件，设置跨域需要的响应头。
 next();
};
app.use('/static', express.static('public'));
app.use(allowCrossDomain);//运用跨域的中间件
app.use(bodyParser.json());//运用中间件，对请求体的文本进行解析
app.get('/', function (req, res) {
      res.send('hello,菜鸟,路由输入(/static/index.html)');
    });
// app.use('/static', express.static('public'));
// 登录注册
// function abc(){

//    db.query('SELECT * FROM users WHERE id = ?, name = ?',['1','2'],function (result) {
   
//     console.log('The solution is: ',result);
//   });
// }
// abc()
app.use('/userinfo',require('./routers/userinfo/login'));
// app.use(express.static("public")).listen(3000, () => console.log('success'));
app.listen(3000, () => console.log('success'))