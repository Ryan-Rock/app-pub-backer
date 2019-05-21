const express = require('express')
const app = express()
const router = express.Router()
var db=require('../utils/db');
var usersql = require('../api/userinfo/login')
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var bodyParser = require('body-parser');//body-parser中间件来解析请求体
var unlencodeParser=bodyParser.urlencoded({extended:false})//解析post请求数据
var allowCrossDomain = function (req, res, next) {
 res.header('Last-Modified', (new Date()).toUTCString());//自定义中间件，设置跨域需要的响应头。
 next();
};
app.use(router)
app.use(allowCrossDomain);//运用跨域的中间件
app.use(bodyParser.json());//运用中间件，对请求体的文本进行解析
app.use(unlencodeParser);//解析post数据
router.use(function timeLog(req, res, next) {
    next();
});
router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
var responseData;
router.use(function(req,res,next){
    responseData ={
        code: 0,
        message: ''
    }
    next()
})
function updatetime(name){
   
    db.query(usersql.last_time,[name],function (result) {
        console.log(result)
           
    });
}
// 登录
router.post('/login',multipartMiddleware,(req,res) => {
    var names=req.body.name;
    var passwords= req.body.password
    db.query(usersql.queryAll,[names,passwords],function (result) {
        // console.log(result)
            if(result.length==0){
                responseData.code= 1
                responseData.message= '账号密码不正确'
                res.send(responseData);
                return;
            }
            if(result){
                updatetime(names)
                responseData.data=result;
                res.send(responseData);
            }
    });
});

// 注册
router.post('/sigin',(req,res) => {
    var names=req.body.info;
    db.query(usersql.insert,[1],function (result) {
           console.log(result)
            if(result.length==0){
                // var  sql = 'INSERT INTO userInfo (name,pwd) value ("'+names.username+'","'+names.pwd+'")';
                // db.query(sql,function (err, result) {
                //         if(err){
                //             console.log(result)
                //             res.send('添加失败');
                //             return;
                //         }else{
                //             console.log(result)
                //             res.send('添加成功');
                //         }
                    
                // });
            }else{
                res.send('账号已存在')
            }
    });
    
});

module.exports= router