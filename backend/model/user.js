const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
username : {
    type: String,
    required: true,
    trim: true
},
email : {
    type: String,
    required: true,
    trim: true
},
password : {
    type: String,
    required: true,
},
isDeleted : {type:Boolean,default:false}


});


var userModel = mongoose.model('users' , userSchema);


module.exports = userModel;