var express = require('express');
var router = express.Router();
var controller = require('../controllers/controller')

/* GET home page. */
router.get('/', function(req, res) {
    controller.searchUsers(req,res);
    /*controller.individualSearch(req,res);*/
});

router.post('/:id',function(req,res){
	console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&",req.session);
	/*res.json(req.params.friendname);*/
	console.log("**********************************");
	controller.individualSearch(req,res);
})
//router.get('/:id', function(req, res) {
//  if (!req.params) return res.sendStatus(400);
//  controller.validateUser(req,res);
//});



module.exports = router;
