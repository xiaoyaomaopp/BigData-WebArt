var express = require('express');
var router = express.Router();
var swig = require('swig');
router.get('/', function(req, res, next) {
	var page ;
	page = swig.renderFile('views/dailyArt.html', {
		html: "",
		user: {}
	});
	res.send(page);
});

module.exports = router;