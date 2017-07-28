var express = require('express');
var router = express.Router();
var swig = require('swig');
router.get('/', function(req, res, next) {
	var deviceAgent = req.headers['user-agent'].toLowerCase();
	if(/mobile/i.test(deviceAgent)){
        var page ;
        page = swig.renderFile('views/dailyArt.html', {
            html: "",
            user: {}
        });
        res.send(page);
	}else{
        res.redirect('mng/login.html');
	}

});

module.exports = router;