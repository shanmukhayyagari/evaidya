const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
username : String,
articals : Number,
isDeleted : {type:Boolean,default:false}


});


var userModel = mongoose.model('userTable' , userSchema);


module.exports = userModel;