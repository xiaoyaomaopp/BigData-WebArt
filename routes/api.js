var express = require('express');
var router = express.Router();
var read = require('../server/read.js');
var update = require('../server/update.js');
var md5 = require("blueimp-md5");

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('login');
});

router.post('/login', function(req, res, next) {
	var user = {
		account: req.body.account,
		password: md5(req.body.password)
	};
	//read.checkUser(user).then(function(data) {
	//	var result = false;
	//	if (data) {
	//		req.session.user = data;
	//		result = true;
	//	}
	//	res.send({
	//		result: result,
	//		data: data
	//	});
	//})
	var result = false;
	if ((req.body.account == "admin" && req.body.password == "admin")
        || (req.body.account == "demo" && req.body.password == "demo")
        ) {
		req.session.user = user;
		result = true;
	}else{
		req.session.user = null;
		result = false
	}
	res.send({
		result: result,
		data: user
	});
});

router.get("/currentUser", function(req, res, next) {
    let user = req.session.user;
    if(!!user){
        res.send({
            account : user.account
        });
    }else{
        res.send('');
    }
})

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
	var query = req.query.query;
	read.authorByPage(page, limit, query).then(function(data) {
		res.send(data);
	}).catch(function(e) {
		res.send([]);
	})
});

router.post('/updateAuthor', function(req, res, next) {
	var author = req.body;
    if(!!!author || !!!author._id) res.send('');
    update.updateAuthor(author).then(function(data) {
        res.send('success');
    }).catch(function(e) {
        res.send('');
    })
});

router.get('/getArtByAuthor', function(req, res) {
    var authorName = req.query.authorName;
    read.getArtByAuthor({authorName:authorName}).then(function(data) {
        res.send(data);
    }).catch(function(e) {
        res.send([]);
    })
});

module.exports = router;