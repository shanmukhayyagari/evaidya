const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
username : String,
email : String,
password : String,
isDeleted : {type:Boolean,default:false}


});


var userModel = mongoose.model('users' , userSchema);


module.exports = userModel;