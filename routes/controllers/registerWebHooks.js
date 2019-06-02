var Cryptr = require('cryptr');
var connection = require('../../config/connectionCR');
var cryptr = new Cryptr('myTotalySecretKey');
 
module.exports.register=function(req, res){
    var today = new Date();
    console.log(req.body);
    var token=req.header.token;
    var hook={
        "APP_SOURCE":req.body.app_source,
        "APP_TARGET":req.body.app_target,
        "HOOK_CONNECTION":req.body.hook,
        // "created_at":today,
        // "updated_at":today
    }
    console.log('It is being registering');
    // // res.send(req.body);
    connection.query('INSERT INTO OHARA.WEB_HOOKS_CONNECTION SET ?', hook, function (error, results, fields) {
      if (error) {
        res.json({
            status:false,
            message: error
        })
      }else{
          res.json({
            status:true,
            data:results,
            message:'new hook registered sucessfully'
        })
      }
    });
}
