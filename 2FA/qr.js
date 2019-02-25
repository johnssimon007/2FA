var express=require("express")
var app=express()
var User=require('./databasemodel/2fa.js');
var QRCode = require('qrcode');
app.get('/',function(req,res){
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

 console.log(user.totpurl)
 QRCode.toDataURL(user.totpurl, function(err, image_data) {
 console.log(image_data); // A data URI for the QR code image
 res.send('<img src='+image_data+'>')

});
}
});

});
module.exports=app;
