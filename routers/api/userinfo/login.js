var UserSQL = {  
      insert:'INSERT INTO userinfo(name,password) VALUES(?,?)', 
      last_time:'update  userinfo set last_time=now() where name=?',
      queryAll:'SELECT name,sex,age,level,last_time  FROM userInfo WHERE name= ? and password= ?'
    };
module.exports = UserSQL;
