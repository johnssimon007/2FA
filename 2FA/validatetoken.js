var express=require("express")
var app=express()
var speakeasy = require('speakeasy');
var User=require('./databasemodel/2fa.js');
const bodyparser=require('body-parser');
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.post('/',function(req,res){
var post=req.body;
var userToken =post.token;
console.log(userToken)
  User.findOne({
     username:'johns'
 },
 function(err, user) {
    if (err) console.log(err);
    if (!user) {
      //not user
      error=1;
      console.log("error")
    }
    else if (user)
{

  var secret =user.secret
  var token = speakeasy.totp({
    secret: secret,
    encoding: 'base32'
  });
  console.log("the  token is"+token)
 console.log(user.secret)
// Load the secret.base32 from their user record in database

// Verify that the user token matches what it should at this moment
var verified = speakeasy.totp.verify({
  secret: secret,
  encoding: 'base32',
  token: userToken
});
console.log(verified)
}
});
});
module.exports=app;
