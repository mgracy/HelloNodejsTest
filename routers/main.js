var express = require('express');

var router = express.Router();

router.get('/', function(req, res, next){
	res.render('main/index');
	// res.send('<h1>Main 首页</h1>');
});

module.exports = router;