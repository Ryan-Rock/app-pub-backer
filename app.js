const express = require('express')
const app = express()
const router = express.Router()
const axios = require('axios') //引入axios
const mysql = require('mysql');
var bodyParser = require('body-parser');//body-parser中间件来解析请求体
var unlencodeParser=bodyParser.urlencoded({extended:false})
var allowCrossDomain = function (req, res, next) {
 res.header('Last-Modified', (new Date()).toUTCString());//自定义中间件，设置跨域需要的响应头。
 next();
};
app.use(allowCrossDomain);//运用跨域的中间件
app.use(bodyParser.json());//运用中间件，对请求体的文本进行解析
app.get('/', (req, res) =>{
     res.send('Hello World!')
    })
app.get('/getRankings', (req, res) => {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
    axios.get(url, {
        params: req.query
    }).then((response)=>{
        res.json(response.data)
        res.send(response.data)
    }).catch((e)=>{
        console.log(e)
    })
})
//登录接口
// var connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : '123456',
//     database : 'systest'
//   });
//   connection.connect();
//  app.post('/login',(req,res) => {
  
//     var names=req.body.name;
//     var passwords= req.body.password
//     console.log(req.body)
//     var  sql = 'SELECT * FROM userInfo';
//     connection.query(sql,function (err, result) {
//             if(err){
//               console.log('[SELECT ERROR] - ',err.message);
//               return;
//             }
//             console.log(result)
//         for(let i=0;i<result.length;i++){
//             if(names==result[i].name && passwords==result[i].pwd){
//                 res.send('登陆成功')
//             }
//         } 
//     });
// })
// const a=require('./routers/baseDB')
app.use('/logins',require('./routers/login'))

app.listen(3000, () => console.log('success'))