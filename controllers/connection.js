
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://innobook:innobook@ds153709.mlab.com:53709/userdata');

var userregisterSchema = mongoose.Schema({
	firstName: String,
    lastName:String,
    email: String,
    password:String,
    phone:Number,
    gender:String,
    dob: Date,
    profilePic: String,
    description: String,
    hobbies: String,
    posts : [{post : String}],
    logged: String
});

var user = mongoose.model("register",userregisterSchema);
module.exports = user;