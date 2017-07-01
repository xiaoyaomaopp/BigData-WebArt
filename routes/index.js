var express = require('express');
var router = express.Router();
var swig = require('swig');
router.get('/', function(req, res, next) {
	res.redirect('home');
});
router.get('/index', function(req, res, next) {
	res.redirect('home');
});

router.get('/home', function(req, res, next) {
	if (!req.session || !req.session.user) {
		res.redirect('login.html');
	}else{
		var page ;
		page = swig.renderFile('views/index.html', {
			html: "",
			user: req.session.user
		});
		res.send(page);
	}
});

router.get('/logout', function(req, res, next) {
	if (!req.session || !req.session.user) {
		res.redirect('login.html');
	}
	if (req.session.user) {
		req.session.user = null;
	}
	res.redirect('login.html');
});

module.exports = router;