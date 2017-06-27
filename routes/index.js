var express = require('express');
var router = express.Router();
var swig = require('swig');
router.get('/', function(req, res) {
	var page ;
	page = swig.renderFile('views/index.html', {
		html: ""
	});
	res.send(page);
});


module.exports = router;