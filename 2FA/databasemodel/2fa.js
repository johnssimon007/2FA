var mongoose=require('mongoose');
var schema = new mongoose.Schema({
    username: { type:String, required: true},
    secret: { type:String, required: true},
    totpurl: { type:String, required: true},

});
var User=mongoose.model('User',schema);
module.exports=User;
