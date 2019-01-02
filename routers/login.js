const express = require('express')
const app = express()
const router = express.Router()
var connection=require('./baseDB');
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
connection.connect();
router.post('/login',(req,res) => {
    var names=req.body.name;
    var passwords= req.body.password
    console.log(req.body)
    var  sql = 'SELECT pwd FROM userInfo WHERE name="'+ names +'"';
    connection.query(sql,function (err, result) {
            if(err){
                res.send('查询失败');
                return;
            }
            if(result=='' || result==undefined || result== null){
                res.send('账号为空')
            }else{
                var pwd = JSON.stringify(result);
                pwd = JSON.parse(pwd);
                if (pwd[0].pwd == passwords) {
                    // callback('登陆成功');
                    // req.cookies.set('userInfo',JSON.stringify({
                    //     _id: userInfo._id,
                    //     username: userInfo.username,
                    // }))
                    res.send('登陆成功')

                } else {
                    // callback('登陆失败');
                    res.send('密码错误')
                }
            }
    });
});
router.post('/sign',(req,res) => {
    var names=req.body.info;
    console.log(names)
    var  sqlName = 'SELECT * FROM userInfo WHERE name="'+ names.username +'"';
    connection.query(sqlName,function (err, result) {
            if(err){
                res.send('添加失败');
                return;
            }
            console.log(result)
            if(!result.length){
                var  sql = 'INSERT INTO userInfo (name,pwd) value ("'+names.username+'","'+names.pwd+'")';
                connection.query(sql,function (err, result) {
                        if(err){
                            console.log(result)
                            res.send('添加失败');
                            return;
                        }else{
                            console.log(result)
                            res.send('添加成功');
                        }
                    
                });
            }else{
                res.send('账号已存在')
            }
    });
    
});
module.exports= router