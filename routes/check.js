var express = require('express');
var router = express.Router();
var controller = require('../controllers/controller')

/* GET home page. */
router.get('/:id', function(req, res) {
    console.log("****************************************************************");
    controller.checkUser(req,res);
});

module.exports = router;