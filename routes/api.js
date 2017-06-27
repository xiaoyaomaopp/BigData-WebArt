var express = require('express');
var router = express.Router();
var read = require('../server/read.js');

/* GET users listing. */
router.get('/art', function(req, res) {
	var page = parseInt(req.query.page);
	var limit = parseInt(req.query.limit);
	read.articlesByPage(page, limit).then(function(data) {
		res.send(data);
	}).catch(function(e) {
		res.send([]);
	})
});

router.get('/author', function(req, res) {
	var page = parseInt(req.query.page);
	var limit = parseInt(req.query.limit);
	read.authorByPage(page, limit).then(function(data) {
		res.send(data);
	}).catch(function(e) {
		res.send([]);
	})
});

module.exports = router;