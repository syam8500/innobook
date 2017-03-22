var express = require('express');
var router = express.Router();
var controller = require('../controllers/controller')
console.log("*************************");
/* GET home page. */
router.post('/password', function(req, res) {
    console.log(req.session);
    controller.UpdatePassword(req,res);
    /*controller.individualSearch(req,res);*/
});

router.get('/profile/:id',function(req,res){
    console.log("*************************",req.session);
    controller.getProfile(req,res);
})

router.post('/profile',function(req,res){
	controller.UpdateProfile(req,res);
})

module.exports = router;