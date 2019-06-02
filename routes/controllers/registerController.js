var Cryptr = require('cryptr');
var connection = require('../../config/connectionCR');
var cryptr = new Cryptr('myTotalySecretKey');
 
module.exports.register=function(req, res){
    var today = new Date();
    console.log(req.body);
    var encryptedString = cryptr.encrypt(req.body.password);
    var users={
        "USER_NAME":req.body.name,
        "EMAIL":req.body.email,
        "SECRET_STRING":encryptedString
        // "created_at":today,
        // "updated_at":today
    }
    console.log('It is being registering');
    // res.send(req.body);
    connection.query('INSERT INTO OHARA.OHARA_USERS SET ?', users, function (error, results, fields) {
      if (error) {
        res.json({
            status:false,
            message: error
        })
      }else{
          res.json({
            status:true,
            data:results,
            message:'user registered sucessfully'
        })
      }
    });
}
