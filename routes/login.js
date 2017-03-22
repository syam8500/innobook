var express = require('express');
var router = express.Router();
var controller = require('../controllers/controller')

/* GET home page. */
// router.get('/', function(req, res) {
//     res.send("hai");
// });
router.get('/', function(req, res) {
    // res.send("hai");
    controller.allData(req,res);
})

router.post('/login', function(req, res) {
  if (!req.body) return res.sendStatus(400);
  controller.validateUser(req,res);
});
router.post('/logOut',function(req,res){
    console.log("logOut");
    controller.logOut(req,res);
})
module.exports = router;