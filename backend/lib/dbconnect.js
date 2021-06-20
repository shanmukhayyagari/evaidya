const mongoose  = require('mongoose');
const Configure = require('../config/Configure');

const connectionString = Configure.mongoConnectionString;
const dbOptions = {};
module.exports = {
    moongoseconnect : function(){
        mongoose.connect(Configure.mongoConnectionString, {useUnifiedTopology: true, useNewUrlParser: true}).then(()=>console.log("db connected"));
        }
    }
