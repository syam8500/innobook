var express = require('express');
var router = express.Router();
var controller = require('../controllers/controller')
/* GET home page. */
router.get('/', function(req, res) {
  if(req.session.username){
			res.render('dashboard');
		}else{
			res.redirect('/');
		}
});
//update profile
router.post("/updateProfile",function(req,res){
	controller.updateUser(req,res);
})


module.exports = router;
