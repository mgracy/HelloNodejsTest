var express = require('express');

var router = express.Router();

router.get('/user', function(req, res, next){
	res.send('<h1>User</h1><p>ssss</p>');
});

module.exports = router;