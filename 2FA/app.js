var express=require("express")
var app=express()
var mongoose=require('mongoose');
var User=require('./databasemodel/2fa.js');
const qr = require('./qr')
const auth=require('./validatetoken');
var speakeasy = require('speakeasy');
//connect databasemodelvar mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1:27017/NewUsers';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


//create secret key
var secret = speakeasy.generateSecret({length: 20});
console.log(secret.base32);
var NewUser=User({
   username:'johns',
   secret:secret.base32,
   totpurl:secret.otpauth_url
});
NewUser.save(function(err){
                 if(err){
                   console.log(err)
                  if(err.code===11000){
                    console.log('error'+err)
                }
}
});
app.get('/qrcode',function(req,res){
  res.render('qr');
});
app.get('/2fa',function(req,res){
  res.render('2fa');
})
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use('/qr',qr);
app.use('/2fa',auth);
app.listen(8080,()=>console.log('listening on port 8080'))
