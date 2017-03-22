var express = require('express');
var router = express.Router();
var controller = require('../controllers/controller')
/* GET home page. */
router.get('/', function(req, res) {
    controller.getposts(req,res);
});
//update profile
router.post("/",function(req,res){
	controller.posts(req,res);
})


module.exports = router;