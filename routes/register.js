var express = require('express');
var router = express.Router();
var controller = require('../controllers/controller');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('register', {'message':''});
});

router.post('/',function(req,res){
    if (!req.body) return res.sendStatus(400);
    controller.insertUser(req,res)
});



module.exports = router;
