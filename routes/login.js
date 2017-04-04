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
router.post('/logOut/:id',function(req,res){
    console.log("logOutOfApp");
    controller.logOut(req,res);
});

router.post('/getData',function(req,res){
    console.log("getting data");
    controller.getData(req,res);
});
module.exports = router;
