var Cryptr = require('cryptr');
var connection = require('../../config/connectionCR');
var cryptr = new Cryptr('myTotalySecretKey');
const jwt = require('jsonwebtoken');
const validateLoginInput = require('../../validation/login');


module.exports.login = function (req, res) {

    const { errors, isValid } = validateLoginInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    var pass = req.body.password;
    // var dec_pass =atob(pass);
    var encrypted_pass = cryptr.encrypt(pass);

    var sql = "SELECT ID_USER, USER_NAME, SECRECT_STRING FROM OHARA.OHARA_USERS WHERE `email`='" + email + "' and password = '" + encrypted_pass + "'";

    connection.query(sql, function (err, results) {

        if (results != "") {

            console.log(JSON.stringify(results));

            var data = JSON.stringify(results);

            var secret = 'myTotalySecretKey';
            var now = Math.floor(Date.now() / 1000),
                iat = (now - 10),
                expiresIn = 3600,
                expr = (now + expiresIn),
                notBefore = (now - 10),
                jwtId = Math.random().toString(36).substring(7);
            var payload = {
                iat: iat,
                jwtid: jwtId,
                audience: 'TEST',
                data: data
            };

            jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: expiresIn }, function (err, token) {

                if (err) {
                    console.log('Error occurred while generating token');
                    console.log(err);
                    return false;
                }
                else {
                    if (token != false) {
                        //res.send(token);
                        res.header();
                        res.json({
                            "results":
                                { "status": "true" },
                            "token": token,
                            "data": results

                        });
                        res.end();
                    }
                    else {
                        res.send("Could not create token");
                        res.end();
                    }

                }
            });

        }
        else if (results == "") {
            console.log("not a user");
        }

    })
}
