var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.createConnection('mongodb://innominds:innominds@ds153709.mlab.com:53709/friendrequests');

var requestSchema = mongoose.Schema({
	sent_by:String,
	sent_to:String,
	accept:Number
});


var friendrequests = mongoose.model("friendrequests",requestSchema);

var posts =  mongoose.Schema({
	post :String,
	email:String
});

var postschema = mongoose.model("posts",posts);
module.exports = {postschema,friendrequests};