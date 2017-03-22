var express = require('express');
var router = express.Router();
var controller = require('../controllers/controller')

/* GET home page. */
router.get('/', function(req, res) {
	console.log(req.params.id);
    controller.getUserProfile(req,res);
});

router.post('/:id',function(req,res){
	/*console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&",req.session);*/
	/*res.json(req.params.friendname);*/
	console.log("**********************************");
	controller.friendsAndRequests(req,res);
})

router.post('/accept_request/:id',function(req,res){
	console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&",req.session);
	/*res.json(req.params.friendname);*/
	console.log("**********************************");
	controller.acceptRequest(req,res);
})
/*router.post('/:req-acceptance',function(req,res){
	controller.friendsAndAcceptance(req,res);
})*/

router.post('/friend/:id',function(req,res){
	console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&",req.session);
	/*res.json(req.params.friendname);*/
	console.log("**********************************");
	controller.insertRequest(req,res);
})
module.exports = router;